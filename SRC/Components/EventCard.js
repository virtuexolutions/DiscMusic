import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import { moderateScale } from 'react-native-size-matters'
import CustomText from './CustomText'
import Color from '../Assets/Utilities/Color'

const EventCard = ({ data }) => {
    return (
        <ImageBackground source={data?.image} style={styles.card_view} imageStyle={styles.image}>
            <View style={styles.card_inner_view}>
                <CustomText style={styles.heading}>{data?.name}</CustomText>
                <CustomText style={styles.desc}>{data?.text}</CustomText>
            </View>
        </ImageBackground >
    )
}

export default EventCard

const styles = StyleSheet.create({
    card_view: {
        width: windowWidth * 0.32,
        height: windowWidth * 0.29,
        backgroundColor: 'red',
        marginRight: moderateScale(10, 0.6),
        borderRadius: moderateScale(10, 0.6),
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(10, 0.6)
    },
    card_inner_view: {
        paddingHorizontal: moderateScale(5, 0.6),
        width: '100%',
        height: '90%',
        justifyContent: 'flex-end'
    },
    heading: {
        fontSize: moderateScale(12, 0.6),
        color: Color.white
    },
    desc: {
        fontSize: moderateScale(10, 0.6),
        color: Color.veryLightGray
    }
})