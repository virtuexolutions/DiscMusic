import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useSelector } from "react-redux";
import Color from "../Assets/Utilities/Color";
import CustomText from "./CustomText";
import FastImage from "react-native-fast-image";
import LottieView from "lottie-react-native";

const Loader = (props) => {
  // const reduxTextObject = useSelector((state) => state.langViewReducer.data);
  const { bgColor, textColor, height, width, text, size, indicator, image, animation } = props;
  return (
    <View
      style={[
        styles.container,
        bgColor && {
          backgroundColor: bgColor,
        },
        height && {
          height: height,
          position: "relative",
        },
        width && {
          width: width,
        },
      ]}
    >
      {
        image && <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <FastImage
            style={{ width: 100, height: 100, borderRadius: 8 }}
            source={require('../Assets/Images/loader.gif')
              // priority: FastImage.priority.normal,
            }
          // resizeMode={FastImage.resizeMode.cover}
          />
          {/* <Text style={{ marginTop: 5 }}>{item.name}</Text> */}
        </View>
      }
      {animation && <LottieView
        source={require('../Assets/Images/Images/SoundWaves.json')}
        autoPlay
        loop
        style={{ width: 150, height: 150 }}
      />}
      {indicator && <ActivityIndicator
        size={size}
        color={textColor ? textColor : Color.green}
      />}
      {text && (
        <CustomText
          style={[
            styles.text,
            bgColor && {
              color: Color.black,
            },
            textColor && {
              color: textColor,
            },
          ]}
          isBold
        >
          Please Wait
        </CustomText>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  text: {
    fontSize: moderateScale(17, 0.3),
    marginTop: moderateScale(5, 0.3),
    color: Color.white,
  },
});

export default Loader;
