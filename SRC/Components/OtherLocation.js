import { View } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import { windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';

const OtherLocation = ({ item }) => {

  const dateObj = new Date(item?.event_date);

  const date = dateObj.toISOString().split("T")[0];

  const day = dateObj.getUTCDate();
  const time = dateObj.toISOString().split("T")[1].split(".")[0].slice(0, 5);
  const dayName = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC"
  });

  console.log(dayName);

  return (
    <TouchableOpacity
      onPress={() => {
        navigationService.navigate("DetailedScreen")
      }}
      style={styles.card}>
      <View style={styles.Circle}>
        <CustomText
          style={styles.day}>
          {day}
        </CustomText>
      </View>
      <View>
        <CustomText
          style={styles.title_text}>
          {item?.title}
        </CustomText>
        <CustomText
          style={styles.address_text}>
          {`${time} , ${dayName} |`}
        </CustomText>
        <CustomText
          numberOfLines={2}
          style={styles.address_text}>
          {item?.location_address}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default OtherLocation;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.9,
    paddingVertical: moderateScale(10, 0.6),
    marginVertical: moderateScale(5, 0.6),
    borderBottomColor: Color.darkGray,
  },
  Circle: {
    width: windowWidth * 0.17,
    height: windowWidth * 0.17,
    borderRadius: (windowWidth * 0.17) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    alignSelf: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
  },
  title_text: {
    color: Color.white,
    fontSize: moderateScale(16, 0.6),
    marginLeft: moderateScale(10, 0.6),
  },
  address_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
    marginLeft: moderateScale(10, 0.6),
    padding: moderateScale(2, 0.6),
  }, day: {
    color: Color.white,
    fontSize: moderateScale(18, 0.6),
    textAlign: 'center',
  }
});
