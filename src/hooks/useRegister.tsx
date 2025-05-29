import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { useToast } from '../components/ui/Toast';
import { AuthStackParamList } from '../types/navigation'; // Adjust path as needed

export const useRegister = (navigation: NativeStackNavigationProp<AuthStackParamList>) => {
    const { show } = useToast();

    const registerUser = async (data: {
        dob: string;
        email: string;
        mobile: string;
        password_hash: string;
        username: string;
    }) => {
        try {
            const response = await axios.post('https://api-dev.sellular.club/api/v1/user/registration/addprofile', data);

            if (response.status === 200 || response.status === 201) {
                show({ type: 'success', message: 'Registration Successful!' });
                navigation.navigate('Login');
            } else {
                show({ type: 'error', message: '⚠️ Something went wrong. Try again.' });
            }
        } catch (error: any) {
            console.log(error?.response)
            show({ type: 'error', message: error?.response?.data?.message || 'Registration failed' });
        }
    };

    return { registerUser };
};
