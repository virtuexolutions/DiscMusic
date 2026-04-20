import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MusicBarcode = ({ trackId = 'random-track-id', style }) => {
  // Simple pseudo-random number generator for deterministic heights based on "trackId"
  const pseudoRandom = (seed) => {
    let value = seed;
    return function() {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  const rand = pseudoRandom(trackId.length > 0 ? trackId.charCodeAt(0) + trackId.length : 123);

  // Generate an array of heights resembling a waveform
  const generateBars = (count) => {
    const bars = [];
    for (let i = 0; i < count; i++) {
        // Values between 15% and 100% of max height
        const heightPercent = Math.max(15, Math.floor(rand() * 100));
        bars.push(heightPercent);
    }
    return bars;
  };

  const totalBars = 36;
  const bars = generateBars(totalBars);
  
  // Split bars for left and right sides of the logo
  const leftBars = bars.slice(0, totalBars / 2);
  const rightBars = bars.slice(totalBars / 2);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.codeWrapper}>
        <View style={styles.barsContainer}>
          {leftBars.map((heightPercent, index) => (
            <View 
              key={`left-${index}`} 
              style={[styles.bar, { height: `${heightPercent}%` }]} 
            />
          ))}
        </View>
        
        <View style={styles.logoContainer}>
            <MaterialCommunityIcons name="music" size={24} color="#000000" style={styles.icon} />
        </View>

        <View style={styles.barsContainer}>
          {rightBars.map((heightPercent, index) => (
            <View 
              key={`right-${index}`} 
              style={[styles.bar, { height: `${heightPercent}%` }]} 
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
    marginVertical: 10,
  },
  codeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50, // Max height of the bars
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  bar: {
    width: 4,
    backgroundColor: '#39FF14', // Neon Green
    borderRadius: 2,
    marginHorizontal: 2,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#39FF14', // Neon Green
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  icon: {
    marginTop: 2, // Slight adjustment to center the icon perfectly
  }
});

export default MusicBarcode;
