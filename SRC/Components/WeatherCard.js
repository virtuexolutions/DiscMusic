import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Color from '../Assets/Utilities/Color';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WeatherCard = ({ temperature, weatherType, icon }) => {
    // console.log('=============== >>>>>>weatherType', weatherType)
    const today = new Date();

    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <View style={styles.container}>
            {/* Temperature */}
            <CustomText style={styles.temperature}>
                {temperature}°
            </CustomText>

            {/* Icon + Heading */}
            <View style={styles.middleRow}>
                <Icon name='sunny' as={Ionicons} size={moderateScale(20, .6)} color={Color.white} />
                {/* <CustomImage source={icon} style={styles.icon} /> */}
                <CustomText style={styles.weatherText}>{weatherType}</CustomText>
            </View>

            {/* Date */}
            <View style={styles.dateRow}>
                <View>
                    <CustomText>10</CustomText>
                    <CustomText>10</CustomText>
                </View>
                <View>
                    <CustomText>10</CustomText>
                    <CustomText>10</CustomText>
                </View>
                <View>
                    <CustomText>10</CustomText>
                    <CustomText>10</CustomText>
                </View>
                {/* <CustomText style={styles.dateText}>{formattedDate}</CustomText> */}
            </View>
        </View>
    );
};

export default WeatherCard;

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.32,
        height: windowHeight * 0.136,
        marginRight: moderateScale(10, .6),
        borderRadius: moderateScale(10, .6),
        padding: moderateScale(10, .6),
        backgroundColor: Color.themeBlack,
        justifyContent: 'space-between',
        // alignItems: 'center',
    },
    temperature: {
        fontSize: moderateScale(30, .6),
        fontWeight: 'bold',
        color: Color.white,
    },
    middleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: moderateScale(40, .6),
        height: moderateScale(40, .6),
        marginRight: moderateScale(8, .6),
        resizeMode: 'contain',
    },
    weatherText: {
        fontSize: moderateScale(16, .6),
        color: Color.white,
        fontWeight: '600',
    },
    dateText: {
        fontSize: moderateScale(14, .6),
        color: Color.veryLightGray,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});