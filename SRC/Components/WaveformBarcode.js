import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../Assets/Utilities/Color';
import { scale } from 'react-native-size-matters';

/**
 * Inline waveform barcode component for use inside cards (e.g. MusicCodeCard).
 * Generates a Spotify-style bar pattern from a trackId string.
 */
const WaveformBarcode = ({ trackId, style }) => {
  const bars = useMemo(() => {
    // Simple hash from trackId string
    let seed = 0;
    const str = String(trackId || 'default');
    for (let i = 0; i < str.length; i++) {
      seed += str.charCodeAt(i);
    }
    const barCount = 20;
    const result = [];
    for (let i = 0; i < barCount; i++) {
      const h1 = Math.sin(seed * 0.7 + i * 0.9) * 0.35;
      const h2 = Math.cos(seed * 0.3 + i * 1.3) * 0.25;
      const h3 = Math.sin(seed * 1.1 + i * 0.5) * 0.15;
      const height = 0.3 + Math.abs(h1 + h2 + h3);
      result.push(Math.min(height, 1));
    }
    return result;
  }, [trackId]);

  return (
    <View style={[styles.container, style]}>
      {bars.map((h, i) => (
        <View
          key={i}
          style={[
            styles.bar,
            { height: scale(3 + h * 14) },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(1.5),
    paddingVertical: scale(4),
  },
  bar: {
    width: scale(2),
    backgroundColor: Color.white,
    borderRadius: scale(1),
  },
});

export default WaveformBarcode;
