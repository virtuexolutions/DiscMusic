import { Icon, ScrollView, View } from 'native-base';
import React, { useState } from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Checkbox from '../Components/CustomCheckbox';
import navigationService from '../navigationService';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setUserToken } from '../Store/slices/auth';
import { setFavArtist, setProfileCreated, setUserData } from '../Store/slices/common';
import { validateEmail } from '../Config';
import { useDispatch } from 'react-redux';

const SignupScreen = () => {
  const dispatch = useDispatch();

  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);




  // const getCurrentLocation = async () => {
  //   try {
  //     const position = await new Promise((resolve, reject) => {
  //       Geolocation.getCurrentPosition(
  //         position => {
  //           const coords = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           };
  //           resolve(coords);
  //           // cg
  //           // console.log('first from current location ================== >>>>', position)
  //           getAddressFromCoordinates(
  //             position.coords.latitude,
  //             position.coords.longitude,
  //           );
  //         },
  //         error => {
  //           reject(new Error(error.message));
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 15000,
  //           maximumAge: 10000,
  //         },
  //       );
  //     });
  //     setCurrentPosition(position);
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //     throw error;
  //   }
  // };


  const signup = async () => {
    const body = {
      role: 'user',
      email: email,
      password: password,
      confirm_password: password,
      // lat : 
      // lng:
    };
    const url = 'register';
    if (email == '') {
      Platform.OS == 'android'
        ? ToastAndroid.show('email is required', ToastAndroid.SHORT)
        : Alert.alert('email is required');
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
          'Password should atleast 8 character long',
          ToastAndroid.SHORT,
        )
        : Alert.alert('Password should atleast 8 character long');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setProfileCreated(response?.data?.user_info?.isProfileCreated));
      dispatch(setFavArtist(response?.data?.user_info?.liked_artist));

      // navigationService.navigate('Profile');
    }
  };



  // useEffect(() => {
  //   getCurrentLocation()
  // }, [])
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
            <CustomHeader showBack={true} dots={true} leftIcon RightIcon />
            <View style={styles.text_view}>
              <CustomText isBold style={styles.Heading}>
                Join The D.I.S.
              </CustomText>
              <CustomText style={styles.txt3}>
                Sign up and discover new songs, personalized playlists, and
                exclusive content
              </CustomText>
            </View>
            <TextInputWithTitle
              iconName={'mail'}
              iconType={Ionicons}
              iconColor={Color.lightGrey}
              color={Color.lightGrey}
              titleText={'First Name'}
              secureText={false}
              placeholder={' aidenparker@gmail.com'}
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
            <TextInputWithTitle
              iconName={'locked'}
              iconType={Fontisto}
              iconColor={Color.lightGrey}
              color={Color.lightGrey}
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
            <View
              style={[
                styles.row_view,
                {
                  marginTop: moderateScale(12, 0.6),
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  marginLeft: moderateScale(10, 0.6),
                },
              ]}>
              <Checkbox checked={agree} onChange={setAgree} size={20} />
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  marginLeft: moderateScale(7, 0.6),
                  color: Color.lightGrey,
                }}>
                Join Now
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(12, 0.6),
                  marginLeft: moderateScale(8, 0.6),
                  color: Color.veryLightGray,
                }}>
                Terms & conditions
              </CustomText>
            </View>
            <CustomButton
              isGradient
              text={
                isLoading ? (
                  <ActivityIndicator size={'small'} color={Color.white} />
                ) : (
                  'Join Now'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              // onPress={() => navigationService.navigate('TabNavigation')}
              onPress={() => {
                signup();
              }}
              marginTop={moderateScale(20, 0.3)}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(16, 0.3)}
            />
            <View style={[styles.row_view, { marginTop: windowWidth * 0.12 }]}>
              <View style={styles.line} />
              <CustomText style={styles.text_1}>Or Sign in with</CustomText>
              <View style={styles.line} />
            </View>
            <View
              style={[
                styles.row_view,
                {
                  marginTop: moderateScale(20, 0.6),
                  justifyContent: 'space-between',
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.row_view,
                  {
                    width: '45%',
                    borderWidth: 1,
                    borderColor: Color.white,
                    height: windowWidth * 0.12,
                    borderRadius: moderateScale(10, 0.6),
                    justifyContent: 'center',
                  },
                ]}>
                <Icon
                  name="google"
                  as={AntDesign}
                  size={moderateScale(18, 0.6)}
                  color={Color.white}
                />
                <CustomText isBold style={styles.btn_txt}>
                  Google
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.row_view,
                  {
                    width: '45%',
                    borderWidth: 1,
                    borderColor: Color.white,
                    height: windowWidth * 0.12,
                    borderRadius: moderateScale(10, 0.6),
                    justifyContent: 'center',
                  },
                ]}>
                <Icon
                  name="facebook-f"
                  as={FontAwesome}
                  size={moderateScale(18, 0.6)}
                  color={Color.white}
                />
                <CustomText isBold style={styles.btn_txt}>
                  facebook
                </CustomText>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row_view,
                {
                  marginTop: windowWidth * 0.12,
                  justifyContent: 'center',
                  width: windowWidth * 0.9,
                  alignSelf: 'center',
                },
              ]}>
              <CustomText
                style={[styles.text_1, { textAlign: 'right', width: '80%' }]}>
                Already Have an account?
              </CustomText>
              <CustomText
                onPress={() => {
                  navigationService.navigate('LoginScreen');
                }}
                style={[
                  styles.text_1,
                  { color: Color.veryLightGray, textAlign: 'left' },
                ]}>
                {' '}
                Sign In
              </CustomText>
            </View>
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
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.6),
    width: windowWidth * 0.9,
  },
  line: {
    width: windowWidth * 0.25,
    height: moderateScale(2, 0.6),
    backgroundColor: Color.veryLightGray,
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
  text_1: {
    width: '40%',
    marginTop: 0,
    textAlign: 'center',
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    fontWeight: '700',
  },
  btn_txt: {
    fontSize: moderateScale(14, 0.6),
    color: Color.white,
    marginLeft: moderateScale(6, 0.6),
  },
});

export default SignupScreen;
