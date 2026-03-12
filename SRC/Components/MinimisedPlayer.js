import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomImage from './CustomImage';
import TitleWithDescription from './TitleWithDescription';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ThemeIconButton from './ThemeIconButton';
import Slider from '@react-native-community/slider';
import Color from '../Assets/Utilities/Color';
import { State, useActiveTrack, usePlaybackState } from 'react-native-track-player';

const MinimisedPlayer = ({ style }) => {
  const track = useActiveTrack();
  // console.log('track====================== >>>>>>> here from minimised player', track);
  // 2. Get the current playback state (playing/paused)
  const playbackState = usePlaybackState();

  // If no track is playing, don't show the bar
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
            source={require('../Assets/Images/bottom.png')}
            style={styles.image}
          />
        </View>
        <TitleWithDescription
          style={styles.textContainer}
          titleStyle={styles.text1}
          descriptionStyle={styles.text2}
          title={'don’t forget your roots - 2021'}
          description="Six 60"
        />
        <View style={styles.actions}>
          <ThemeIconButton
            style={styles.iconBtn}
            iconSource={isPlaying ? require('../Assets/Images/pause.png') : require('../Assets/Images/play-circle.png')}
          // onPress={togglePlayback}
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
        <Slider
          style={styles.slider}
          thumbTintColor={'#058DD9'}
          minimumTrackTintColor={'#058DD9'}
          maximumTrackTintColor="rgba(255,255,255,0.3)"
          minimumValue={0}
          maximumValue={100}
          value={60}
        />
      </View>
    </View>
  );
};

export default MinimisedPlayer;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: '#353A40',
    gap: verticalScale(10),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    borderTopLeftRadius: moderateScale(30, 0.2),
    borderTopRightRadius: moderateScale(30, 0.3),
    zIndex: 1,
    paddingBottom: verticalScale(50),

    bottom: scale(30),
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
    width: 'auto',
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
