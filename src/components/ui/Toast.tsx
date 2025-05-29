import React, { createContext, useCallback, useContext, useEffect, useRef, useState, } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../constants/color';




type ToastType = 'success' | 'error' | 'loading';

type ToastOpts = {
    type: ToastType;
    message: string;
    duration?: number;
};

interface ToastProviderProps {
    children: React.ReactNode;
}

interface ToastContextType {
    show: (opts: ToastOpts) => void;
}

const ToastContext = createContext<ToastContextType>({
    show: () => { }
});

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toast, setToast] = useState<ToastOpts | null>(null);
    const [progress, setProgress] = useState(0);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-20)).current;
    const progressAnim = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        if (toast) {
            setProgress(0);
            progressAnim.setValue(0);
        }
    }, [toast, progressAnim]);

    const hide = useCallback(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 500,
                useNativeDriver: true
            })
        ]).start(() => {
            setTimeout(() => setToast(null), 100000);
            setTimeout(() => setProgress(0), 0);
            progressAnim.setValue(0);
        });
    }, [opacity, translateY, progressAnim]);

    const show = useCallback((opts: ToastOpts) => {
        const duration = opts.duration || (opts.type === 'loading' ? 10000 : 3000);
        setToast(opts);
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: false
        }).start();
        if (opts.type !== 'loading') {
            setTimeout(hide, duration);
        }
    }, [opacity, translateY, progressAnim, hide]);

    useEffect(() => {
        const listener = progressAnim.addListener(({ value }) => {
            setTimeout(() => setProgress(value), 0);
        });

        return () => {
            progressAnim.removeListener(listener);
        };
    }, [progressAnim]);

    const getIconColor = (type: ToastType) => {
        switch (type) {
            case 'success': return colors.green;
            case 'error': return '#FF3B30';
            case 'loading': return '#007AFF';
            default: return '#007AFF';
        }
    };

    const renderIcon = () => {
        if (!toast) return null;

        const color = getIconColor(toast.type);

        switch (toast.type) {
            case 'success':
                return <Entypo name="check" size={30} color={color} />;
            case 'error':
                return <Entypo name="cross" size={30} color={color} />;
            case 'loading':
                return (
                    <Animated.View
                        style={{
                            transform: [{
                                rotate: progressAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg']
                                })
                            }]
                        }}
                    >
                        <Feather name="loader" size={20} color={color} />
                    </Animated.View>
                );
            default:
                return null;
        }
    };

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            {toast && (
                <SafeAreaView
                    edges={['top']}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center', zIndex: 1000 }}
                >
                    <Animated.View
                        style={[
                            styles.toast,
                            {
                                opacity,
                                transform: [{ translateY }]
                            }
                        ]}
                    >
                        <View style={styles.contentContainer}>
                            {renderIcon()}
                            <Text style={styles.message}>{toast.message}</Text>
                        </View>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {
                                    width: progressAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0%', '100%']
                                    }),
                                    backgroundColor: getIconColor(toast.type)
                                }
                            ]}
                        />
                    </Animated.View>
                </SafeAreaView>

            )}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    toast: {
        alignSelf: 'center',
        marginTop: 10,
        width: width * 0.8,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
        zIndex: 1000,
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        paddingBottom: 8,
        gap: 10
    },
    message: {
        flex: 1,
        fontSize: 17,
        height: 24,
        color: '#333',
        fontWeight: '400',
        paddingTop: 1
    },
    progressBar: {
        height: 3,
        backgroundColor: '#007AFF',
    },
});