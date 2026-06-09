import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, scale } from 'react-native-size-matters';
import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { setRepeatMode } from '../Store/slices/common';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';

// Repeat modes: 'off' -> 'queue' -> 'track' -> 'off'
const REPEAT_MODES = ['off', 'queue', 'track'];

const RepeatButton = ({ style, iconSize }) => {
  const dispatch = useDispatch();
  const repeatMode = useSelector(state => state.commonReducer.repeatMode) || 'off';

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(repeatMode === 'off' ? 0.5 : 1)).current;
  const badgeScaleAnim = useRef(new Animated.Value(repeatMode === 'track' ? 1 : 0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const isActive = repeatMode !== 'off';
  const isTrackRepeat = repeatMode === 'track';

  // Sync TrackPlayer repeat mode whenever redux state changes
  useEffect(() => {
    console.log("repeatMode", repeatMode);
    const syncRepeatMode = async () => {
      try {
        switch (repeatMode) {
          case 'queue':
            await TrackPlayer.setRepeatMode(RepeatMode.Queue);
            break;
          case 'track':
            await TrackPlayer.setRepeatMode(RepeatMode.Track);
            break;
          case 'off':
          default:
            await TrackPlayer.setRepeatMode(RepeatMode.Off);
            break;
        }
      } catch (error) {
        console.warn('Failed to set repeat mode:', error);
      }
    };
    syncRepeatMode();
  }, [repeatMode]);

  // Animate state transitions
  useEffect(() => {
    // Opacity animation
    Animated.timing(opacityAnim, {
      toValue: isActive ? 1 : 0.5,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Badge scale animation
    Animated.spring(badgeScaleAnim, {
      toValue: isTrackRepeat ? 1 : 0,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [repeatMode]);

  const handlePress = useCallback(() => {
    // Find current index and cycle to next
    const currentIndex = REPEAT_MODES.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % REPEAT_MODES.length;
    const nextMode = REPEAT_MODES[nextIndex];

    // Bounce animation on press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.7,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        tension: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Glow pulse animation when activating
    if (nextMode !== 'off') {
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }

    dispatch(setRepeatMode(nextMode));
  }, [repeatMode, dispatch]);

  const iconColor = isActive ? '#11A8FD' : Color.white;
  const resolvedIconSize = iconSize ?? moderateScale(22, 0.2);

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      {/* Glow effect layer */}
      <Animated.View
        style={[
          styles.glowLayer,
          {
            opacity: glowAnim,
            transform: [{ scale: Animated.add(1, Animated.multiply(glowAnim, 0.4)) }],
          },
        ]}
      />

      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <MaterialIcons
          name={'loop'}
          size={resolvedIconSize}
          color={iconColor}
        />

        {/* Active indicator dot */}
        {isActive && (
          <View style={[styles.activeDot, { backgroundColor: '#11A8FD' }]} />
        )}

        {/* "1" Badge for single-track repeat */}
        <Animated.View
          style={[
            styles.badge,
            {
              transform: [{ scale: badgeScaleAnim }],
              opacity: badgeScaleAnim,
            },
          ]}
        >
          <CustomText style={styles.badgeText}>1</CustomText>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default RepeatButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    position: 'relative',
  },
  glowLayer: {
    position: 'absolute',
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: 'rgba(17, 168, 253, 0.2)',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeDot: {
    width: scale(4),
    height: scale(4),
    borderRadius: scale(2),
    marginTop: scale(2),
  },
  badge: {
    position: 'absolute',
    top: -scale(4),
    right: -scale(8),
    backgroundColor: '#11A8FD',
    borderRadius: scale(7),
    width: scale(14),
    height: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: Color.white,
    fontSize: moderateScale(8, 0.2),
    fontWeight: '800',
    lineHeight: moderateScale(10, 0.2),
  },
});
