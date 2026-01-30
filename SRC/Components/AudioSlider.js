import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
const AudioSlider = ({
  currentTime=30, 
  totalTime,
  containerStyle,
  sliderStyle,
  sliderTimerContainerStyle
}) => {
  const [value, setValue] = useState(currentTime);
  const duration = 164;
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View
      style={
        [
        {
        width: '100%',
        alignItems: 'center',
      }, containerStyle]}
    >
      <Slider
        style={
          [{ width: '100%', height: 30 }, sliderStyle]}
        minimumValue={0}
        maximumValue={duration}
        value={value}
        minimumTrackTintColor="#fff"
    
        maximumTrackTintColor={Color.themeLightGray}
        thumbTintColor="#fff"
        onValueChange={(val) => setValue(val)}
      />
      <View
        style={[{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: -10,
        }, sliderTimerContainerStyle]}
      >
        <Text style={{ color: '#fff', fontSize: 10 }}>{formatTime(value)}</Text>
        <Text style={{ color: '#fff', fontSize: 10 }}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};
export default AudioSlider;
