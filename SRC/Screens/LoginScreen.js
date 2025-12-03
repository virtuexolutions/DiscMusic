import { ScrollView, View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import { ImageBackground } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import CustomButton from '../Components/CustomButton';

const LoginScreen = () => {
  return (
    <>
      <CustomStatusBar
        backgroundColor={
          Color.black
        }
        barStyle={'light-content'}
      />
      <ImageBackground source={require('../Assets/Images/bg.png')} style={styles.bg_container} imageStyle={styles.image}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
          <View style={styles.container}>
            <CustomHeader leftIcon RightIcon />
            <View style={styles.text_view}>
              <CustomText isBold style={styles.Heading}>Hello Again!</CustomText>
              <CustomText style={styles.txt3}>Sign in to your account and dive back into your personalized playlists and top tracks</CustomText>
            </View>
            <TextInputWithTitle
              iconName={'mail'}
              iconType={Ionicons}
              iconColor={Color.lightGrey}
              color={Color.lightGrey}
              titleText={'First Name'}
              secureText={false}
              placeholder={' aidenparker@gmail.com'}
              // setText={setFirstName}
              // value={firstName}
              border
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              marginTop={moderateScale(30, 0.3)}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              iconName={'locked'}
              iconType={Fontisto}
              iconColor={Color.lightGrey}
              color={Color.lightGrey}
              titleText={'First Name'}
              secureText={true}
              placeholder={' aidenparker@gmail.com'}
              // setText={setFirstName}
              // value={firstName}
              border
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(25, 0.3)}
            />
            <CustomText style={styles.txt4}>Forget Password?</CustomText>
            <CustomButton
              isGradient
              text={'Access Now'}
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              onPress={() => { setIsVisible(false) }}
              bgColor={'#00ADEF'}
              marginTop={moderateScale(20, 0.3)}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(12, 0.3)}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};


const styles = ScaledSheet.create({
  bottomImage: {
    width: windowWidth * 0.4,
  },

  textContainer: {
    marginTop: moderateScale(20, 0.3),
  },
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  text_view: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6)
  },

  Heading: {
    fontSize: moderateScale(24, 0.3),
    color: '#ffffff',
  },

  txt3: {
    fontSize: moderateScale(14, 0.6),
    alignSelf: 'center',
    color: Color.lightGrey,
    textAlign: 'center',
    marginTop: moderateScale(10, 0.6)
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(20, 0.6)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt4: {
    color: Color.veryLightGray,
    fontSize: moderateScale(12, 0.6),
    marginTop: moderateScale(8, 0.3),
    width: '100%',
    textAlign: 'right',
    marginTop: moderateScale(10, 0.6),
  },
  txt5: {
    color: Color.white,
    marginTop: moderateScale(10, 0.3),
    fontSize: moderateScale(15, 0.6),
  },
  dropDown: {
    backgroundColor: Color.red,
  },
});

export default LoginScreen;
