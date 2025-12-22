import { View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

import { windowHeight, windowWidth } from '../Utillity/utils';

const Card = ({fromEvent}) => {
  return (
    <View
      style={[
        styles.lyrics_con,
        {
          height: fromEvent ? windowWidth * 0.72 :windowWidth * 0.82,
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
          style={{
            height: '100%',
            width: '100%',
          }}
          source={
            fromEvent
              ? require('../Assets/Images/event.png')
              : require('../Assets/Images/artist.png')
          }
        />
      </View>
      <View style={styles.row_con}>
        <View style={styles.text_container}>
          <CustomText style={styles.title}>
            {fromEvent ? 'jun 9 - aug 25' : 'oliver tree'}
          </CustomText>
          <CustomText style={styles.sub_text}>
            {fromEvent ? '4 events on tour' : '24,419,528 monthly listeners'}
          </CustomText>
        </View>
        <CustomButton
          isGradient
          text={fromEvent ?'find tickets'  :'follow'}
          textColor={Color.white}
          width={windowWidth * 0.24}
          height={windowHeight * 0.04}
          onPress={() => {
            // setIsVisible(false);
          }}
          bgColor={Color.lightGrey}
          marginTop={moderateScale(10, 0.6)}
          borderRadius={moderateScale(30, 0.3)}
          fontSize={moderateScale(12, 0.3)}
        />
      </View>
      {!fromEvent && (
        <CustomText style={styles.sub_text}>
          An internet based vocalist, producer, writer, director and performance
          artist, Oliver Tree...
          <CustomText
            style={{
              color: Color.white,
            }}>
            see more
          </CustomText>
        </CustomText>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  lyrics_con: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.5,
    marginTop: moderateScale(20, 0.3),
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
    backgroundColor: 'red',
    borderRadius: moderateScale(20, 0.6),
    overflow: 'hidden',
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(16, 0.6),
  },

  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(12, 0.6),
  },
  follow_btn: {
    width: windowWidth * 0.22,
    height: windowHeight * 0.03,
    backgroundColor: '#2F353A',
  },
  row_con: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  text_container: {
    width: windowWidth * 0.6,
    // backgroundColor :'red',
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
});
export default Card;
