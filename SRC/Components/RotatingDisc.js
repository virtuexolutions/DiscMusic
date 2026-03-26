import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing, StyleSheet } from "react-native";

const RotatingDisc = ({ isPlaying, image }) => {
  console.log('image====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', image);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  const startRotation = () => {
    rotateAnim.setValue(0);
    animationRef.current = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000, // speed of rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    animationRef.current.start();
  };

  const stopRotation = () => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startRotation();
    } else {
      stopRotation();
    }

    return () => stopRotation();
  }, [isPlaying]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={image ? { uri: image } : require("../Assets/Images/disc.png")} // 👈 your disc image
        style={[
          styles.disc,
          {
            transform: [{ rotate }],
          },
        ]}
      />
      {/* <View style={styles.centerHole} /> */}
    </View>
  );
};

export default RotatingDisc;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  disc: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  centerHole: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#000",
  },
});
