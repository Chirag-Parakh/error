// src/hooks/useAuth.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from '../store/atom';

export const useAuth = () => {
    const [loggedIn, setLoggedIn] = useRecoilState(isLoggedIn);

    const login = async () => {
        await AsyncStorage.setItem('userToken', 'dummy_token');
        setLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setLoggedIn(false);
    };

    return { loggedIn, login, logout };
};
