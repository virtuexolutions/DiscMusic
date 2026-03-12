import { ScrollView, View } from 'native-base';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const ChangePassword = () => {
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPassword = async () => {
    const body = {};
    const url = '';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
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
                change password !
              </CustomText>
              <CustomText style={styles.txt3}>
                Modify your password to ensure uninterrupted and secure access.
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
              setText={setCurrentPassword}
              value={currentPassword}
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
                resetPassword();
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

export default ChangePassword;

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
