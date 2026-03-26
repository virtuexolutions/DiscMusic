import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomImage from './CustomImage';
import TitleWithDescription from './TitleWithDescription';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ThemeIconButton from './ThemeIconButton';
import Slider from '@react-native-community/slider';
import Color from '../Assets/Utilities/Color';
import TrackPlayer, { State, useActiveTrack, usePlaybackState, useProgress } from 'react-native-track-player';
import navigationService from '../navigationService';
import AudioSlider from './AudioSlider';

const MinimisedPlayer = ({ style, data }) => {

  const track = useActiveTrack();
  const playbackState = usePlaybackState();
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const { position, duration } = useProgress();

  if (!track) return null;
  const isPlaying = playbackState.state === State.Playing;

  const safePosition = !isNaN(position) ? position : 0;
  const safeDuration = !isNaN(duration) && duration > 0 ? duration : 1;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  // console.log('track====================== >>>>>>> here from minimised player', track);
  // console.log('isPlaying====================== >>>>>>> here from minimised player', playbackState.state);


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
            source={require('../Assets/Images/bottom.png')}
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
            iconSource={isPlaying ? require('../Assets/Images/pause.png') : require('../Assets/Images/play-circle.png')}
            onPress={togglePlayback}
          />
          <ThemeIconButton
            style={styles.iconBtn}
            iconSize={scale(20)}
            iconColor={'#7F8489'}
            iconSource={require('../Assets/Images/heartVector.png')}
          />
          <ThemeIconButton
            iconSize={scale(20)}
            style={styles.iconBtn}
            iconSource={require('../Assets/Images/volume.png')}
          />
        </View>
      </View>
      <View>
        <AudioSlider width={'100%'} />
        {/* <Slider
          style={
            [{ width: '100%', height: 30 }]}
          minimumValue={0}
          // maximumValue={100}
          // value={50}
          maximumValue={safeDuration}
          value={isSliding ? sliderValue : safePosition}
          minimumTrackTintColor={Color.white}
          maximumTrackTintColor={Color.veryLightGray}         
          thumbTintColor={Color.white}
          onSlidingStart={() => setIsSliding(true)}
          onValueChange={(val) => setSliderValue(val)}
          onSlidingComplete={async (val) => {
            await TrackPlayer.seekTo(val);
            setIsSliding(false);
          }}
        /> */}
      </View>
    </View>
  );
};

export default MinimisedPlayer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: windowWidth * 0.2,
    // + moderateScale(15),
    width: windowWidth,
    // backgroundColor: 'green',
    backgroundColor: '#353A40',
    // gap: verticalScale(10),
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
    // backgroundColor: 'red'
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
  iconBtn: {
    elevation: 0,
    width: 'auto',
    height: 'auto',
    // paddingHorizontal: scale(10),
    backgroundColor: 'transparent',
  },
  slider: {
    // width:windowWidth *0.9,
    height: scale(10),
  },
  sliderContainer: {
    // paddingHorizontal: moderateScale(10),
    height: verticalScale(30),
  },
});
