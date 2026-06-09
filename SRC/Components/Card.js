import { View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

import { windowHeight, windowWidth } from '../Utillity/utils';
import { TouchableOpacity } from 'react-native';
import navigationService from '../navigationService';
import { useSelector } from 'react-redux';
import { baseUrl } from '../Config';

const Card = ({ fromEvent, artistData, data }) => {
  console.log("🚀 ~ Card ~ artistData artistData artistData dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa:", artistData?.artist?.user?.name, data)
  const userData = useSelector((state) => state.commonReducer.userData);
  console.log("artistData", artistData, `${baseUrl}/storage/${data?.profile_image}` || `${baseUrl}/storage/${artistData?.artist?.user?.profile_image}`)
  return (
    <TouchableOpacity
      onPress={() => navigationService.navigate('AboutArtist', { artistData: artistData, data: data })}
      style={[
        styles.lyrics_con,
        {
          height: fromEvent ? windowWidth * 0.72 : windowWidth * 0.82,
        },
      ]}>
      <CustomText
        style={{
          fontSize: moderateScale(15, 0.6),
          color: Color.white,
          width: '100%',
          paddingHorizontal: moderateScale(20, 0.6),
          paddingBottom: moderateScale(10, 0.6),
        }}>
        {fromEvent ? 'live events' : 'about the artist'}
      </CustomText>
      <View style={styles.artist_image}>
        <CustomImage
          onPress={() => navigationService.navigate('AboutArtist', { artistData: artistData, data: data })}

          style={{
            height: '100%',
            width: '100%',
          }}
          source={
            fromEvent
              ? require('../Assets/Images/event.png')
              : { uri: data?.profile_image ? `${baseUrl}/storage/${data?.profile_image}` : `${baseUrl}/storage/${artistData?.artist?.user?.profile_image}` }
          }
        />
      </View>
      <View style={styles.row_con}>
        <View style={styles.text_container}>
          <CustomText style={styles.title}>
            {fromEvent ? 'jun 9 - aug 25' : artistData?.artist?.user?.name ? artistData?.artist?.user?.name : data?.name}
          </CustomText>
          {/* <CustomText style={styles.sub_text}>
            {fromEvent ? '4 events on tour' :
              artistData?.artist?.monthly_listeners
            }
          </CustomText> */}
        </View>
        <CustomButton
          // isGradient
          text={fromEvent ? 'find tickets' : userData?.liked_artist?.filter((i) => i?.id == artistData?.artist?.id) ? 'following' : 'follow'}
          textColor={Color.white}
          width={windowWidth * 0.24}
          height={windowHeight * 0.04}
          onPress={() => {
            // setIsVisible(false);
          }}
          // bgColor={Color.red}
          // 
          bgColor={userData?.liked_artist?.filter((i) => i?.id == artistData?.artist?.id) ? Color.themeSkyBlue : Color.lightGrey}
          // marginTop={moderateScale(-10, 0.6)}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
      </View>
      {!fromEvent && (
        <CustomText numberOfLines={2} style={styles.sub_text}>
          {artistData?.artist?.bio ? artistData?.artist?.bio : data?.bio ? data?.bio : 'No bio available  '}
          <CustomText
            style={{
              color: Color.white,
            }}>
            see more
          </CustomText>
        </CustomText>
      )}
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  lyrics_con: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.5,
    marginTop: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#2c2c2cff',
    // justifyContent: 'center',
    paddingTop: moderateScale(10, 0.3),
    // iOS Shadow
    alignItems: 'center',
    shadowColor: '#afafafff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    // Android Shadow
    elevation: 20,
  },
  lyrics_Header: {
    flexDirection: 'row',
    width: '95%',
    paddingHorizontal: moderateScale(10, 0.3),
    justifyContent: 'space-between',
    marginBottom: moderateScale(20, 0.6),
  },
  header_image: {
    height: windowHeight * 0.03,
    width: windowWidth * 0.06,
  },
  header_btn: {
    width: windowWidth * 0.08,
    height: windowWidth * 0.08,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: (windowWidth * 0.08) / 2,
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#2c2c2cff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#afafafff',
    shadowOffset: {
      width: 60,
      height: -10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    // Android Shadow
    elevation: 8,
  },
  lyrics: {
    backgroundColor: '#191b1dff',
    height: '72%',
    borderRadius: moderateScale(20, 0.6),
    width: '100%',
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.3),
  },
  text2: {
    fontSize: moderateScale(13, 0.6),
    color: Color.white,
    textAlign: 'justify',
    letterSpacing: 1.5,
    lineHeight: 18,
    textTransform: 'none',
  },
  text3: {},

  artist_image: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    // backgroundColor: 'red',
    borderRadius: moderateScale(20, 0.6),
    overflow: 'hidden',
    marginBottom: moderateScale(5, .6),
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(16, 0.6),
    paddingTop: moderateScale(5, .6),
    height: windowHeight * 0.04,
  },

  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(18, .6)
  },
  follow_btn: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.03,
    backgroundColor: '#2F353A',
  },
  row_con: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: moderateScale(10, .6),
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  text_container: {
    width: windowWidth * 0.6,
    // backgroundColor :'red',
    paddingHorizontal: moderateScale(20, 0.6),
    // paddingVertical: moderateScale(10, 0.6),
  },
});
export default Card;
