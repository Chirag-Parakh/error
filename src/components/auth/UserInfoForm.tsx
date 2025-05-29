import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import colors from '../../constants/color';
import AuthScreenWrapper from '../common/AuthScreenWrapper';
import CustomButton from '../ui/Button';
import Input from '../ui/form/Input';

interface Props {
    onNext: () => void;
    data: { name: string; email: string; phone: string; dob: Date | null };
    update: (data: Partial<Props['data']>) => void;
}



const UserInfoForm: React.FC<Props> = ({ onNext, data, update }) => {
    const [name, setName] = useState(data.name);
    const [email, setEmail] = useState(data.email);
    const [phone, setPhone] = useState(data.phone);
    const [dob, setDob] = useState<Date | null>(data.dob);
    const [open, setOpen] = useState(false);

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
    });

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const data = await AsyncStorage.getItem('registration_form_data')
                if (data) {
                    const parsedData = JSON.parse(data);
                    console.log(parsedData)
                    setName(parsedData.name)
                    setEmail(parsedData.email)
                    setPhone(parsedData.phone)
                    setDob(new Date(parsedData.dob))
                }
            }
            catch {

            }
        }
        fetchValues()
    }, [])

    const validate = () => {
        let valid = true;
        const newErrors = { name: '', email: '', phone: '', dob: '' };

        if (!name.trim()) {
            newErrors.name = 'Name cannot be empty.';
            valid = false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email.';
            valid = false;
        }

        if (!/^[6-9]\d{9}$/.test(phone)) {
            newErrors.phone = 'Please enter a valid mobile number.';
            valid = false;
        }

        if (!dob) {
            newErrors.dob = 'Please select your date of birth.';
            valid = false;
        } else {
            const today = new Date();
            const age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (!(age > 14 || (age === 14 && m >= 0))) {
                newErrors.dob = 'You must be at least 14 years old.';
                valid = false;
            }
        }
        setErrors(newErrors);
        return valid;
    };

    const handleNext = () => {
        if (!validate()) { return; }
        update({ name, email, phone, dob });
        onNext();
    };

    return (
        <AuthScreenWrapper>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Let's</Text>
                    <Text style={styles.subheading}>
                        <Text style={styles.highlight}>Create</Text>
                        <Text> your account .</Text>
                    </Text>
                    <Input
                        label="Name"
                        value={name}
                        onChangeText={setName}
                        error={errors.name}
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        error={errors.email}
                    />
                    <Input
                        label="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        isMobile
                        maxLength={10}
                        keyboardType="numeric"
                        error={errors.phone}
                    />
                    <Input
                        label="Date of Birth"
                        value={dob ? new Date(dob).toLocaleDateString() : ''}
                        editable={false}
                        onPress={() => setOpen(true)}
                        error={errors.dob}
                    />
                    <DatePicker
                        modal
                        open={open}
                        date={dob || new Date()}
                        mode="date"
                        onConfirm={(date) => {
                            setOpen(false);
                            setDob(date);
                        }}
                        onCancel={() => setOpen(false)}
                    />
                    <CustomButton title="Next" onPress={handleNext} loading={false} />
                </View>
            </View>
        </AuthScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginTop: 70
    },
    textContainer: {
        gap: 12,

    },
    heading: {
        fontSize: 32,
        marginBottom: -8,
        fontWeight: '600',
    },
    subheading: {
        fontSize: 32,
        marginBottom: 8,
        fontWeight: '600',
    },
    highlight: {
        color: colors.green,
    },
});

export default UserInfoForm;
