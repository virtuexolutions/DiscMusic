import { ImageBackground, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import { useIsFocused } from '@react-navigation/native'

const ScanScreen = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const isFocused = useIsFocused();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      if (scanned) return;
      if (codes.length > 0) {
        setScanned(true);
        const value = codes[0].value;
        console.log(`Scanned code: ${value}`);
        Alert.alert("Code Scanned successfully", `Value: ${value}`, [
          { text: "OK", onPress: () => setScanned(false) }
        ]);
      }
    }
  });

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>
        <CustomHeader
          leftIcon={true}
          showBack={true}
          text={"Search"} />
        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              {device != null && hasPermission ? (
                <Camera
                  style={styles.image}
                  device={device}
                  isActive={isFocused}
                  codeScanner={codeScanner}
                />
              ) : (
                <CustomImage
                  style={styles.image}
                  source={require("../Assets/Images/scan.png")}
                />
              )}
            </View>
            <CustomImage
              style={styles.waves}
              source={require("../Assets/Images/waves.png")} />
          </View>
          <CustomText
            children={"Point your camera at a music code"}
            style={styles.text1}
          />
          <CustomText
            children={"Select from photos"}
            style={styles.text2}
          />
        </View>
      </ImageBackground>
    </>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    // justifyContent:"center",
    // paddingHorizontal:scale(5)
  },
  image: {
    width: "100%",
    height: "100%"
  },
  main: {
    alignItems: "center",
    // gap:scale(30)
  },
  container: {
    marginTop: verticalScale(40),
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: moderateScale(40, 0.2),
    justifyContent: "center",
    alignItems: "center",
    gap: scale(40),
    // backgroundColor:"red",
    width: windowWidth,
    paddingVertical: verticalScale(50)
  },
  imgContainer: {
    width: windowWidth * 0.76,
    height: windowHeight * 0.4,
    overflow: "hidden",
    borderRadius: moderateScale(40, 0.2),
  },
  waves: {
    width: windowWidth * 0.45,
    height: scale(30)
  },
  text1: {
    marginTop: verticalScale(30),
    fontSize: moderateScale(14, 0.2),
    // lineHeight:"100%",
    color: Color.white
  },
  text2: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(10, 0.2),
    lineHeight: moderateScale(14, 0.2),
    color: Color.themeLightGray
  }
})