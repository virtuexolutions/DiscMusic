import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomStatusBar from '../Components/CustomStatusBar';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import SubscriptionPlanCard from '../Components/SubscriptionPlanCard';

const ReviewYourPlan = () => {
  return (
    <>
      {/* <CustomStatusBar /> */}
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}
        imageStyle={styles.image}>
        <View style={styles.sectionHeader}>
          <CustomText style={styles.title} children={'Review Yor Plan'} />
          <CustomButton
            isGradient
            text={'Change Plan'}
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.07}
            // onPress={() => { setIsVisible(false) }}
            onPress={() => {}}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={windowWidth / 2}
            fontSize={moderateScale(16, 0.3)}
          />
        </View>
        <SubscriptionPlanCard/>
        <CustomText
        children={"Choose how to pay"}
        style={styles.text1}
        />
        <CustomText
        children={"Choose how to pay"}
        style={styles.text1}
        />
      </ImageBackground>
    </>
  );
};

export default ReviewYourPlan;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
  },
  title: {
    fontSize: moderateScale(14, 0.2),
    color: Color.white,
    fontWeight: 'semibold',
  },
});
