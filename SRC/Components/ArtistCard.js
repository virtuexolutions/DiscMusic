import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'

const ArtistCard = ({
    image,
    title,
    onPress,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <View style={styles.imageContainer}>
                <CustomImage
                    onPress={onPress}
                    source={image}
                    style={styles.image}
                />
            </View>
            <CustomText
                style={styles.text}
                children={title}
            />
        </TouchableOpacity>
    )
}

export default ArtistCard

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.17,
        backgroundColor: "#282C30",
        paddingHorizontal: scale(5),
        paddingVertical: verticalScale(8),
        borderTopWidth: 1,
        borderTopColor: "#3B4047",
        gap: verticalScale(15),
        shadowColor: '#000',
        borderRadius: moderateScale(20, 0.2),
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    imageContainer: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        overflow: "hidden",
        borderRadius: scale(20),
    },
    image: {
        width: "100%",
        height: "100%",
    },
    text: {
        fontSize: moderateScale(11, 0.6),
        lineHeight: moderateScale(12),
        color: "#989CA0",
        textTransform: "capitalize"
    }
})