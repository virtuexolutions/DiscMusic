import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { windowWidth } from '../Utillity/utils';
import { moderateScale } from 'react-native-size-matters';
const AudioSlider = () => {
  const [value, setValue] = useState(30);
  const duration = 164;
  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <View
      style={{
        width:windowWidth * 0.9,
        alignItems: 'center',
        marginTop : moderateScale 
        // backgroundColor :
      }}
    >
      <Slider
        style={{ width:windowWidth *0.99, height: 30  ,marginTop : moderateScale(10,0.6)}}
        minimumValue={0}
        maximumValue={duration}
        value={value}
        minimumTrackTintColor="#3432ccff"
        maximumTrackTintColor="#999"
        thumbTintColor="#fff"
        onValueChange={(val) => setValue(val)}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: moderateScale(-5,0.6),
        }}
      >
        <Text style={{ color: '#fff', fontSize: moderateScale(13,0.6) }}>{formatTime(value)}</Text>
        <Text style={{ color: '#fff', fontSize: moderateScale(13,0.6) }}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};
export default AudioSlider;