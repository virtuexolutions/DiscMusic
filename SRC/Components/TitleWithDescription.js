import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'

const TitleWithDescription = ({
    title = "",
    description = "",
    style,
    descriptionStyle,
    titleStyle,
    onPress,
    disable,
}) => {
    return (
        <TouchableOpacity disabled={disable} onPress={onPress} style={[styles.container, style]}>
            <CustomText

                ellipsizeMode={"tail"}
                style={[styles.text1, titleStyle]}
                children={title}
            />
            <CustomText
                ellipsizeMode={"tail"}
                style={[styles.text2, descriptionStyle]}
                children={description}
            />
        </TouchableOpacity>
    )
}

export default TitleWithDescription

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.75,
        gao: scale(6),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(18)

    },
    text1: {
        fontSize: moderateScale(12, 0.2),
        color: Color.white,
        textTransform: "capitalize"
    },
    text2: {

        fontSize: moderateScale(9, 0.2),
        color: "#7F8489",
        // width:"60%",
    }
})