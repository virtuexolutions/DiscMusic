import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import AudioSlider from './AudioSlider';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import WeatherCard from './WeatherCard';
import axios from 'axios';
import { baseUrl } from '../Config';
import { playNext, playPlaylist } from './MusicPlayerController';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';

const TrendingView = ({ trackData, from }) => {
  // console.log('trackData', trackData)
  const [weather, setWeather] = useState(null);

  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;
  const play_list = [
    require('../Assets/Images/playlist_1.png'),
    require('../Assets/Images/playlist_2.png'),
    require('../Assets/Images/playlist_3.png'),
    require('../Assets/Images/playlist_4.png'),
  ];

  const handlePlayAll = async () => {
    // if (isPlayerReady) {
    await playPlaylist(trackData);
    // }
  };

  const getWeather = async (city = 'karachi') => {
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await response.json();
      const current = data.current_condition[0];
      // console.log(',,,,,,,,,,,,,,,,,,,,,,,, here i m ', data)
      setWeather({
        city: city,
        temperature_C: current.temp_C,
        temperature_F: current.temp_F,
        feels_like_C: current.FeelsLikeC,
        feels_like_F: current.FeelsLikeF,
        weather: current.weatherDesc[0].value,
        humidity: current.humidity,
        wind_speed_kmph: current.windspeedKmph,
        wind_direction: current.winddir16Point,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
      return null;
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.main_view_1}>
        <View style={styles.sub_view_1}>
          <FlatList
            data={trackData}
            horizontal
            scrollEnabled={false}
            renderItem={({ item }) => {
              // console.log('itemmmmmm', item);
              return (
                <View style={styles.inner_view}>
                  <CustomImage source={{ uri: `${baseUrl}/storage/${item?.cover_image} ` }} style={styles.image} />
                </View>
              );
            }}
          />
          <CustomText isBold style={styles.heading}>
            Trending
          </CustomText>
          <CustomText style={styles.text}>{trackData?.length} songs</CustomText>
          <AudioSlider width={windowWidth * 0.45} />
        </View>
        <View style={styles.sub_view_2}>
          <View style={styles.row_view}>
            <View style={styles.icon_View}>
              <Icon
                name="replay"
                as={MaterialIcons}
                size={moderateScale(25, 0.6)}
                color={Color.white}
              />
            </View>
            <TouchableOpacity onPress={() => {
              if (isPlaying) {
                TrackPlayer.pause();
              } else {
                handlePlayAll();
              }
            }} style={styles.icon_View}>
              <Icon
                name={isPlaying ? "pause" : "play-arrow"}
                as={MaterialIcons}
                size={moderateScale(25, 0.6)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.row_view, { marginTop: moderateScale(5, 0.6) }]}>
            <TouchableOpacity
              disabled={true}
              style={styles.icon_View}>
              <Icon
                name="step-backward"
                as={FontAwesome5}
                size={moderateScale(20, 0.6)}
                color={Color.grey}
              />
            </TouchableOpacity>
            <TouchableOpacity

              onPress={() => {
                playNext()
              }}
              style={styles.icon_View}>
              <Icon
                name="step-forward"
                as={FontAwesome5}
                size={moderateScale(20, 0.6)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.row_view,
          {
            paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(10, 0.6),
          },
        ]}>
        <View style={styles.image_view_1}>


          <CustomImage
            source={require('../Assets/Images/weather.png')}
            style={styles.image}
          />
        </View>
        {/* <WeatherCard temperature={weather?.temperature_C || 25} weatherType={weather?.weather || 'Loading...'} icon={require('../Assets/Images/weather.png')} /> */}
        <View style={styles.image_view_2}>
          <CustomImage
            source={require('../Assets/Images/trending.png')}
            style={styles.image}
          />
        </View>
      </View>
    </View>
  );
};

export default TrendingView;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.65,
    marginTop: moderateScale(5, .6)
  },
  main_view_1: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.4,
    backgroundColor: Color.black,
    borderRadius: moderateScale(10, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(6, 0.6),
  },
  sub_view_1: {
    width: windowWidth * 0.58,
    height: '95%',
    backgroundColor: Color.themeBlack,
    borderRadius: moderateScale(10, 0.6),
    // paddingLeft: moderateScale(6, .6),
    paddingHorizontal: moderateScale(6, 0.6),
    paddingVertical: moderateScale(6, 0.6),
  },
  sub_view_2: {
    width: windowWidth * 0.25,
    height: '95%',
    borderRadius: moderateScale(10, 0.6),
  },
  inner_view: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    borderRadius: moderateScale(8, 0.6),
    marginRight: moderateScale(3, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8, 0.6),
  },
  heading: {
    fontSize: moderateScale(13, 0.6),
    color: Color.white,
  },
  text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon_View: {
    width: windowWidth * 0.12,
    height: windowWidth * 0.17,
    backgroundColor: Color.themeBlack,
    borderRadius: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_view_1: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    // backgroundColor: "red",
    borderRadius: moderateScale(10, 0.6),
  },
  image_view_2: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.3,
    // backgroundColor: "red",
    borderRadius: moderateScale(10, 0.6),
  },
});
