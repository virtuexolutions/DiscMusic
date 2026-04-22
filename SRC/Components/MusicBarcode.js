import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import BackButton from './BackButton';
import { moderateScale } from 'react-native-size-matters';

const MusicBarcode = ({ trackId = 'random-track-id', style, track }) => {
  console.log(track, "trackId")
  // Simple pseudo-random number generator for deterministic heights based on "trackId"
  const pseudoRandom = (seed) => {
    let value = seed;
    return function () {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const getSeed = (id) => {
    if (typeof id === 'string') return id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    if (typeof id === 'number') return id;
    if (typeof id === 'object' && id !== null) return JSON.stringify(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return 123;
  };
  const seed = getSeed(track?.id);
  const rand = pseudoRandom(seed || 123);

  // Generate an array of heights resembling a waveform
  const generateBars = (count) => {
    const bars = [];
    for (let i = 0; i < count; i++) {
      // More varied heights for a more natural waveform look
      const heightPercent = 20 + Math.floor(rand() * 80);
      bars.push(heightPercent);
    }
    return bars;
  };

  const totalBars = 24;
  const bars = generateBars(totalBars);
  console.log(bars, "barssssssssssssssssssssssssssssssssssss")

  return (
    <View style={styles.mainContainer}>
      <BackButton />
      <View style={styles.imageContainer}>
        <CustomImage style={{
          height: '100%',
          width: '100%',
          // resizeMode:'contain'
        }} source={require('../Assets/Images/music4.png')}
        />
      </View>

      <View style={[styles.container, style]}>
        <View style={styles.codeWrapper}>
          <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="spotify" size={20} color={Color.black} />
          </View>

          <View style={styles.barsContainer}>
            {bars.map((heightPercent, index) => (
              <View
                key={`bar-${index}`}
                style={[styles.bar, { height: `${heightPercent}%` }]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.black, // Pure dark for contrast
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25, // Pill shape
    alignSelf: 'center',
    marginVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  imageContainer:
  {
    height: windowHeight * 0.23,
    width: windowWidth * 0.5,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.2),
    overflow: 'hidden',
    marginTop: windowHeight * 0.25
  },
  mainContainer: {
    paddingHorizontal: moderateScale(20, .6),
    paddingTop: windowHeight * 0.05,
    backgroundColor: Color.black,
    width: windowWidth,
    height: windowHeight,
  },
  codeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35, // Compact height
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    width: 2.5, // Thinner bars for precision
    backgroundColor: '#1DB954', // Spotify Green
    borderRadius: 1.25,
    marginHorizontal: 1.5,
  },
  logoContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  }
});

export default MusicBarcode;
