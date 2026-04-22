import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from './CustomImage';
import { Icon } from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
// import Slider from '@react-native-community/slider';

const MinimizedPlayer = ({
  title = "",
  subtitle = "",
  image = null,
  onPressLike = null,
  onPressVolume = null,
  onPressPlay = null,

}) => {
  return (
    <LinearGradient
      colors={["#353A40", '#32373D', '#23282C']}
      style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            source={require("../Assets/Images/song1.png")}
            style={styles.image}
          />
        </View>
        <View style={styles.info}>
          <CustomText
            children={"don’t forget your roots - 2021"}
            style={styles.title}
          />
          <CustomText
            children={"six 60"}
            style={styles.subtitle}
          />
        </View>
        <View style={styles.actions}>
          <Icon
            name='control-pause'
            as={SimpleLineIcons}
            color={Color.white}
            size={moderateScale(14, 0.2)}
            onPress={onPressPlay ?? function () { }}
          />
          <Icon
            name='heart-alt'
            as={Fontisto}
            color={"#7F8489"}
            size={moderateScale(14, 0.2)}
            onPress={onPressLike ?? function () { }}
          />
          <Icon
            name='volume-2'
            as={Feather}
            color={"#7F8489"}
            size={moderateScale(14, 0.2)}
            onPress={onPressVolume ?? function () { }}
          />
        </View>
      </View>
      {/* <Slider
       style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor='#11A8FD'
       /> */}
    </LinearGradient>
  )
}

export default MinimizedPlayer;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderRadius: moderateScale(24, 0.2),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  innerContainer: {
    flexDirection: "row",
  },
  slider: {
    width: windowWidth * 0.95,
    height: scale(20)
  }

})