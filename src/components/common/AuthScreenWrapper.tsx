import React, { useEffect, useRef } from 'react';
import {
    Image,
    ImageSourcePropType,
    Keyboard,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import colors from '../../constants/color';

interface ScreenWrapperProps {
    children: React.ReactNode;
    showBackgroundImage?: boolean;
    backgroundImage?: ImageSourcePropType;
}

const AuthScreenWrapper: React.FC<ScreenWrapperProps> = ({
    children,
    showBackgroundImage = true,
    backgroundImage = require('../../assets/eng.png'),
}) => {
    const scrollViewRef = useRef<ScrollView>(null);
    useEffect(() => {
        const showSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (event) => {
                console.log(event)
                // Just listen for keyboard events if needed
            }
        );

        const hideSubscription = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                // Just listen for keyboard events if needed
            }
        );

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <View style={styles.container}>
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                    style={styles.scrollView}
                    keyboardDismissMode="none"
                    automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
                >
                    <View style={styles.inner}>
                        {showBackgroundImage && (
                            <Image
                                source={backgroundImage}
                                style={styles.backgroundImage}
                                resizeMode="contain"
                            />
                        )}
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.logo}
                        />
                        <View style={styles.childrenContainer}>{children}</View>
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

export default AuthScreenWrapper;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#00b386',
        zIndex: 20,
    },
    container: {
        flex: 1,
        backgroundColor: colors.lightBG,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 24,
    },
    inner: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        gap: 24,
    },
    backgroundImage: {
        position: 'absolute',
        right: '-110%',
        top: '-90%',
        width: '200%',
        height: '200%',
        opacity: 0.1,
        transform: [{ rotate: '45deg' }],
    },
    logo: {
        width: 72,
        height: 74,
        marginBottom: 16,
        alignSelf: 'center',
    },
    childrenContainer: {
        width: '100%',
    },
});