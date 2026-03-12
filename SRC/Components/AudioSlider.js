import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import TrackPlayer, { State, useActiveTrack, usePlaybackState, useProgress } from 'react-native-track-player';
const AudioSlider = ({
  currentTime = 30,
  totalTime,
  containerStyle,
  sliderStyle,
  sliderTimerContainerStyle
}) => {
  const [isSliding, setIsSliding] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  // 1. Get current position and duration
  const { position, duration } = useProgress();

  const safePosition = !isNaN(position) ? position : 0;
  const safeDuration = !isNaN(duration) && duration > 0 ? duration : 1;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View
      style={
        [
          {
            width: '100%',
            alignItems: 'center',
            // backgroundColor: 'red'
          }, containerStyle]}
    >
      <Slider
        style={
          [{ width: '100%', height: 30 }, sliderStyle]}
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
      />
      <View
        style={[{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -10,
        }, sliderTimerContainerStyle]}
      >
        <Text style={{ color: '#fff', fontSize: 10, }}>{formatTime(isSliding ? sliderValue : safePosition)}</Text>
        <Text style={{ color: '#fff', fontSize: 10, }}>{formatTime(safeDuration)}</Text>
      </View>
    </View>
  );
};
export default AudioSlider;
