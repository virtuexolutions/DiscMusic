import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import { Icon } from 'native-base';
import Entypo from "react-native-vector-icons/Entypo";
import CustomImage from './CustomImage';
import LinearGradient from 'react-native-linear-gradient';
const ThemeIconButton = ({
  arrowRight,
  iconName,
  iconType,
  iconSource,
  onPress,
  iconSize,
  style,
  iconColor,
  isGradient,
  gradientColors
}) => {
  // console.log('iconColor==================== >>>>>>>>>>>>>>>>>>>>>>>>', iconColor)
  const icon = iconName
    ? iconName
    : arrowRight
      ? "chevron-thin-right"
      : "chevron-small-down";

  const type = iconType
    ? iconType
    : Entypo;
  let iconComponent;

  if (iconSource) {
    iconComponent = <CustomImage

      onPress={onPress}
      source={iconSource} style={[{ width: iconSize ?? scale(20), height: iconSize ?? scale(20) }, iconColor && { tintColor: iconColor }]} />
  } else {
    iconComponent = <Icon
      as={type}
      name={icon}
      size={iconSize ?? moderateScale(20, 0.6)

      }


      color={iconColor ? iconColor : Color.white}
    />
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      // activeOpacity={0.4}
      style={isGradient ? {
        width: "auto",
        height: "auto"
      } : [styles.button, style]}>
      {
        isGradient ? <LinearGradient
          style={[styles.button, style]}
          colors={gradientColors}
          children={iconComponent}
        /> : iconComponent
      }

    </TouchableOpacity>

  )
}

export default ThemeIconButton

const styles = StyleSheet.create({
  button: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderRadius: (windowWidth * 0.12) / 2,
    backgroundColor: '#1C1F22',
    // backgroundColor: 'red',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 16,
  }
})