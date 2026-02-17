import {ScrollView, View} from 'native-base';
import React, {useRef, useState} from 'react';
import {ImageBackground, TouchableOpacity} from 'react-native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';

import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {Circle} from 'react-native-svg';
import {Custom} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Custom';
import OtherLocation from '../Components/OtherLocation';
import {mode} from 'native-base/lib/typescript/theme/tools';
import MusicModal from '../Components/MusicModal';
import MinimisedPlayer from '../Components/MinimisedPlayer';

const DetailedScreen = () => {
    const rbRef = useRef(null)
  const events = [
    {
      date: `May \n13`,
      name: 'sam smith, cat burns',
      details: 'sat, 8 pm | accor arena, paris',
    },
    {
      date: `May \n13`,
      name: 'sofi tukker',
      details: 'sat, 11 am | marquee dayclub, las vegas',
    },
    {
      date: `May \n13`,
      name: 'lizzo',
      details: 'sat, 8 pm | ppg paints arena, pittsburgh',
    },
  ];
  const musicData = [
    {
      image: require('../Assets/Images/music1.png'),
      name: 'future dust',
      details: 'the amazons',
    },
    {
      image: require('../Assets/Images/music2.png'),
      name: 'weight of the world',
      details: 'maxo kream',
    },
    {
      image: require('../Assets/Images/music3.png'),
      name: 'optimist (deluxe)',
      details: 'finneas',
    },
  ];

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}
        imageStyle={styles.image}>
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingBottom: moderateScale(80, 0.6),
          }}
          style={styles.container}>
          <CustomHeader leftIcon 
          showBack
          text={''} subtext={''} />

          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.74,
              marginTop: moderateScale(20, 0.6),
              //   justifyContent: 'space-between',
              paddingHorizontal: moderateScale(10, 0.6),
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: windowWidth * 0.7,
              }}>
              <View style={styles.image_circle}>
                <CustomImage
                  source={require('../Assets/Images/artist6.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
              <View
                style={[
                  styles.image_circle,
                  {marginLeft: moderateScale(-17, 0.6)},
                ]}>
                <CustomImage
                  source={require('../Assets/Images/artist4.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
              <View
                style={[
                  styles.image_circle,
                  {marginLeft: moderateScale(-15, 0.6)},
                ]}>
                <CustomImage
                  source={require('../Assets/Images/artist5.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
            </View>
            <View style={styles.Circle}>
              <CustomText
                style={{
                  fontSize: moderateScale(19, 0.6),
                  color: Color.white,
                }}>
                {`Jun \n  9`}
              </CustomText>
            </View>
          </View>

          <CustomText isBold style={[styles.title]}>
            lizzo, odesza, kendrick lamar,...
          </CustomText>
          <CustomText style={styles.sub_text}>
            friday, june 9,2023 8:00 pm
          </CustomText>
          <CustomText style={styles.sub_text}>
            flushing meadows park, queens
          </CustomText>
          <View style={styles.details}>
            <CustomText
              isBold
              style={[
                styles.title,
                {
                  paddingHorizontal: moderateScale(10, 0.6),
                },
              ]}>
              the lineup
            </CustomText>
            <View style={styles.row_con}>
              <View style={styles.art_image}>
                <CustomImage
                  source={require('../Assets/Images/artist6.png')}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  paddingHorizontal: moderateScale(10, 0.6),
                }}>
                <CustomText
                  style={[
                    styles.title,
                    {
                      paddingHorizontal: moderateScale(0, 0.6),
                    },
                  ]}>
                  lizzo
                </CustomText>
                <CustomText
                  style={[
                    styles.sub_text,
                    {
                      paddingVertical: moderateScale(2, 0.6),
                      paddingHorizontal: moderateScale(0, 0.6),
                    },
                  ]}>
                  view all events
                </CustomText>
              </View>
            </View>
            <View style={styles.inner_con}>
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.7,
                }}>
                <View style={styles.image_sec}>
                  <CustomImage
                    source={require('../Assets/Images/artist4.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.image_sec,
                    {marginLeft: moderateScale(-17, 0.6)},
                  ]}>
                  <CustomImage
                    source={require('../Assets/Images/artist5.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
                <View
                  style={[
                    styles.image_sec,
                    {marginLeft: moderateScale(-15, 0.6)},
                  ]}>
                  <CustomImage
                    source={require('../Assets/Images/art7.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </View>
              <CustomText
                isBold
                style={{
                  paddingHorizontal: moderateScale(10, 0.6),
                  paddingTop: moderateScale(10, 0.6),
                  fontSize: moderateScale(18, 0.6),
                  color: Color.white,
                }}>
                odesza
              </CustomText>
              <CustomText
                style={[
                  styles.sub_text,
                  {
                    paddingHorizontal: moderateScale(10, 0.6),
                  },
                ]}>
                | kendrick lamar | lil uz...
                <CustomText
                  style={{
                    color: Color.white,
                  }}>{`and 51\n   more`}</CustomText>
              </CustomText>
            </View>
          </View>
          <View style={styles.details}>
            <CustomText
              isBold
              style={[
                styles.title,
                {
                  paddingHorizontal: moderateScale(10, 0.6),
                },
              ]}>
              available tickets
            </CustomText>
            {events?.map((item, index) => {
              return <OtherLocation item={item} />;
            })}
          </View>
          <View style={styles.details}>
            <CustomText
              isBold
              style={[
                styles.title,
                {
                  paddingHorizontal: moderateScale(10, 0.6),
                },
              ]}>
              listen to their music
            </CustomText>
            {musicData?.map((item, index) => {
              return (
                <TouchableOpacity onPress={() =>{
                    rbRef.current.open()
                }}   style={styles.card_con}>
                  <View style={styles.card_image}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={item?.image}
                    />
                  </View>
                  <View
                    style={{
                      // alignItems:'center',
                      justifyContent: 'center',
                    }}>
                    <CustomText
                      style={[
                        styles.title,
                        {
                          paddingHorizontal: moderateScale(0, 0.6),
                          fontSize: moderateScale(16, 0.6),
                        },
                      ]}>
                      {item?.name}
                    </CustomText>
                    <CustomText
                      style={[
                        styles.sub_text,
                        {
                          paddingHorizontal: moderateScale(0, 0.6),
                          paddingVertical: moderateScale(0, 0.6),
                        },
                      ]}>
                      {item?.details}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <MusicModal rbRef={rbRef} />
        <MinimisedPlayer/>
      </ImageBackground>
    </>
  );
};

const styles = ScaledSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
  },
  container: {
    width: windowWidth,
    height: windowHeight,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },

  row_con: {
    flexDirection: 'row',
    marginTop: moderateScale(10, 0.6),
    backgroundColor: '#282C30',
    borderRadius: 20,
    paddingVertical: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(19, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  sub_text: {
    color: '#7F8489',
    fontSize: moderateScale(13, 0.6),
    padding: moderateScale(2, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
  },
  details: {
    paddingVertical: moderateScale(20, 0.6),
    backgroundColor: '#1C1F22',
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(30, 0.6),
    alignSelf: 'center',
  },
  card_con: {
    flexDirection: 'row',
    // backgroundColor: 'red', 
    backgroundColor: '#222529',
    paddingVertical: moderateScale(10, 0.6),
    // height: windowHeight * 0.1,
    width: windowWidth * 0.85,
    marginTop: moderateScale(10, 0.6),
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.6),
  },
  card_image: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.158,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    marginRight: moderateScale(10, 0.6),
  },
  Circle: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: (windowWidth * 0.18) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(10, 0.6),
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    // position: 'absolute',
  },

  btn_Con: {
    flexDirection: 'row',
    width: windowWidth * 0.28,
    marginLeft: moderateScale(5, 0.6),
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 25,
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 16,
    alignSelf: 'center',
    backgroundColor: '#1C1F22',
    // marginTop: moderateScale(20, 0.6),
  },
  image_circle: {
    width: windowHeight * 0.08,
    height: windowHeight * 0.08,
    borderRadius: (windowHeight * 0.08) / 2,
    overflow: 'hidden',
    backgroundColor: '#1C1F22',
  },

  image_sec: {
    width: windowHeight * 0.05,
    height: windowHeight * 0.05,
    borderRadius: (windowHeight * 0.05) / 2,
    overflow: 'hidden',
    backgroundColor: '#1C1F22',
  },
  art_image: {
    width: windowHeight * 0.065,
    height: windowHeight * 0.065,
    borderRadius: (windowHeight * 0.065) / 2,
    overflow: 'hidden',
  },
  inner_con: {
    backgroundColor: '#282C30',
    borderRadius: 20,
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
    marginTop: moderateScale(15, 0.6),
  },
});

export default DetailedScreen;
