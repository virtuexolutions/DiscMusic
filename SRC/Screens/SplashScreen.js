import React from 'react';
import {ImageBackground, View} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';

const SplashScreen = () => {
  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeColor}
      statusBarContentStyle={'light-content'}>
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
        }}
        resizeMode={'stretch'}
        source={require('../Assets/Images/bg.png')}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <CustomImage
              source={require('../Assets/Images/logoSplash.png')}
              style={styles.bottomImage}
            />
          </View>
          <View style={styles.sec_imageContainer}>
            <CustomImage
              source={require('../Assets/Images/image123.png')}
              resizeMode={'stretch'}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
          <CustomText isBold style={styles.h1}>
            discover
            <CustomText
              isBold
              style={{
                color: Color.mediumGray,
                marginHorizontal: moderateScale(15, 0.3),
              }}>
              Music
            </CustomText>
            that moves you
          </CustomText>
          <CustomText
            style={{
              color: Color.white,
              marginHorizontal: moderateScale(15, 0.3),
              textAlign: 'center',
              fontSize: moderateScale(14, 0.3),
              width: windowWidth * 0.8,
              marginTop: moderateScale(10, 0.3),
            }}>
            explore curated playlists and top tracks that match your mood and
            keep you vibing all day long.
          </CustomText>

          <CustomButton
            text={'Get Start'}
            textColor={Color.white}
            width={windowWidth * 0.9}
            height={windowHeight * 0.08}
            marginTop={moderateScale(40, 0.3)}
            onPress={() => {}}
            isGradient={true}
            borderRadius={moderateScale(30, 0.3)}
            elevation
          />
        </View>
      </ImageBackground>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.15,
    flex: 1,
    alignItems: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  bottomImage: {
    width: '100%',
    height: '100%',
  },
  sec_imageContainer: {
    marginTop: moderateScale(40, 0.3),
    width: windowWidth * 0.9,
    height: windowHeight * 0.065,
  },
  imageContainer: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.3,
  },
  h1: {
    fontSize: moderateScale(27, 0.3),
    color: Color.white,
    letterSpacing: 1,
    marginTop: moderateScale(30, 0.3),
    width: windowWidth * 0.6,
    textAlign: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
    borderRadius: moderateScale((windowWidth * 0.7) / 2, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
});

export default SplashScreen;
