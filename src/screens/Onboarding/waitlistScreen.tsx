import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../../components/ui/Button';
import colors from '../../constants/color';
import { AuthContext } from '../../context/AuthContext';

function CampusBadge() {
    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>S</Text>
        </View>
    );
}

const userName = 'Chirag';
const campus = 'IIT Delhi';
const progress = 75;
const usersNeeded = 3725;

export default function ComingSoonScreen() {
    const { logout } = useContext(AuthContext);
    const handleShare = () => {
        console.log('Share button pressed');
    };

    const handleProfilePress = async () => {
        logout()
    };

    const animatedWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedWidth, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [animatedWidth]);

    const progressWidth = animatedWidth.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const backgroundImage = require('../../assets/eng.png');


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <Image
                source={backgroundImage}
                style={styles.backgroundImage}
                resizeMode="contain"
            />
            <View style={styles.container}>
                {/* <BackgroundPattern /> */}

                <View style={styles.header}>
                    <View style={styles.greeting}>
                        <Text style={styles.heyText}>Hey,</Text>
                        <Text style={styles.nameText}>{userName}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.profileButton}
                        onPress={handleProfilePress}
                    >
                        <AntDesign name="user" size={28} />
                    </TouchableOpacity>
                </View>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/logo.png') as ImageSourcePropType}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.campusContainer}>
                    <Text style={styles.campusText}>{campus}</Text>
                    <Text style={styles.waitlistText}>is on the Waitlist!</Text>
                </View>

                <Text style={styles.descriptionText}>
                    We're bringing Sellular to your campus soon.
                </Text>

                <View style={styles.progressSection}>
                    <View style={styles.progressHeader}>
                        <Text style={styles.progressTitle}>Campus Launch Progress</Text>
                        <Text style={styles.progressPercentage}>{progress}%</Text>
                    </View>

                    {/* <ProgressBar progress={progress} /> */}
                    <View style={styles.progessContainer}>
                        <Animated.View
                            style={[
                                styles.progress,
                                { width: progressWidth }
                            ]}
                        />
                    </View>

                    <Text style={styles.usersNeededText}>
                        <Text style={styles.usersNeededNumber}>{usersNeeded.toLocaleString()}</Text> more users needed to unlock
                    </Text>
                </View>

                <View style={styles.badgesContainer}>
                    <CampusBadge />
                    <CampusBadge />
                    <CampusBadge />
                </View>

                <View style={styles.inviteSection}>
                    <Text style={styles.inviteText}>
                        Help us launch faster by spreading the word.
                    </Text>
                    <Text style={styles.inviteSubtext}>
                        Tap below and invite your friends to join the waitlist!
                    </Text>
                    <CustomButton
                        onPress={handleShare}
                        title="Get More Friends In!"
                        icon={<Entypo name="share" size={23} color="#fff" />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    badgeContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        color: colors.green,
    },
    logo: {
        width: 72,
        height: 74,
        zIndex: 10,
    },
    badgeText: {
        fontSize: 28,
        fontWeight: '700',
        color: colors.green,
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    greeting: {
        flexDirection: 'column',
    },
    heyText: {
        fontSize: 20,
    },
    nameText: {
        fontSize: 28,
        fontWeight: '700',
    },
    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    campusContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    campusText: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.green,
        textAlign: 'center',
    },
    waitlistText: {
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
    },
    descriptionText: {
        fontSize: 16,
        color: colors.lightGray,
        textAlign: 'center',
        marginVertical: 22,
    },
    progressSection: {
        marginBottom: 32,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    progressPercentage: {
        fontSize: 16,
        fontWeight: '700',
    },
    usersNeededText: {
        fontSize: 14,
        color: colors.lightGray,
        marginTop: 8,
        textAlign: 'center',
    },
    usersNeededNumber: {
        fontWeight: '600',
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        gap: 16,
    },
    inviteSection: {
        alignItems: 'center',
        marginTop: 'auto',
    },
    inviteText: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.lightGray,
        textAlign: 'center',
        marginBottom: 4,
    },
    inviteSubtext: {
        fontSize: 14,
        color: colors.lightGray,
        textAlign: 'center',
        marginBottom: 16,
    },
    inviteButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: 8,
        shadowColor: colors.green,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    inviteButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    progress: {
        height: '100%',
        backgroundColor: colors.green,
        borderRadius: 6,
    },
    progessContainer: {
        height: 12,
        backgroundColor: colors.lightGray,
        borderRadius: 6,
        overflow: 'hidden',
    }
});