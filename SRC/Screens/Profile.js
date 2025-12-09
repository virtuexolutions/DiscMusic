import {Icon, ScrollView, View} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {windowHeight, windowWidth} from '../Utillity/utils';

const Profile = () => {
  const [countryCode, setCountryCode] = useState('ID'); // For flag
  const [callingCode, setCallingCode] = useState('62'); // For +62
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isVisible, setIsVisible] = useState(false);

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
            <CustomHeader leftIcon RightIcon />
            <View style={styles.image_con}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={require('../Assets/Images/profile.png')}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Color.mediumGray,
                  height: windowHeight * 0.03,
                  width: windowHeight * 0.03,
                  borderRadius: (windowHeight * 0.03) / 2,
                  position: 'absolute',
                  bottom: 20,
                  right: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  as={AntDesign}
                  name="edit"
                  size={moderateScale(16, 0.6)}
                  color={Color.white}
                />
              </TouchableOpacity>
            </View>
            <TextInputWithTitle
              isBold={true}
              color={Color.white}
              title={'Name'}
              secureText={false}
              placeholder={' Aiden Parker'}
              setText={setFirstName}
              value={firstName}
              titleFontSize={moderateScale(14, 0.3)}
              border
              viewHeight={0.06}
              viewWidth={0.9}
              inputWidth={0.86}
              borderColor={'#ffffff'}
              placeholderColor={Color.lightGrey}
              borderRadius={moderateScale(15, 0.3)}
            />

            <View style={{marginTop: moderateScale(20, 0.3)}}>
              <CustomText isBold style={styles.label}>
                Phone Number
              </CustomText>

              <View style={styles.inputContainer}>
                {/* Country Picker Trigger */}
                <TouchableOpacity
                  style={styles.countryBox}
                  onPress={() => setVisible(true)}>
                  <CountryPicker
                    countryCode={countryCode}
                    withFlag
                    withCallingCode
                    withFilter
                    withAlphaFilter
                    onSelect={country => {
                      setCountryCode(country.cca2);
                      setCallingCode(country.callingCode[0]);
                    }}
                    visible={visible}
                    onClose={() => setVisible(false)}
                  />
                  <CustomText style={styles.codeText}>
                    +{callingCode}
                  </CustomText>
                </TouchableOpacity>

                {/* Phone Input */}
                <TextInput
                  style={styles.phoneInput}
                  placeholder="812345678912"
                  placeholderTextColor="#777"
                  keyboardType="number-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>
            <View style={styles.roW_con}>
              <View>
                <CustomText isBold style={styles.btn_text}>
                  Gender
                </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  style={[
                    styles.btn,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10, 0.3),
                    //   height: isVisible
                    //     ? windowHeight * 0.07
                    //     : windowHeight * 0.05,
                    },
                  ]}>
                  <View>
                    <CustomText
                      style={{
                        color: Color.white,
                        fontSize: moderateScale(14, 0.6),
                      }}>
                      Male
                    </CustomText>
                  </View>

                  <Icon
                    as={AntDesign}
                    name="down"
                    size={moderateScale(12, 0.6)}
                    color={Color.white}
                  />
                </TouchableOpacity>
                {/* <View
                  style={[
                    // styles.btn,
                    {
                      width: windowWidth * 0.42,
                      //   height: windowHeight * 0.05,
                      borderRadius: moderateScale(10, 0.3),
                      //   borderWidth: 1,
                      borderColor: Color.white,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: moderateScale(10, 0.3),
                      marginTop: moderateScale(-15, 0.6),
                    },
                  ]}>
                  {isVisible && (
                    <CustomText
                      style={{
                        color: Color.white,
                        fontSize: moderateScale(14, 0.6),
                      }}>
                      Female
                    </CustomText>
                  )}
                </View> */}
              </View>
              <View>
                <CustomText isBold style={styles.btn_text}>
                  Birthday
                </CustomText>
                <TextInputWithTitle
                  isBold={true}
                  color={Color.lightGrey}
                  //   title={'Name'}
                  secureText={false}
                  placeholder={'30/6/2007'}
                  setText={setBirthday}
                  value={birthday}
                  titleFontSize={moderateScale(14, 0.3)}
                  border
                  viewHeight={0.05}
                  viewWidth={0.45}
                  inputWidth={0.4}
                  borderColor={'#ffffff'}
                  placeholderColor={Color.lightGrey}
                  borderRadius={moderateScale(10, 0.3)}
                />
                {/* <TouchableOpacity
                  style={[
                    styles.btn,
                    {
                      // alignItems :'center',
                      paddingHorizontal: moderateScale(5, 0.3),
                      justifyContent: 'center',
                    },
                  ]}>
                  <CustomText
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(14, 0.6),
                    }}>
                    30/6/2007
                  </CustomText>
                </TouchableOpacity> */}
              </View>
            </View>

            <CustomButton
              isGradient
              text={'Set Up Profile'}
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              onPress={() => {
                // setIsVisible(false);
              }}
              bgColor={Color.lightGrey}
              marginTop={windowHeight * 0.1}
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
  bg_container: {
    width: windowWidth,
    height: windowHeight,
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
  image_con: {
    height: windowHeight * 0.22,
    width: windowHeight * 0.22,
    borderRadius: (windowHeight * 0.22) / 2,
    backgroundColor: Color.lightGrey,
    alignSelf: 'center',
    marginBottom: moderateScale(20, 0.3),
    marginTop: windowHeight * 0.06,
  },
  roW_con: {
    flexDirection: 'row',
    width: windowWidth * 0.9,
    justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.3),
  },
  btn: {
    width: windowWidth * 0.42,
    height: windowHeight * 0.05,
    borderRadius: moderateScale(10, 0.3),
    borderWidth: 1,
    borderColor: Color.white,
  },
  btn_text: {
    letterSpacing: 0.5,
    fontSize: moderateScale(14, 0.3),
    color: Color.white,
    marginBottom: moderateScale(5, 0.3),
  },
  container: {
    marginTop: moderateScale(20, 0.3),
  },
  label: {
    color: Color.white,
    marginBottom: moderateScale(8, 0.3),
    fontSize: moderateScale(14, 0.3),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    height: windowHeight * 0.06,
    backgroundColor: 'transparent',
    width: windowWidth * 0.9,
  },
  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeText: {
    color: 'white',
    fontSize: moderateScale(16, 0.6),
    marginLeft: moderateScale(4, 0.6),
  },
  phoneInput: {
    flex: 1,
    paddingLeft: moderateScale(12,.6),
    color: 'white',
    fontSize: moderateScale(16, 0.6),
  },
});

export default Profile;
