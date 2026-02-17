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
import RecentCard from '../Components/RecentCard';
import MinimisedPlayer from '../Components/MinimisedPlayer';

const RecentlyPlayed = () => {
  const rbRef = useRef(null);
  const musicList = [
    {
      id: '1',
      title: 'six60',
      artist: 'artist',
      time: '1 day ago',
      image: require('../Assets/Images/recent1.png'),
    },
    {
      id: '2',
      title: 'someone to be around - bo...',
      artist: 'Jeremy Zucker',
      time: '4 day ago',
      image: require('../Assets/Images/bottom.png'),
    },
    // {
    //   id: '3',
    //   title: 'I Ain’t Worried (Versions)',
    //   artist: 'OneRepublic',
    //   time: '4 day ago',
    //   image: require('../Assets/Images/notifi3.png'),
    // },
    // {
    //   id: '4',
    //   title: "When You're Feeling Blue",
    //   artist: 'Dylan Dunlap',
    //   time: '5 day ago',
    //   image: require('../Assets/Images/notifi4.png'),
    // },
    // {
    //   id: '5',
    //   title: 'Crush',
    //   artist: 'Lauren Sanderson',
    //   time: '5 day ago',
    //   image: require('../Assets/Images/notifi5.png'),
    // },
    // {
    //   id: '6',
    //   title: 'Naomi',
    //   artist: 'Marc Scibilia',
    //   time: '6 day ago',
    //   image: require('../Assets/Images/notifi6.png'),
    // },
    // {
    //   id: '7',
    //   title: 'Destiny',
    //   artist: 'Hoji',
    //   time: 'May 5',
    //   image: require('../Assets/Images/notifi3.png'),
    // },
    // {
    //   id: '8',
    //   title: 'Flight Risk',
    //   artist: 'Clxoe',
    //   time: 'May 5',
    //   image: require('../Assets/Images/notifi8.png'),
    // },
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
  const data2 = [
    {
      id: '1',
      title: 'heather',
      artist: 'song | conan gray',
      time: '1 day ago',
      image: require('../Assets/Images/recent4.png'),
    },
    {
      id: '2',
      title: 'miss you',
      artist: 'e song | oliver tree',
      time: '4 day ago',
      image: require('../Assets/Images/recent1.png'),
    },
  ];

  const data3 = [
    {
      id: '1',
      title: 'someone to be around - bo...',
      artist: 'song | six60',
      time: '1 day ago',
      image: require('../Assets/Images/bottom.png'),
    },
    {
      id: '2',
      title: 'don’t remind me i’m minding m...',
      artist: 'playlist | playlistm7',
      time: '4 day ago',
      image: require('../Assets/Images/artist1.png'),
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
          showBack
          text={'Recently Played'} subtext={''} />
          <CustomText isBold style={[styles.title]}>
            yesterday
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              // backgroundColor :'red',
              paddingBottom: moderateScale(10, 0.6),
            }}
            data={musicList}
            renderItem={({item, index}) => {
              return <RecentCard item={item} />;
            }}
          />
          <CustomText
            isBold
            style={[styles.title, {marginTop: moderateScale(20, 0.6)}]}>
            sun,may 14,2003
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: moderateScale(10, 0.6)}}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data}
            renderItem={({item, index}) => {
              return <RecentCard item={item} />;
            }}
          />
          <CustomText
            isBold
            style={[styles.title, {marginTop: moderateScale(20, 0.6)}]}>
            see all 7 played
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: moderateScale(10, 0.6)}}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data2}
            renderItem={({item, index}) => {
              return <RecentCard item={item} />;
            }}
          />
          <CustomText
            isBold
            style={[styles.title, {marginTop: moderateScale(20, 0.6)}]}>
            see all 8 played
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{marginTop: moderateScale(10, 0.6)}}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data3}
            renderItem={({item, index}) => {
              return <RecentCard item={item} />;
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
});

export default RecentlyPlayed;
