import { Icon, ScrollView, View } from 'native-base';
import React, { useRef } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RecentCard = ({ item }) => {
  // console.log('🚀 ~==== RecentCard ~ item:', item);
  return (
    <View style={styles.card_con}>
      <View style={styles.card_image}>
        <CustomImage
          style={{ height: '100%', width: '100%' }}
          source={item.image}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <CustomText
          numberOfLines={1}
          isBold
          style={{
            color: Color.white,
            fontSize: moderateScale(16, 0.6),
          }}>
          {item?.title}
        </CustomText>
        <CustomText
          numberOfLines={1}
          isBold
          style={{
            color: '#7F8489',
            fontSize: moderateScale(14, 0.6),
          }}>
          {item?.artist}
        </CustomText>
      </View>

      <Icon
        activeopacity={0.7}
        onPress={() => {
          // console.log('first================= >>>>');
        }}
        style={{ marginLeft: moderateScale(10, 0.6) }}
        name="dots-three-vertical"
        as={Entypo}
        size={moderateScale(18, 0.6)}
        color={Color.white}
      />
    </View>
  );
};

export default RecentCard;

const styles = StyleSheet.create({
  card_con: {
    flexDirection: 'row',
    backgroundColor: '#282C30',
    paddingVertical: moderateScale(7, 0.6),
    // height: windowHeight * 0.1,
    width: windowWidth * 0.93,
    marginTop: moderateScale(15, 0.6),
    borderRadius: 30,
    paddingHorizontal: moderateScale(10, 0.6),
    shadowColor: '#000',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  card_image: {
    height: windowHeight * 0.075,
    width: windowWidth * 0.18,
    borderRadius: moderateScale(20, 0.6),
    overflow: 'hidden',
    backgroundColor: 'red',
    marginRight: moderateScale(10, 0.6),
  },

  play_circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -18 }],
    height: windowHeight * 0.037,
    width: windowHeight * 0.042,
    shadowColor: '#000000ff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  title: {
    backgroundColor: 'blue',
    color: Color.white,
    fontSize: moderateScale(18, 0.6),
    paddingTop: moderateScale(5, 0.6),
  },
});
