import {ScrollView, View} from 'native-base';
import React, {useState} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Circle} from 'react-native-svg';
import {Custom} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import OtherLocation from '../Components/OtherLocation';
import MinimisedPlayer from '../Components/MinimisedPlayer';

const EventScreen = () => {
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

  const events = [
    {
      date: `Jun \n9`,
      name: 'Governors Ball Music Festival',
      details: 'Fri, 8 PM | Flushing Meadows Park, Queens',
    },
    {
      date: `Jun \n20`,
      name: 'Oliver Tree, Tai Verdes, Upsahl',
      details: 'Tue, 7 PM | Red Rocks Amphitheatre, Morrison',
    },
    {
      date: `Aug \n5`,
      name: 'HARD Summer Music Festival',
      details: 'Sat, 8 PM | Los Angeles Memorial Coliseum, Los Angeles',
    },
    {
      date: `Aug \n25`,
      name: 'Wonderbus Music & Arts Festival 2023',
      details: 'Fri, 8 PM | The Lawn At CAS, Columbus',
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
            paddingBottom: moderateScale(80, 0.6),
          }}
          style={styles.container}>
          <CustomHeader leftIcon 
          showBack={true}
          text={'Oliver tree'} subtext={''} />

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.74,
            }}>
            <View style={styles.text_con}>
              <CustomText isBold style={styles.title}>
                near chennai
              </CustomText>
              <CustomText style={styles.sub_text}>
                this artist has no upcomin concerts near chennai
              </CustomText>
            </View>
            <TouchableOpacity onPress={() => {}} style={styles.btn_Con}>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.white,
                }}>
                change location
              </CustomText>
            </TouchableOpacity>
          </View>

          <CustomText
            isBold
            style={[
              styles.title,
              {
                marginBottom: moderateScale(10, 0.6),
                marginTop: moderateScale(20, 0.6),
              },
            ]}>
            other location
          </CustomText>

          {events?.map((item, index) => {
            return <OtherLocation item={item} />;
          })}
        </ScrollView>
        <MinimisedPlayer/>
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
    paddingHorizontal: moderateScale(10, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },

  text_con: {
    alignSelf: 'center',
    marginTop: moderateScale(20, 0.6),
  },

  title: {
    color: Color.white,
    fontSize: moderateScale(19, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
    padding: moderateScale(2, 0.6),
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

  card: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(10, 0.6),
    borderBottomWidth: 0.5,
    marginVertical: moderateScale(5, 0.6),
    borderBottomColor: Color.darkGray,
  },
  Circle: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: (windowWidth * 0.15) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    marginRight: moderateScale(10, 0.6),
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
  },

  btn_Con: {
    flexDirection: 'row',
    width: windowWidth * 0.28,
    marginLeft: moderateScale(5, 0.6),
    height: windowHeight * 0.05,
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
    elevation: 16,
    alignSelf: 'center',
    backgroundColor: '#1C1F22',
    marginTop: moderateScale(20, 0.6),
  },
});

export default EventScreen;
