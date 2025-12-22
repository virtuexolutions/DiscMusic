import {Icon, ScrollView, View} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import {windowHeight, windowWidth} from '../Utillity/utils';
import AudioSlider from '../Components/AudioSlider';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../Components/Card';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const AboutArtist = () => {
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
        backgroundColor={Color.black}
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
            //   RightIcon
            text={'oliver tree'}
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
                source={require('../Assets/Images/artist.png')}
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
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}>
                    <CustomText style={{
                        fontSize : moderateScale(13,.6),
                        color :Color.white
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
                ]}>{`An internet based vocalist, producer, writer, director and performance artist, Oliver Tree explores the intersection where pop and alternative meet sonically and has arrived where art and entertainment collide visually. From comedy to action sports, mock reality TV drama to WWF wrestling in his live shows, the world of Oliver Tree is unlike any artist who has come before him. \n\nA Santa Cruz, California native, Tree has emerged as a polymath from many different projects and iterations over the last 10 years. As unpredictable as one artist can be, no one can seem to put their finger on what Oliver Tree will do next. Unafraid to make you laugh, cry, think profoundly or feel completely uncomfortable for the length of a 4 minute music video, he is on the road to developing his own blueprint for packaging and marketing pop culture in the internet era. Versatile in every sense of the word, Tree not only explores every type of entertainment but also every type of genre in his music alike. The box he puts himself in is limitless. It has no boundaries. Oliver Tree has built a multimedia project designed to challenge people's perspective of what art is, and he's not the slightest bit concerned what anyone has to say about it!`}</CustomText>
            </View>

            <View style={styles.image_con}>
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/artist1.png')}
              />
            </View>
            <CustomText style={styles.by}>post by</CustomText>
            <CustomText style={styles.by_value}>oliver tree</CustomText>
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
      borderRadius:25,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // elevation: 6,
    alignSelf :'center',
    marginTop : moderateScale(10,.6)

},
});

export default AboutArtist;
