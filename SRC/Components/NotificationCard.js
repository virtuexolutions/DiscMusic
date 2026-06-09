import { Icon, View } from 'native-base';
import React from 'react';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { StyleSheet, TouchableOpacity } from 'react-native';
import navigationService from '../navigationService';
import { baseUrl } from '../Config';
import { useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';

const NotificationCard = ({ item }) => {
  const token = useSelector(state => state.authReducer.token);

  const notificationread = async () => {
    const url = `auth/notifications/${item?.id}/read`;
    const response = await Post(url, {}, apiHeader(token));
    if (response != undefined) {
      navigationService.navigate('PlaylistScreen', { item: item?.track, from: 'notification' })
    }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        notificationread()
        // navigationService.navigate('RecentlyPlayed');
      }}
      style={styles.card_con}>
      <View style={styles.card_image}>
        <CustomImage
          style={{ height: '100%', width: '100%' }}
          source={{ uri: `${baseUrl}/storage/${item?.track?.cover_image}` }}
        />
        <View style={styles.play_circle}>
          <CustomImage
            source={require('../Assets/Images/play-circle.png')}
            style={{ height: '100%', width: '100%' }}
          />
        </View>
      </View>

      <View>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.57,
          }}>

          {/* <View
            style={{
              flexDirection: 'row',
              // marginLeft: moderateScale(10, 0.6),
            }}>
            <Icon
              onPress={() => { }}
              name="heart-o"
              as={FontAwesome}
              size={moderateScale(18, 0.6)}
              color={Color.white}
            />
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
          </View> */}
        </View>
        <CustomText style={styles.title}>{item?.track?.title}</CustomText>
        <CustomText
          style={[styles.title, {
            fontSize: moderateScale(13, 0.6),
          }]}>
          {item?.artist?.name}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card_con: {
    flexDirection: 'row',
    backgroundColor: '#282C30',
    paddingVertical: moderateScale(5, 0.6),
    width: windowWidth * 0.93,
    marginTop: moderateScale(15, 0.6),
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  card_image: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.2,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
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
    color: '#7F8489',
    fontSize: moderateScale(16, 0.6),
    paddingTop: moderateScale(5, 0.6),
  }
});
