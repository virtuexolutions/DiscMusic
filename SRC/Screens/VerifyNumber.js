import { ScrollView, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const VerifyNumber = props => {
  const phoneNumber = props?.route?.params?.email;
  // console.log('🚀 ~ VerifyNumber ~ phoneNumber:', phoneNumber);

  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async () => {
    const url = 'password/email';
    setLoading(true);
    const response = await Post(url, { email: phoneNumber }, apiHeader());
    setLoading(false);
    // console.log('🚀 ~ sendOTP ~ response:', response?.data);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phoneNumber}`, ToastAndroid.SHORT)
        : Alert.alert(`OTP sent to ${phoneNumber}`);
    }
  };

  const VerifyOTP = async () => {
    // if (code == '') {
    //   Platform.OS == 'android'
    //   ? ToastAndroid.show('please enter your code ', ToastAndroid.SHORT)
    //   : Alert.alert('please enter your code ');
    // }

    const url = 'password/code/check';
    setIsLoading(true);
    const response = await Post(
      url,
      { email: phoneNumber, code: code },
      apiHeader(),
    );
    // console.log('----------------------- >>>>>>>>>>>> ', response?.data);
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : Alert.alert(`otp verified`);

      navigationService.navigate('ResetPassword', { phoneNumber: phoneNumber });
    }
  };

  useEffect(() => {
    label();
  }, [time]);

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
                Verify Account !
              </CustomText>
              <CustomText style={styles.txt3}>
                Enter four digit code we have sent to{' '}
                {
                  <CustomText style={{ color: Color.white }}>
                    {phoneNumber}
                  </CustomText>
                }
              </CustomText>
            </View>

            <CodeField
              placeholder={'0'}
              ref={ref}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <CustomText
                    style={[
                      styles.cellText,
                      isFocused && { color: Color.white },
                    ]}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </CustomText>
                </View>
              )}
            />
            <CustomText style={styles.txt3}>
              Haven't Recieved Verification Code ?{' '}
              {
                <TouchableOpacity
                  disabled={timerLabel == 'Resend Code ' ? false : true}
                  onPress={() => {
                    sendOTP(), settimerLabel('ReSend in '), settime(120);
                  }}>
                  <CustomText style={[styles.txt4]}>
                    {timerLabel} {time}
                  </CustomText>
                </TouchableOpacity>
              }
            </CustomText>

            <CustomButton
              disabled={code == '' ? true : false}
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
                VerifyOTP();
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

export default VerifyNumber;

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
    // alignSelf: 'center',
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
  txt2: {
    color: Color.themeColor,
    fontSize: moderateScale(25, 0.6),
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    // width: '70%',
    marginTop: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    borderBottomWidth: 1,
    marginTop: moderateScale(5, 0.6),
    // paddingBottom: moderateScale(5, 0.6),
    borderColor: Color.white,
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(50, 0.3),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
  },
  focusCell: {
    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.white,
    fontSize: moderateScale(30, 0.3),
    textAlign: 'center',
  },

  //   container: {
  //     paddingTop: windowHeight * 0.2,
  //     height: windowHeight * 0.9,
  //     width: windowWidth,
  //     alignItems: 'center',
  //   },

  text: {
    textTransform: 'uppercase',
    color: Color.white,
    fontSize: moderateScale(16, 0.3),
  },
});
