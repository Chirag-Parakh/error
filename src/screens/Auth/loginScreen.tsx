import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// import { useSetRecoilState } from 'recoil';
import { useContext } from 'react';
import AuthScreenWrapper from '../../components/common/AuthScreenWrapper';
import CustomButton from '../../components/ui/Button';
import Input from '../../components/ui/form/Input';
import { AuthContext } from '../../context/AuthContext';
// import { isLoggedIn } from '../../store/atom';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    // const setIsLoggedIn = useSetRecoilState(isLoggedIn);
    const { login } = useContext(AuthContext);

    const [Password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true);
        const dummyLoginSuccess = true;
        if (dummyLoginSuccess) {
            await login();
            // No need to navigate manually because RootNavigator will update automatically
        }
        setLoading(false);
    };

    return (
        <AuthScreenWrapper>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Let's</Text>
                <Text style={styles.subheading}>
                    <Text style={styles.greenText}>Login</Text>
                    <Text> Now.</Text>
                </Text>
            </View>

            <View style={styles.formContainer}>
                <Input
                    label="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input label="Password" isPassword value={Password} onChangeText={setPassword} />

                <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <CustomButton title='Login' onPress={handleLogin} loading={loading} />
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Don&apos;t have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.signupLink}>Sign up</Text>
                    </TouchableOpacity>
                </View>
                <Pressable>
                    <Text style={styles.termsText}>Terms & Conditions</Text>
                </Pressable>
            </View>
        </AuthScreenWrapper>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    headingContainer: {

        marginBottom: 24,
    },
    heading: {
        fontSize: 40,
        marginBottom: -8,
        fontWeight: '600',
    },
    subheading: {
        fontSize: 40,
        marginBottom: 8,
        fontWeight: '600',
    },
    greenText: {
        color: '#00b386',
    },
    formContainer: {
        gap: 16,
        marginBottom: 24,
    },
    forgotPasswordText: {
        marginLeft: 8,
        fontSize: 12,
        color: '#718096',
        marginTop: -8,
    },
    loginButton: {
        backgroundColor: '#00b386',
        paddingVertical: 16,
        borderRadius: 8,
        marginTop: 8,
    },
    loginButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '600',
        color: '#ffffff',
    },
    footerContainer: {
        marginTop: 'auto',
        paddingBottom: 20,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    signupText: {
        color: '#888',
    },
    signupLink: {
        color: '#00b386',
        fontWeight: '500',
    },
    termsText: {
        textAlign: 'center',
        color: '#bbb',
        fontSize: 12,
    },
});