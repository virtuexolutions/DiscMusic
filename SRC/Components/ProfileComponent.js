import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import ThemeIconButton from './ThemeIconButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { useSelector } from 'react-redux'

const ProfileComponent = () => {
  const userData = useSelector((state) => state.commonReducer.userData);
  console.log(userData, '============================== >>>>>> userdata');
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <CustomText
          isBold
          style={styles.text1}
          children={"S"}

        />
      </View>
      <View style={styles.info}>
        <CustomText
          isBold
          style={styles.text2}
          children={userData?.name}
        />
        <CustomText
          style={styles.text3}
          children={"View Profile"}
        />
      </View>
      <ThemeIconButton
        arrowRight={true}
        onPress={() => { }}
      />
    </View>
  )
}

export default ProfileComponent

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: "#282C30",
    paddingVertical: verticalScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  circle: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderRadius: (windowWidth * 0.12) / 2,
    backgroundColor: '#1C1F22',
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
  },
  info: {
    width: "50%",
    gap: verticalScale(5)
  },
  text1: {
    fontSize: moderateScale(20, 0.2),
    color: Color.white
  },
  text2: {
    fontSize: moderateScale(16, 0.3),
    color: Color.white,
  },
  text3: {
    fontSize: moderateScale(12, 0.3),
    color: "#7F8489"
  }
})