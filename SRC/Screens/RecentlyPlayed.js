import { Icon, ScrollView, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Custom } from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import RecentCard from '../Components/RecentCard';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const RecentlyPlayed = () => {
  const token = useSelector(state => state?.authReducer?.token)

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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
  ];


  const recentlyPlayed = async () => {
    const url = 'auth/recently-played'
    setIsLoading(true)
    const response = await Get(url, token)
    // return console.log("🚀 ~ recentlyPlayed ~ response:", JSON.stringify(response?.data?.data, null, 2))
    setIsLoading(false)

    if (response != undefined) {
      setRecentlyPlayedSongs(response?.data?.data)
    }
  };


  useEffect(() => {
    recentlyPlayed()
  }, [])

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
            data={recentlyPlayedSongs?.recently_played}
            renderItem={({ item, index }) => {
              return <RecentCard item={item} />;
              <View>
                <CustomText>{item?.title}</CustomText>
                <CustomText>{item?.artist}</CustomText>
                <CustomText>{item?.time}</CustomText>
                <CustomText>{item?.image}</CustomText>
              </View>
            }}
          />
          {/* <CustomText
            isBold
            style={[styles.title, { marginTop: moderateScale(20, 0.6) }]}>
            sun,may 14,2003
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: moderateScale(10, 0.6) }}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data}
            renderItem={({ item, index }) => {
              return <RecentCard item={item} />;
            }}
          />
          <CustomText
            isBold
            style={[styles.title, { marginTop: moderateScale(20, 0.6) }]}>
            see all 7 played
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: moderateScale(10, 0.6) }}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data2}
            renderItem={({ item, index }) => {
              return <RecentCard item={item} />;
            }}
          />
          <CustomText
            isBold
            style={[styles.title, { marginTop: moderateScale(20, 0.6) }]}>
            see all 8 played
          </CustomText>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: moderateScale(10, 0.6) }}
            contentContainerStyle={{
              paddingBottom: moderateScale(30, 0.6),
            }}
            data={data3}
            renderItem={({ item, index }) => {
              return <RecentCard item={item} />;
            }}
          /> */}
        </ScrollView>
        <MinimisedPlayer />
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
