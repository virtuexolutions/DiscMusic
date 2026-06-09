import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import TrackPlayer, { State, useActiveTrack, usePlaybackState, useProgress } from 'react-native-track-player';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { baseUrl } from '../Config';
import navigationService from '../navigationService';
import { windowWidth } from '../Utillity/utils';
import AudioSlider from './AudioSlider';
import CustomImage from './CustomImage';
import LikeButton from './LikeButton';
import ThemeIconButton from './ThemeIconButton';
import TitleWithDescription from './TitleWithDescription';


const MinimisedPlayer = ({ style, data }) => {

  const activeSong = useSelector(state => state.commonReducer.activeSong)
  // console.log("activeSong", activeSong);


  const track = useActiveTrack();
  const playbackState = usePlaybackState();



  if (!track) return null;
  const isPlaying = playbackState.state === State.Playing;





  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };


  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <CustomImage
            onPress={() => {
              navigationService.navigate('MusicPlayerScreen')
            }}
            source={activeSong?.cover_image ? { uri: baseUrl + '/storage/' + activeSong?.cover_image } : require('../Assets/Images/bottom.png')}
            style={styles.image}
          />
        </View>
        <TitleWithDescription
          style={styles.textContainer}
          titleStyle={styles.text1}
          descriptionStyle={styles.text2}
          title={track?.title}
          description={track?.artist}
          onPress={() => {
            navigationService.navigate('MusicPlayerScreen')
          }}
        />
        <View style={styles.actions}>
          <ThemeIconButton
            style={styles.iconBtn}
            iconType={isPlaying ? Ionicons : Entypo}
            iconName={isPlaying ? 'pause' : 'controller-play'}
            onPress={togglePlayback}
          />

          <LikeButton track={track} style={styles.iconButton2} />
          <ThemeIconButton
            iconSize={scale(20)}
            style={styles.iconBtn}
            iconType={Feather}
            iconName='volume-1'
          />
        </View>
      </View>
      <View>
        <AudioSlider width={'100%'} />

      </View>
    </View>
  );
};

export default MinimisedPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: windowWidth * 0.2,
    width: windowWidth,
    backgroundColor: '#353A40',
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(10),
    borderTopLeftRadius: moderateScale(30, 0.2),
    borderTopRightRadius: moderateScale(30, 0.3),
    zIndex: 1,
    paddingBottom: verticalScale(5),

    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 16,
  },
  innerContainer: {
    gap: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: scale(30),
    height: scale(30),
    overflow: 'hidden',
    borderRadius: moderateScale(15),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    left: scale(5),
    flexDirection: 'row',
    gap: scale(15),
  },
  textContainer: {
    width: '55%',
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  text1: {
    fontSize: moderateScale(12, 0.2),
  },
  text2: {
    fontSize: moderateScale(10, 0.2),
  },
  iconButton2: {
    backgroundColor: "transparent",
    width: "auto",
    height: "auto",
    elevation: 0,
  },
  iconBtn: {
    elevation: 0,
    width: 'auto',
    height: 'auto', backgroundColor: 'transparent',
  },
  slider: {
    height: scale(10),
  },
  sliderContainer: {
    height: verticalScale(30),
  },
});
