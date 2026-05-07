import { ScrollView, View } from 'native-base';
import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import LinearGradient from 'react-native-linear-gradient';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { baseUrl } from '../Config';

const AboutArtist = ({ route }) => {
  const { artistData } = route?.params;
  console.log(JSON.stringify(artistData, null, 2), '------------------ >>>>artistData')
  const [countryCode, setCountryCode] = useState('ID'); // For flag
  const [callingCode, setCallingCode] = useState('62'); // For +62
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const socialData = [
    {
      id: 1,
      image: require('../Assets/Images/insta.png'),
    },
    {
      id: 2,
      image: require('../Assets/Images/twitter.png'),
    },
    {
      id: 3,
      image: require('../Assets/Images/facebook.png'),
    },
    {
      id: 4,
      image: require('../Assets/Images/link.png'),
    },
  ];

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
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingBottom: moderateScale(50, 0.6),
          }}
          style={{
            width: '100%',
            flexGrow: 0,
          }}>
          <CustomHeader
            leftIcon
            showBack
            //   RightIcon
            text={artistData?.name}
            subtext={''}
          />
          <ImageBackground
            source={require('../Assets/Images/texturebgc.png')}
            style={styles.container}
            imageStyle={styles.image}>
            <View style={styles.artist_image}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={artistData?.profile_image ? { uri: `${baseUrl}/storage/${artistData?.profile_image}` } : require('../Assets/Images/artist.png')}
              />
            </View>
            <View style={styles.text_con}>
              <CustomText isBold style={styles.title}>
                24,419,528
              </CustomText>
              <CustomText style={styles.sub_text}>monthly listeners</CustomText>
            </View>
            <LinearGradient
              style={styles.btn_Con}
              colors={['#333333', '#636363']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              <CustomText style={{
                fontSize: moderateScale(13, .6),
                color: Color.white
              }}>
                181st in the world
              </CustomText>
            </LinearGradient>
            <View style={styles.details}>
              <CustomText
                style={[
                  styles.sub_text,
                  {
                    // paddingRight: moderateScale(10,.6)
                  },
                ]}>{artistData?.bio ? artistData?.bio : 'No bio available'}</CustomText>
            </View>

            <View style={styles.image_con}>
              <CustomImage
                style={styles.image}
                source={artistData?.profile_image ? { uri: `${baseUrl}/storage/${artistData?.profile_image}` } : require('../Assets/Images/artist.png')}
              />
            </View>
            <CustomText style={styles.by}>post by</CustomText>
            <CustomText style={styles.by_value}>{artistData?.name}</CustomText>
            <View style={styles.row_sec}>
              {socialData?.map(item => {
                // console.log('l;sld;fa;sdfkljkasdjfklas' ,item)
                return (
                  <View style={styles.social_btn}>
                    <View
                      style={{
                        height: windowHeight * 0.02,
                        width: windowWidth * 0.04,
                      }}>
                      <CustomImage
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                        source={item?.image}
                      />
                    </View>
                  </View>
                );
              })}
            </View>
          </ImageBackground>
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
    width: windowWidth * 0.87,
    marginTop: moderateScale(10, 0.6),
    borderTopEndRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: '#282C30',
    shadowColor: '#353A40',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    overflow: 'hidden',
    borderWidth: 0.2,
    borderColor: Color.white,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  text_con: {
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.6),
  },
  artist_image: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.74,
    borderRadius: moderateScale(20, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(13, 0.6),
    overflow: 'hidden',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(19, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
  },
  details: {
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: '#222529',
    width: windowWidth * 0.87,
    marginTop: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderTopEndRadius: 35,
    borderBottomEndRadius: 35,
  },
  image_con: {
    height: windowHeight * 0.07,
    width: windowHeight * 0.07,
    borderRadius: (windowHeight * 0.07) / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.6),
  },
  social_btn: {
    height: windowHeight * 0.04,
    width: windowHeight * 0.04,
    borderRadius: (windowHeight * 0.04) / 2,
    borderWidth: 0.4,
    borderColor: Color.white,
    marginHorizontal: moderateScale(5, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  by: {
    color: '#7F8489',
    fontSize: moderateScale(12, 0.6),
    alignSelf: 'center',
    marginTop: moderateScale(8, 0.6),
  },
  by_value: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    alignSelf: 'center',
  },
  row_sec: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: moderateScale(20, 0.6),
  },
  btn_Con: {
    flexDirection: 'row',
    width: windowWidth * 0.35,
    height: windowHeight * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // elevation: 6,
    alignSelf: 'center',
    marginTop: moderateScale(10, .6)

  },
});

export default AboutArtist;
