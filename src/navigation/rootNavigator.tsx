import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import ForgotPassword from '../screens/Auth/forgotPassword';
import LoginScreen from '../screens/Auth/loginScreen';
import SignupStep from '../screens/Auth/signUpScreen';
import Onboarding1 from '../screens/Onboarding/onBoardingScreen';
import WaitListScreen from '../screens/Onboarding/waitlistScreen';

const Stack = createNativeStackNavigator();

const RootNavigator: React.FC = () => {
    const { loggedIn } = useContext(AuthContext);

    if (loggedIn === null) {
        return null; // or loading spinner
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {loggedIn ? (
                <Stack.Screen name="MainTabs" component={WaitListScreen} />
            ) : (
                <>
                    <Stack.Screen name="Onboarding1" component={Onboarding1} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupStep} />
                    <Stack.Screen name="Forgot" component={ForgotPassword} />
                </>
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;
