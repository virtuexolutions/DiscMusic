import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, scale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import { toggleShuffleMode, getCurrentShuffleMode, SHUFFLE_MODES } from './MusicPlayerController';
import { useIsFocused } from '@react-navigation/native';
import PermiumModal from './PermiumModal';
import { useSelector } from 'react-redux';

const ShuffleButton = ({ style, iconSize }) => {
  const userdata = useSelector(state => state.commonReducer.userData)
  const [shuffleMode, setShuffleMode] = useState(SHUFFLE_MODES.OFF);
  const isFocused = useIsFocused();
  const RbRef = useRef(null);

  // Animation refs
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.5)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const badgeScaleAnim = useRef(new Animated.Value(0)).current;

  const isActive = shuffleMode !== SHUFFLE_MODES.OFF;
  const isSmartShuffle = shuffleMode === SHUFFLE_MODES.SMART_SHUFFLE;

  // ✅ Sync on focus
  useEffect(() => {
    setShuffleMode(getCurrentShuffleMode());
  }, [isFocused]);

  // ✅ Animate on mode change
  useEffect(() => {
    // Opacity
    Animated.timing(opacityAnim, {
      toValue: isActive ? 1 : 0.5,
      duration: 250,
      useNativeDriver: true,
    }).start();

    // Smart shuffle badge
    Animated.spring(badgeScaleAnim, {
      toValue: isSmartShuffle ? 1 : 0,
      friction: 5,
      tension: 120,
      useNativeDriver: true,
    }).start();
  }, [shuffleMode]);

  const handlePress = useCallback(async () => {
    // ✅ Bounce animation
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

    // ✅ Glow animation when activating
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

    // ✅ Toggle shuffle mode
    const newMode = await toggleShuffleMode();
    console.log('🔀 Shuffle Mode:', newMode);
    setShuffleMode(newMode);
  }, [shuffleMode]);

  // ✅ Icon color per mode
  const getIconColor = () => {
    if (shuffleMode === SHUFFLE_MODES.SMART_SHUFFLE) return '#FFD700'; // gold
    if (shuffleMode === SHUFFLE_MODES.SHUFFLE) return '#11A8FD';       // blue
    return Color.white;                                                  // gray off
  };

  const resolvedIconSize = iconSize ?? moderateScale(22, 0.2);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (userdata?.subscription?.length > 0) {
            handlePress()
          } else {
            RbRef.current.open()
          }
        }}
        activeOpacity={0.7}
        style={[styles.container, style]}
      >
        {/* ✅ Glow effect */}
        <Animated.View
          style={[
            styles.glowLayer,
            {
              opacity: glowAnim,
              backgroundColor: isSmartShuffle
                ? 'rgba(255, 215, 0, 0.2)'   // gold glow for smart
                : 'rgba(17, 168, 253, 0.2)', // blue glow for regular
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
          <Ionicons
            name="shuffle"
            size={resolvedIconSize}
            color={getIconColor()}
          />

          {/* ✅ Active dot */}
          {isActive && (
            <View style={[
              styles.activeDot,
              { backgroundColor: isSmartShuffle ? '#FFD700' : '#11A8FD' }
            ]} />
          )}

          {/* ✅ Smart shuffle badge — "S" */}
          <Animated.View
            style={[
              styles.badge,
              {
                transform: [{ scale: badgeScaleAnim }],
                opacity: badgeScaleAnim,
              },
            ]}
          >
            <CustomText style={styles.badgeText}>S</CustomText>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
      <PermiumModal rbRef={RbRef} />
    </>
  );
};

export default ShuffleButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    height: 'auto',
    position: 'relative',
    marginRight: moderateScale(15, .6)
  },
  glowLayer: {
    position: 'absolute',
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
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
    backgroundColor: '#FFD700',
    borderRadius: scale(7),
    width: scale(14),
    height: scale(14),
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#000',
    fontSize: moderateScale(8, 0.2),
    fontWeight: '800',
    lineHeight: moderateScale(10, 0.2),
  },
});
