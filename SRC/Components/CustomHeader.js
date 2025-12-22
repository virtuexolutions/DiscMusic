import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import navigationService from '../navigationService';
import {useNavigation} from '@react-navigation/native';
import {setUserLogOut} from '../Store/slices/common';
import {useDispatch} from 'react-redux';
import {setUserLogoutAuth} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = ({leftIcon, RightIcon, text, style, text1, subtext}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, style && style]}>
      {leftIcon && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={Color.themeBgColor}
          style={{
            width: windowWidth * 0.12,
            height: windowWidth * 0.12,
            borderRadius: windowWidth / 2,
            justifyContent: 'ceneter',
            alignItems: 'center',
          }}>
          <Icon
            name="arrow-left"
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.white}
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              top: moderateScale(10, 0.3),
              alignSelf: 'center',
            }}
          />
        </LinearGradient>
      )}
      <CustomText style={styles.title}>{text}</CustomText>
      {subtext && (
        <View
          style={{
            alignSelf: 'center',
            marginTop: moderateScale(15, 0.3),
          }}>
          <CustomText style={styles.text1}>{text1}</CustomText>
          <CustomText style={styles.sub_text}>{subtext}</CustomText>
        </View>
      )}

      {RightIcon && (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={Color.themeBgColor}
          style={{
            width: windowWidth * 0.12,
            height: windowWidth * 0.12,
            borderRadius: windowWidth / 2,
            justifyContent: 'ceneter',
            alignItems: 'center',
          }}>
          <Icon
            name="dots-three-vertical"
            as={Entypo}
            size={moderateScale(20, 0.3)}
            color={Color.white}
            style={{
              position: 'absolute',
              top: moderateScale(12, 0.3),
            }}
            onPress={() => {
              dispatch(setUserLogOut());
              dispatch(setUserLogoutAuth());
            }}
          />
        </LinearGradient>
      )}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.07,
    alignSelf: 'center',
    marginTop: windowWidth * 0.1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
    alignSelf: 'center',
    textAlign : 'center',
    width : windowWidth *0.7,
    fontWeight: 'bold',
  },
  sub_text: {
    color: Color.white,
    fontSize: moderateScale(12, 0.6),
    alignSelf: 'center',
  },
  text1: {
    color: Color.mediumGray,
    fontSize: moderateScale(10, 0.6),
  },
});
