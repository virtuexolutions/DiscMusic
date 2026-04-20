import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import SwitchToggle from "react-native-switch-toggle";
import { windowWidth } from '../Utillity/utils'

const ToggleSwitchWithInfo = ({
  on = false,
  title = "",
  description = "",
  onToggle = () => { }
}) => {
  // console.log("first ", on)
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <CustomText
          style={styles.text1}
          children={title}
        />
        <CustomText
          style={styles.text2}
          children={description}
        />
      </View>
      <SwitchToggle
        switchOn={on}

        circleStyle={{
          width: scale(20),
          height: scale(20),
          borderRadius: scale(20) / 2,
          right: on ? 10 : -5,
        }}
        containerStyle={{
          backgroundColor: Color.red,
          // paddingRight:scale(24),
          // backgroundColor: on ? Color.white : Color.red,
          width: scale(55),
          height: scale(30),
          borderWidth: 2,
          borderColor: on ? Color.themeSkyBlue : Color.black,
          shadowOpacity: 0.15,
          shadowRadius: 25,
          elevation: 15,
          shadowColor: on ? Color.black : '#FFFFFF',
          shadowOffset: { width: 0, height: 15 },
          borderRadius: moderateScale(20, 0.2)
        }}
        circleColorOn='white'
        circleColorOff='white'
        backgroundColorOff={Color.darkGray}
        backgroundColorOn={Color.themeSkyBlue}
        onPress={onToggle}
      />
    </View>
  )
}

export default ToggleSwitchWithInfo

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8,
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(10)
  },
  info: {
    gap: scale(4),
    // backgroundColor:"red",
    width: "80%"
  },
  text1: {
    fontSize: moderateScale(12, 0.2),
    color: Color.white
  },
  text2: {

    fontSize: moderateScale(9, 0.2),
    color: "#7F8489",
    // width:"60%",
  }
})