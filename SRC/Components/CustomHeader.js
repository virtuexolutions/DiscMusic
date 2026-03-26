import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, scale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import navigationService from '../navigationService';
import { useNavigation } from '@react-navigation/native';
import { setUserLogOut } from '../Store/slices/common';
import { useDispatch } from 'react-redux';
import { setUserLogoutAuth } from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import ThemeIconButton from './ThemeIconButton';
import BackButton from './BackButton';

const CustomHeader = ({ leftIcon, RightIcon,
  camera,
  user,
  showBack,
  search,
  dots,
  add,
  notifications,
  premium,
  rightIconComponent,
  titlStyle,
  text, style, text1, subtext }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  return (
    <View style={[styles.header, style && style]}>
      {leftIcon &&

        (
          showBack ?
            <BackButton /> :
            user ?
              <ThemeIconButton
                onPress={() => {
                  // navigation.goBack();
                }}
                isGradient={true}
                gradientColors={Color.themeBgColor}
                iconSource={require("../Assets/Images/user-icon.png")}
              />
              : premium ? <ThemeIconButton
                onPress={() => {
                  // navigation.goBack();
                }}
                style={styles.premium}
                iconColor={Color.black}
                iconSource={require("../Assets/Images/shapes.png")}
              />
                : null
        )}
      <CustomText style={[styles.title, titlStyle]}>{text}</CustomText>
      {subtext && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: moderateScale(40, 0.6),
          }}>
          <CustomText style={styles.text1}>{text1}</CustomText>
          <CustomText style={styles.sub_text}>{subtext}</CustomText>
        </View>
      )}

      {RightIcon ?
        <View style={{ flexDirection: "row", gap: scale(10) }}>
          {camera && (<ThemeIconButton
            iconSource={require("../Assets/Images/camera.png")}
            iconSize={scale(14)}
            onPress={() => {
              navigation.navigate("MusicCodeScreen")
              console.log("first")
            }}
          />)}
          {search && <ThemeIconButton
            iconSource={require("../Assets/Images/search.png")}
            iconSize={scale(14)}
          />}
          {add && <ThemeIconButton
            iconName={"plus"}
            iconType={Feather}
            iconSize={scale(14)}
          />}
          {notifications && <ThemeIconButton
            iconName={"bell-alt"}
            iconType={Fontisto}
            onPress={() => {
              navigation.navigate("Notification")
            }}
            iconSize={scale(14)}
          />}
          {dots && <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
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
                navigationService.navigate("Settings")
                // dispatch(setUserLogOut());
                // dispatch(setUserLogoutAuth());
              }}
            />
          </LinearGradient>

          }
          {rightIconComponent && rightIconComponent}
        </View>

        : (
          <View
            style={{
              width: windowWidth * 0.12,
              height: windowWidth * 0.12,
              borderRadius: windowWidth / 2,
              justifyContent: 'ceneter',
              alignItems: 'center',
            }}></View>
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
    // backgroundColor :'red',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(15, 0.6),
    // alignSelf: 'center',
    // textAlign: 'center',
    // backgroundColor: 'red',
    // width: '100%',
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
  premium: {
    backgroundColor: Color.white,
    width: scale(30),
    height: scale(30)
  }
});
