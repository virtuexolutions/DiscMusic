import { ScrollView, View } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';



const EnterEmail = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(false);


  const EnterOTP = async () => {
    const body = {
      email: email,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} field is empty`);
      }
    }
    const url = 'password/email';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    // console.log('🚀 ~ EnterOTP ~ response:', response?.data?.data);

    if (response != undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Your OTP is Send', ToastAndroid.SHORT)
        : Alert.alert('OTP is Send');
      navigationService.navigate('VerifyNumber', { email: email }),
        setEmail('');
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}
        imageStyle={styles.image}>
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
            <CustomHeader showBack={true} leftIcon />
            <View style={styles.text_view}>
              <CustomText isBold style={styles.Heading}>
                reset password !
              </CustomText>
              <CustomText style={styles.txt3}>
                Set a new password and get back to your account in just a few
                steps.
              </CustomText>
            </View>
            <TextInputWithTitle
              //   iconName={'locked'}
              //   iconType={Fontisto}
              //   iconColor={Color.lightGrey}
              color={Color.white}
              titleText={'First Name'}
              //   secureText={true}
              placeholder={'aidenparker@gmail.com'}
              setText={setEmail}
              value={email}
              border
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              marginTop={moderateScale(30, 0.3)}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(25, 0.3)}
            />

            <CustomButton
              isGradient
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={Color.white} />
                ) : (
                  'submit '
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              onPress={() => {
                EnterOTP();
                //
              }}
              // onPress={() => navigationService.navigate('Profile')}
              marginTop={moderateScale(20, 0.3)}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(16, 0.3)}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default EnterEmail;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  text_view: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
    marginTop: moderateScale(50, 0.6),
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
    marginTop: moderateScale(10, 0.6),
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    // justifyContent :'center',
    paddingHorizontal: moderateScale(20, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },

  txt4: {
    color: Color.veryLightGray,
    fontSize: moderateScale(12, 0.6),
    marginTop: moderateScale(8, 0.3),
    width: '100%',
    textAlign: 'right',
    marginTop: moderateScale(10, 0.6),
  },
});
