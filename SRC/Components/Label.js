import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { windowWidth } from '../Utillity/utils'

const Label = ({
    text="",
    style,
}) => {
  return (
    <View style={[styles.container, style]}>
        <CustomText
        style={styles.text1}
        children={text}
        />
    </View>
  )
}

export default Label

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        width:windowWidth * 0.65,
        backgroundColor:"rgba(0,0,0,0.4)",
        // paddingHorizontal:scale(70),
        paddingVertical:verticalScale(10),
        borderRadius:moderateScale(50,0.2),
    },
    text1:{
        fontSize:moderateScale(14,0.2),
        color:"#7F8489"
    }
})