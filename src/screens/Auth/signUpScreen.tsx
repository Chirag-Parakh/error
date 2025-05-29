import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import EmailOTP from '../../components/auth/EmailOTP';
import PasswordSetup from '../../components/auth/PasswordSetup';
import UserInfoForm from '../../components/auth/UserInfoForm';
import ComingSoonScreen from '../Onboarding/waitlistScreen';

enum STAGES {
    USER_INFO,
    EMAIL_OTP,
    COLLEGE_SELECTION,
    SET_PASSWORD,
    SUBMIT,
}

const FORM_DATA_KEY = 'registration_form_data';
const STAGE_KEY = 'registration_stage';

const RegistrationScreen = () => {
    const [stage, setStage] = useState(STAGES.USER_INFO);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: null as Date | null,
        emailVerified: false,
        phoneVerified: false,
        college: '',
        password: '',
    });

    // AsyncStorage.removeItem(FORM_DATA_KEY)
    // AsyncStorage.removeItem(STAGE_KEY)

    useEffect(() => {
        const loadFromStorage = async () => {
            const savedStage = await AsyncStorage.getItem(STAGE_KEY);
            const savedData = await AsyncStorage.getItem(FORM_DATA_KEY);
            if (savedStage) setStage(Number(savedStage));
            if (savedData) setFormData(JSON.parse(savedData));
        };

        loadFromStorage();
    }, []);

    const saveStage = async (nextStage: STAGES) => {
        setStage(nextStage);
        await AsyncStorage.setItem(STAGE_KEY, String(nextStage));
    };

    const updateFormData = async (newData: Partial<typeof formData>) => {
        const updated = { ...formData, ...newData };
        setFormData(updated);
        await AsyncStorage.setItem(FORM_DATA_KEY, JSON.stringify(updated));
    };

    const renderStage = () => {
        switch (stage) {
            case STAGES.USER_INFO:
                return <UserInfoForm onNext={() => setStage(STAGES.EMAIL_OTP)} data={formData} update={updateFormData} />;
            case STAGES.EMAIL_OTP:
                return <EmailOTP onVerified={() => saveStage(STAGES.SET_PASSWORD)} mode="email" data={formData.email} />;
            // case STAGES.COLLEGE_SELECTION:
            //     return <CollegeSelection onNext={() => saveStage(STAGES.SET_PASSWORD)} update={updateFormData} />;
            case STAGES.SET_PASSWORD:
                return <PasswordSetup onNext={() => saveStage(STAGES.SUBMIT)} update={updateFormData} />;
            case STAGES.SUBMIT:
                return <ComingSoonScreen />;
            default:
                return <Text>Error loading form</Text>;
        }
    };

    return <View style={{ flex: 1 }}>{renderStage()}</View>;
};

export default RegistrationScreen;
