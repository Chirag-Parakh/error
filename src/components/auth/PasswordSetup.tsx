import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import { useRegister } from '../../hooks/useRegister';
import { AuthStackParamList } from '../../types/navigation';
import AuthScreenWrapper from '../common/AuthScreenWrapper';
import CustomButton from '../ui/Button';
import { useToast } from '../ui/Toast';
import Input from '../ui/form/Input';

interface Props {
    onNext: () => void;
    update: (data: { password: string }) => void;
}

const { height: screenHeight } = Dimensions.get('window');

const PasswordSetup: React.FC<Props> = () => {
    const { show } = useToast();
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
    // const { registerUser } = useRegister(navigation);


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        special: false,
        match: false
    });

    useEffect(() => {
        setValidations({
            length: password.length >= 8 && password.length <= 25,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            match: password === confirmPassword && password !== ''
        });
    }, [password, confirmPassword]);

    // const handleNext = async () => {
    //     const messages = {
    //         length: 'Password must be 8-25 characters.',
    //         uppercase: ' Must include at least one uppercase letter.',
    //         lowercase: 'Must include at least one lowercase letter.',
    //         special: ' Must include at least one special character.',
    //         match: 'Passwords do not match.',
    //     };

    //     const failedValidation = Object.entries(validations).find(([isValid]) => !isValid);
    //     if (failedValidation) {
    //         const [key] = failedValidation;
    //         show({ type: 'error', message: messages[key as keyof typeof messages] });
    //         return;
    //     }

    //     try {
    //         const savedForm = await AsyncStorage.getItem('registration_form_data');
    //         const parsedForm = savedForm ? JSON.parse(savedForm) : null;

    //         if (!parsedForm) {
    //             show({ type: 'error', message: '⚠️ No form data found. Please restart signup.' });
    //             return;
    //         }

    //         await registerUser({
    //             username: parsedForm.name,
    //             email: parsedForm.email,
    //             mobile: parsedForm.phone,
    //             dob: new Date(parsedForm.dob).toISOString().split('T')[0],
    //             password_hash: password
    //         });

    //     } catch (error) {
    //         console.error(error);
    //         show({ type: 'error', message: '❌ Failed to complete registration' });
    //     }
    // };

    const handleNext = () => {
        show({ type: 'success', message: 'Registration Successful!' });
        navigation.navigate('Login');
    }


    return (
        <AuthScreenWrapper>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Let's</Text>
                    <Text style={styles.subheading}>
                        <Text style={styles.highlight}>Set</Text> your Password
                    </Text>

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                    />
                    <Input
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />

                    <View style={styles.validationContainer}>
                        <Text style={styles.validationTitle}>Password must:</Text>
                        <ValidationItem valid={validations.length} text="Be 8-25 characters long" />
                        <ValidationItem valid={validations.uppercase} text="Contain at least one uppercase letter" />
                        <ValidationItem valid={validations.lowercase} text="Contain at least one lowercase letter" />
                        <ValidationItem valid={validations.special} text="Contain at least one special character" />
                        <ValidationItem valid={validations.match} text="Both Password and Confirm Password are same" />
                    </View>

                    <CustomButton
                        title="Complete Registration"
                        onPress={handleNext}
                    // disabled={!Object.values(validations).every(v => v)}
                    />
                </View>
            </View>
        </AuthScreenWrapper>
    );
};

const ValidationItem = ({ valid, text }: { valid: boolean; text: string }) => (
    <View style={styles.validationItem}>
        <Text style={[styles.bullet, { color: valid ? '#00C853' : '#FF3B30' }]}>
            {valid ? '✓' : '•'}
        </Text>
        <Text style={[styles.validationText, { color: valid ? '#00C853' : '#666' }]}>
            {text}
        </Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly'
    },
    textContainer: {
        flex: 1,
        height: screenHeight * 0.7,
        justifyContent: 'flex-start',
        gap: 12,
    },
    heading: {
        fontSize: 35,
        marginBottom: -8,
        fontWeight: '600'
    },
    subheading: {
        fontSize: 35,
        marginBottom: 8,
        fontWeight: '600'
    },
    highlight: {
        color: '#00C853'
    },
    validationContainer: {
        padding: 10,
    },
    validationTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
    },
    bullet: {
        fontSize: 16,
        marginRight: 8,
        width: 16,
    },
    validationText: {
        fontSize: 12,
    },
});

export default PasswordSetup;