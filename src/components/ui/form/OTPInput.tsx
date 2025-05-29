// src/components/ui/form/OTPInput.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    Platform,
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const OTP_LENGTH = 6;
const RESEND_WAIT_TIME = 60;

interface OTPInputProps {
    onComplete: (otp: number) => void;
    disabled?: boolean;
    sentOn: string;
    onResend: () => Promise<void>;
}

const OTPInput: React.FC<OTPInputProps> = ({
    onComplete,
    disabled = false,
    sentOn,
    onResend,
}) => {
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(RESEND_WAIT_TIME);
    const inputRef = useRef<RNTextInput>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Start countdown on mount
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const handleResend = async () => {
        if (timer > 0) return;
        await onResend();
        setTimer(RESEND_WAIT_TIME);
        // restart interval
        intervalRef.current = setInterval(() => {
            setTimer(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleBoxPress = () => inputRef.current?.focus();

    const handleChangeText = (text: string) => {
        const digits = text.replace(/\D/g, '').slice(0, OTP_LENGTH);
        setCode(digits);
        if (digits.length === OTP_LENGTH) onComplete(Number(digits));
    };

    const maskContact = (input: string) =>
        input.includes('@')
            ? `${input.split('@')[0].slice(0, 4)}****@${input.split('@')[1]}`
            : `******${input.slice(-4)}`;

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={handleBoxPress}>
                <View style={styles.mainContainer}>
                    <Text style={styles.heading}>
                        Enter OTP sent on{'\n'}
                        <Text style={styles.heading2}>{maskContact(sentOn)}</Text>
                    </Text>

                    <View style={styles.otpBoxContainer}>
                        {Array.from({ length: OTP_LENGTH }).map((_, i) => {
                            const digit = code[i] || '';
                            const isActive = i === code.length;
                            const style = digit || isActive ? styles.filledBox : styles.emptyBox;
                            return (
                                <View key={i} style={[styles.otpBox, style]}>
                                    <Text style={styles.otpText}>{digit}</Text>
                                </View>
                            );
                        })}
                    </View>

                    {timer > 0 ? (
                        <Text style={styles.resendDisabled}>Resend in {timer}s</Text>
                    ) : (
                        <Text style={styles.resend} onPress={handleResend}>
                            Resend
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>

            <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleChangeText}
                keyboardType="number-pad"
                maxLength={OTP_LENGTH}
                style={styles.hiddenInput}
                caretHidden
                autoFocus
                textContentType="oneTimeCode"
                autoComplete={Platform.select({
                    ios: 'one-time-code',
                    android: 'sms-otp',
                    default: 'off',
                })}
                editable={!disabled}
            />
        </View>
    );
};

export default OTPInput;

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginVertical: 20 },
    mainContainer: { gap: 10, alignItems: 'center' },
    otpBoxContainer: { flexDirection: 'row', justifyContent: 'center' },
    otpBox: {
        width: 40,
        height: 50,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filledBox: { borderColor: '#4caf50' },
    emptyBox: { borderColor: '#ccc' },
    otpText: { fontSize: 22, color: '#000' },
    hiddenInput: { position: 'absolute', opacity: 0, width: '100%', height: '100%' },
    heading: { textAlign: 'center', fontSize: 20, fontWeight: '600', paddingBottom: 5 },
    heading2: { fontSize: 15, fontWeight: '700', textAlign: 'center', paddingBottom: 20 },
    resend: { textAlign: 'center', fontSize: 17, fontWeight: '400', color: '#007AFF' },
    resendDisabled: { textAlign: 'center', fontSize: 16, color: 'gray' },
});
