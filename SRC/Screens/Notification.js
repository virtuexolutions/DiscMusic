import {Icon, ScrollView, View} from 'native-base';
import React, {useRef} from 'react';
import {FlatList, ImageBackground, TouchableOpacity} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Custom} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import navigationService from '../navigationService';
import NotificationCard from '../Components/NotificationCard';

const Notification = () => {
  const rbRef = useRef(null);
  const musicList = [
    {
      id: '1',
      title: 'Downfall',
      artist: 'Gio Woods',
      time: '1 day ago',
      image: require('../Assets/Images/notifi1.png'),
    },
    {
      id: '2',
      title: 'Ok',
      artist: 'Jeremy Zucker',
      time: '4 day ago',
      image: require('../Assets/Images/notifi2.png'),
    },

    {
      id: '7',
      title: 'Destiny',
      artist: 'Hoji',
      time: 'May 5',
      image: require('../Assets/Images/notifi3.png'),
    },
    {
      id: '8',
      title: 'Flight Risk',
      artist: 'Clxoe',
      time: 'May 5',
      image: require('../Assets/Images/notifi8.png'),
    },
  ];
  const data = [
    {
      id: '3',
      title: 'miss you',
      artist: 'e song | oliver tree',
      time: '4 day ago',
      image: require('../Assets/Images/recent1.png'),
    },
    {
      id: '4',
      title: 'don’t remind me i’m minding m...',
      artist: 'playlist | playlistm7',
      time: '5 day ago',
      image: require('../Assets/Images/artist1.png'),
    },
    {
      id: '5',
      title: 'mega hit mix',
      artist: 'playlist | spotify',
      time: '5 day ago',
      image: require('../Assets/Images/recent2.png'),
    },
    {
      id: '6',
      title: 'one kiss (with dua lia)',
      artist: 'song | calvin harris',
      time: '6 day ago',
      image: require('../Assets/Images/recent3.png'),
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
          <CustomHeader leftIcon  
          showBack={true}
          text={'notifications'} subtext={''} />
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
          }}
          style={styles.container}>

          <CustomText isBold style={[styles.title]}>
            what’s new
          </CustomText>
          <CustomText style={styles.sub_text}>
            {`the latest releases from artists, podcasts, and shows you \nfollow.`}
          </CustomText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: moderateScale(20, 0.6),
            }}>
            <TouchableOpacity style={styles.btn_Con}>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.white,
                }}>
                music
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn_Con}>
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.white,
                }}>
                podcasts & shows
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText
            isBold
            style={[styles.title, {marginTop: moderateScale(20, 0.6)}]}>
            new
          </CustomText>

          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: moderateScale(10, 0.6)}}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={musicList}
            renderItem={({item, index}) => {
              return (
                <NotificationCard item={item}/>
                
              );
            }}
          />
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

  title: {
    color: Color.white,
    fontSize: moderateScale(20, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(14, 0.6),
    padding: moderateScale(2, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },

  card_con: {
    flexDirection: 'row',
    backgroundColor: '#282C30',
    paddingVertical: moderateScale(13, 0.6),
    width: windowWidth * 0.93,
    marginTop: moderateScale(15, 0.6),
    borderRadius: 30,
    paddingHorizontal: moderateScale(10, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  card_image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.3,
    borderRadius: moderateScale(25, 0.6),
    overflow: 'hidden',
    marginRight: moderateScale(10, 0.6),
  },

  btn_Con: {
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    backgroundColor: '#1C1F22',
    marginRight: moderateScale(10, 0.6),
  },
  play_circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -18}],
    height: windowHeight * 0.037,
    width: windowHeight * 0.042,
    shadowColor: '#000000ff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});

export default Notification;
