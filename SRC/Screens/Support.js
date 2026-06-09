import { useIsFocused } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import { validateEmail } from '../Config';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomHeader from '../Components/CustomHeader';
// import {useIsFocused} from '@react-navigation/core';

const Support = () => {
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);

  const isFocused = useIsFocused();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [supportData, setSupportData] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const GetSupportData = async () => {
    const url = 'auth/admin/info';
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setSupportData(response?.data?.data);
    }
  };

  useEffect(() => {
    // GetSupportData();
    // setFullName('');
    // setPhone('');
    // setEmail('');
    // setSubject('');
    // setMessage('');
  }, [isFocused]);

  const Support = async () => {
    const url = 'auth/support/submit';
    const body = {
      name: fullName,
      // phone: phone,
      email: email,
      subject: subject,
      description: message,
      job_id: selectedItem?.id,
    };

    for (let key in body) {
      if (body[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key}  is required`, ToastAndroid.SHORT)
          : alert(`${key}  is required`);
      }
    }

    if (isNaN(phone)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
        : Alert.alert('phone is not a number');
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }

    setSubmitLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setSubmitLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show('Sent Successfully', ToastAndroid.SHORT)
        : alert('Sent Successfully');
      navigationService.navigate('TabNavigation');
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
        style={styles.bg_container}>
        <CustomHeader text={" Support and Help"}

          leftIcon={true}
          showBack={true}
        />
        <ScrollView contentContainerStyle={{
          paddingBottom: moderateScale(65, 0.2)
        }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: windowHeight * 0.19,
                // paddingTop : moderateScale(20,0.3),π
                alignItems: 'center',
              }}
              style={{
                width: windowWidth,
              }}>

              <TouchableOpacity
                style={[
                  styles?.ContactInfoContainer,
                  { marginBottom: moderateScale(20, 0.3) },
                ]}
                activeOpacity={0.85}
                onPress={() => {
                  Linking.openURL(`mailto: ${supportData?.official_email}`);
                }}>
                <Entypo
                  name="mail"
                  color={Color.themeColor}
                  style={styles.icon1}
                  size={moderateScale(22, 0.6)}
                />
                <CustomText style={[styles.contactInfoText]} isRegular>
                  {loading
                    ? 'loading...'
                    : supportData?.official_email
                      ? supportData?.official_email
                      : 'not added yet'}
                </CustomText>
              </TouchableOpacity>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <TextInputWithTitle
                  color={Color.white}
                  titleText={'Your Name'}
                  secureText={false}
                  placeholder={'Your Name'}
                  setText={setFullName}
                  value={fullName}
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
                  color={Color.white}
                  titleText={'First Name'}
                  secureText={false}
                  placeholder={'Email'}
                  setText={setEmail}
                  value={email}
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
                  color={Color.white}
                  titleText={'Subject'}
                  secureText={false}
                  placeholder={'Subject'}
                  setText={setSubject}
                  value={subject}
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
                  color={Color.white}
                  titleText={'Enter Description'}
                  secureText={false}
                  placeholder={'Enter Description'}
                  setText={setMessage}
                  value={message}
                  border
                  viewHeight={0.2}
                  viewWidth={0.9}
                  inputWidth={0.75}
                  borderColor={'#ffffff'}
                  marginTop={moderateScale(10, 0.3)}
                  placeholderColor={Color.lightGrey}
                  borderRadius={moderateScale(25, 0.3)}

                  multiline={true}
                />



                {selectedItem != null && (
                  <View
                    style={{
                      // backgroundColor:'red',
                      width: windowWidth * 0.88,
                    }}>
                    <Icon
                      style={{
                        position: 'absolute',
                        right: 2,
                      }}
                      onPress={() => {
                        setSelectedItem(null);
                      }}
                      name="circle-with-cross"
                      as={Entypo}
                      size={17}
                      color={Color.lightGrey}
                    />
                  </View>
                )}
                <CustomButton
                  isGradient
                  text={
                    submitLoading ? (
                      <ActivityIndicator color={Color.white} size={'small'} />
                    ) : (
                      'make dispute'
                    )
                  }
                  textColor={Color.white}
                  width={windowWidth * 0.9}
                  height={windowHeight * 0.07}
                  onPress={() => {
                    Support();
                  }}
                  marginTop={moderateScale(20, 0.3)}
                  borderRadius={windowWidth / 2}
                  fontSize={moderateScale(16, 0.3)}
                />
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

export default Support;

const styles = ScaledSheet.create({
  icon1: {
    fontWeight: 'bold',
    marginLeft: 30,
    width: windowWidth * 0.09,
  },
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },

  contactInfoText: {
    fontSize: moderateScale(13, 0.3),
    color: Color.white,
  },

  ContactInfoContainer: {
    width: windowWidth,
    paddingTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },

});
