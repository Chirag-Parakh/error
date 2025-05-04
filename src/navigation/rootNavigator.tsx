
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import ForgotPassword from '../screens/Auth/forgotPassword';
import LoginScreen from '../screens/Auth/loginScreen';
import SignupStep from '../screens/Auth/signUpScreen';
import Onboarding1 from '../screens/Onboarding/onBoardingScreen';
import { authState } from '../store/atom';
import BottomTabNavigator from './bottomTabNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
    const [firstLaunch, setFirstLaunch] = useState<boolean>(false);
    const isLoggedIn = useRecoilValue(authState);
    useEffect(() => {
        AsyncStorage.getItem('hasLaunched').then(value => {
            if (value === null) {
                AsyncStorage.setItem('hasLaunched', 'true');
                setFirstLaunch(true);
            }
        });
    }, []);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {firstLaunch ? (
                <>
                    <Stack.Screen name="Onboarding1" component={Onboarding1} />
                </>
            ) : isLoggedIn ? (
                <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            ) : (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupStep} />
                    <Stack.Screen name="Forgot" component={ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
