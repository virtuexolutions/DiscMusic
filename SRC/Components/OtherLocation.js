import {View} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {moderateScale} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {windowWidth} from '../Utillity/utils';
import navigationService from '../navigationService';

const OtherLocation = ({item}) => {
  return (
    <TouchableOpacity 
    onPress={()=>{
      navigationService.navigate("DetailedScreen")
    }}
    style={styles.card}>
      <View style={styles.Circle}>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(18, 0.6),
            textAlign: 'center',
          }}>
          {item?.date}
        </CustomText>
      </View>
      <View>
        <CustomText
          style={{
            color: Color.white,
            fontSize: moderateScale(16, 0.6),
            marginLeft: moderateScale(10, 0.6),
          }}>
          {item?.name}
        </CustomText>
        <CustomText
          style={{
            color: '#7F8489',
            fontSize: moderateScale(13, 0.6),
            marginLeft: moderateScale(10, 0.6),
            padding: moderateScale(2, 0.6),
          }}>
          {item?.details}
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
});
