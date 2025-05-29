import React, { useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useOtp } from '../../hooks/useOtp';
import AuthScreenWrapper from '../common/AuthScreenWrapper';
import { useToast } from '../ui/Toast';
import OTPInput from '../ui/form/OTPInput';

const { height: screenHeight } = Dimensions.get('window');

interface Props {
    mode: 'email' | 'mobile';
    onVerified: () => void;
    data: string
}

const OTPVerification: React.FC<Props> = ({ mode, onVerified, data }) => {
    const { sendOtp, confirmOtp, loading, error } = useOtp();
    const { show } = useToast();
    const handleSendOtp = useCallback(
        async () => {
            try {
                await sendOtp({
                    expiry_time: 30,
                    ...(mode === 'email' ? { email: data } : { mobile: data }),
                });
                show({ type: 'success', message: 'Otp sent successfully' });
            } catch (e) {
                console.log(e);
                show({ type: 'error', message: 'Failed to load contact information.' });
            }
        }, [data, mode, sendOtp, show]
    );

    useEffect(() => {
        handleSendOtp();
    }, [mode, data, handleSendOtp]);

    useEffect(() => {
        if (error) {
            show({ type: 'error', message: error });
        }
    }, [error, show]);

    const handleVerify = async (otp: number) => {
        try {
            console.log(data, otp);
            await confirmOtp(otp, mode === 'email' ? { email: data } : { mobile: data });
            show({ type: 'success', message: 'Verified successfully!' });
            onVerified();
        } catch (e) {
            console.log(e);
        }
        finally {
        }
    };

    return (
        <AuthScreenWrapper>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Let’s</Text>
                    <Text style={styles.subheading}>
                        <Text style={styles.highlight}>Verify</Text> your {mode}
                    </Text>
                    <OTPInput onComplete={handleVerify} disabled={loading} sentOn={data} onResend={handleSendOtp} />
                </View>
            </View>
        </AuthScreenWrapper>
    );
};

export default OTPVerification;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-evenly' },
    textContainer: {
        flex: 1,
        height: screenHeight * 0.6,
        justifyContent: 'flex-start',
        gap: 12,
    },
    heading: { fontSize: 38, marginBottom: -8, fontWeight: '600' },
    subheading: { fontSize: 38, marginBottom: 8, fontWeight: '600' },
    highlight: { color: '#00C853' /* e.g. colors.green */ },
});
