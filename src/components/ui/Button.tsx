import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    title: string;
    onPress: () => void;
    loading?: boolean;
    icon?: React.ReactNode;
    disabled?: boolean;
}

const CustomButton: React.FC<Props> = ({ title, onPress, loading = false, icon, disabled = false }) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                (disabled || loading) && styles.disabled,
            ]}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#fff" style={styles.loader} />
            ) : (
                <View style={styles.content}>
                    <Text style={styles.buttonText}>{title}</Text>
                    {icon ? (
                        <View style={styles.icon}>{icon}</View>
                    ) : (
                        <Ionicons name="arrow-forward" size={23} color="#fff" style={styles.icon} />
                    )}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        marginTop: 16,
        backgroundColor: '#00b386', // Green color
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    disabled: {
        opacity: 0.6,
    },
    loader: {
        marginRight: 8,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 20,
    },
    icon: {
        marginRight: 8,
        marginTop: 2,
    },
});

export default CustomButton;
