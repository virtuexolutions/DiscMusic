import React from "react";
import { Text } from "react-native";
import Color from "../Assets/Utilities/Color";

const CustomText = ({ children, numberOfLines, style, isBold, onPress, ellipsizeMode }) => {

  return (
    <Text
      onPress={onPress}
      ellipsizeMode={ellipsizeMode}
      style={[
        {
          textTransform: "capitalize",
          // textTransform: "capitalize",
          color: Color.black,
        },
        style,
        { fontFamily: "Urbanist-Regular" },
        isBold && {
          fontFamily: "Urbanist-Bold",
          fontWeight: "bold",
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default CustomText;
