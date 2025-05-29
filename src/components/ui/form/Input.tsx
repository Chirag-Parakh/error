import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Animated,
    Platform,
    Pressable,
    TextInput as RNTextInput,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../constants/color';

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
    isPassword?: boolean;
    isMobile?: boolean;
    value: string;
}

const Input: React.FC<InputProps> = ({
    label,
    error,
    isPassword,
    isMobile,
    style,
    value = '',
    onChangeText,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [labelPosition] = useState(new Animated.Value(value && value.length > 0 ? 1 : 0));
    const inputRef = useRef<RNTextInput>(null);

    const animateLabel = useCallback((toValue: number) => {
        Animated.timing(labelPosition, {
            toValue,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [labelPosition]);

    useEffect(() => {
        if (value && value.length > 0) {
            animateLabel(1);
        } else if (!isFocused) {
            animateLabel(0);
        }
    }, [value, isFocused, animateLabel]);

    const handleFocus = () => {
        setIsFocused(true);
        animateLabel(1);
        setTimeout(() => {
            if (props.onFocus) {
                props.onFocus({ nativeEvent: { text: value } } as any);
            }
        }, 50);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value || value.length === 0) {
            animateLabel(0);
        }
        if (props.onBlur) {
            props.onBlur({ nativeEvent: { text: value } } as any);
        }
    };
    const handleChangeText = (text: string) => {
        if (onChangeText) {
            onChangeText(text);
        }
    };
    const animatedLabelStyle = {
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [17, Platform.OS === 'ios' ? -7 : -8],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ['#718096', isFocused ? '#38B2AC' : '#718096'],
        }),
    };
    const containerDynamicStyle = {
        borderColor: error
            ? '#fc8181'
            : isFocused
                ? '#4fd1c5'
                : '#cbd5e0',
        marginTop: error ? 14 : 0,
    };
    const animatedDynamicStyle = { left: isMobile ? 64 : 12 };
    const textDynamicStyle = { paddingHorizontal: isMobile ? 12 : 16 };

    return (
        <View style={[styles.container, containerDynamicStyle]}>
            <Pressable style={styles.pressable} onPress={() => inputRef.current?.focus()}>
                <Animated.Text
                    style={[
                        animatedLabelStyle,
                        styles.animatedLabel,
                        animatedDynamicStyle,
                    ]}
                >
                    {label}
                </Animated.Text>

                <View style={styles.inputRow}>
                    {isMobile && (
                        <View style={styles.mobilePrefix}>
                            <Text>+91</Text>
                        </View>
                    )}

                    <TextInput
                        ref={inputRef}
                        placeholderTextColor="#999"
                        style={[
                            styles.textInput,
                            textDynamicStyle,
                            style,
                        ]}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChangeText={handleChangeText}
                        secureTextEntry={isPassword && !showPassword}
                        value={value}
                        {...props}
                    />

                    {isPassword && (
                        <TouchableOpacity
                            style={styles.passwordToggle}
                            onPress={() => setShowPassword(!showPassword)}
                            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
                        >
                            <Ionicons
                                name={!showPassword ? 'eye-off' : 'eye'}
                                size={25}
                                color="#718096"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </Pressable>

            {error && (
                <Text style={styles.errorText}>
                    {error}
                </Text>
            )}
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.lightBG,
        minHeight: 54,
        borderRadius: 8,
        borderWidth: 1,
        // paddingVertical: 4,
    },
    pressable: {
        position: 'relative',
    },
    animatedLabel: {
        position: 'absolute',
        paddingHorizontal: 4,
        zIndex: 10,
        fontWeight: '500',
        backgroundColor: colors.lightBG,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    mobilePrefix: {
        height: 36,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#a0aec0',
    },
    textInput: {
        height: 54,
        flex: 1,
    },
    passwordToggle: {
        position: 'absolute',
        right: 16,
        height: 25,
        width: 25,
        top: 16,
    },
    errorText: {
        fontSize: 11,
        color: '#f56565',
        // marginTop: 2,
        position: 'absolute',
        top: -16,
        right: 4,
    },
});

export default Input;
