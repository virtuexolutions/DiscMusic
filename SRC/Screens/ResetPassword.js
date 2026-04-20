import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const ResetPassword = props => {
  const phoneNumber = props?.route?.params?.phoneNumber;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const passWordReset = async () => {
    const body = {
      email: phoneNumber,
      password: password,
      confirm_password: confirmPassword,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} field is empty`);
      }
    }
    const url = 'password/reset';
    setIsLoading(true);

    const response = await Post(url, body, apiHeader());
    setIsLoading(false);

    if (response != undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Password Have been Reset', ToastAndroid.SHORT)
        : Alert.alert('Password Has been Reset');
      navigationService.navigate('LoginScreen');
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
                Reset password !
              </CustomText>
              <CustomText style={styles.txt3}>
                No worries, resetting your password is quick and easy.
              </CustomText>
            </View>

            <TextInputWithTitle
              iconName={'locked'}
              iconType={Fontisto}
              iconColor={Color.lightGrey}
              color={Color.white}
              titleText={'First Name'}
              secureText={true}
              placeholder={'........'}
              setText={setPassword}
              value={password}
              border
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(25, 0.3)}
            />
            <TextInputWithTitle
              iconName={'locked'}
              iconType={Fontisto}
              iconColor={Color.lightGrey}
              color={Color.white}
              titleText={'First Name'}
              secureText={true}
              placeholder={'........'}
              setText={setConfirmPassword}
              value={confirmPassword}
              border
              viewHeight={0.07}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              marginTop={moderateScale(10, 0.3)}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(25, 0.3)}
            />
            {/* <CustomText style={styles.txt4}>Forget Password?</CustomText> */}
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
                passWordReset();
              }}
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

export default ResetPassword;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  text_view: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
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
