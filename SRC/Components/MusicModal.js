import {Icon} from 'native-base';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const MusicModal = ({item, setRef, rbRef}) => {
  const data = [
    {
      id: 1,
      name: 'listen to music ad-free',
      image: require('../Assets/Images/diamonds.png'),
    },
    {id: 2, name: 'like', image: require('../Assets/Images/heartVector.png')},
    {
      id: 3,
      name: 'hide this song',
      image: require('../Assets/Images/minus-cirlce.png'),
    },
    {
      id: 4,
      name: 'add to playlist',
      image: require('../Assets/Images/music-square-add.png'),
    },
    {
      id: 5,
      name: 'add to queue',
      image: require('../Assets/Images/firstline.png'),
    },
    {
      id: 6,
      name: 'view album',
      image: require('../Assets/Images/record-circle.png'),
    },
    {
      id: 7,
      name: 'view artist',
      image: require('../Assets/Images/profile-2user.png'),
    },
    {id: 8, name: 'share', image: require('../Assets/Images/share.png')},
    {
      id: 9,
      name: 'show credits',
      image: require('../Assets/Images/user-add.png'),
    },
    {
      id: 10,
      name: 'show spotify code',
      image: require('../Assets/Images/sound.png'),
    },
  ];
  return (
    <RBSheet
      ref={ref => (rbRef.current = ref)}
      closeOnDragDown={true}
      height={450}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: windowHeight * 0.65,
        },
      }}>
      <View
        style={{
          backgroundColor: '#282C30',
          height: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: windowWidth,
            justifyContent: 'space-between',
            paddingHorizontal: moderateScale(20, 0.6),
            marginTop: moderateScale(20, 0.6),
            // height: windowHeight * 0.25,
            alignItems: 'center',
          }}>
          <View style={styles.image_con}>
            <CustomImage
              source={require('../Assets/Images/bottom.png')}
              style={{
                height: '100%',
                width: '100%',
              }}
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.6,
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            <CustomText
              style={{
                color: Color.white,
                fontSize: moderateScale(16, 0.6),
              }}>
              don’t forget your roots - 2021
            </CustomText>
            <CustomText
              style={{
                color: '#7F8489',
                fontSize: moderateScale(16, 0.6),
              }}>
              six 60
            </CustomText>
          </View>
          <TouchableOpacity
            onPress={() => {
              rbRef.current.close();
            }}
            activeOpacity={0.4}
            style={styles.down}>
            <Icon
              as={Entypo}
              name="chevron-small-down"
              size={moderateScale(30, 0.6)}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{
            alignSelf: 'center',
            // backgroundColor: 'red',
            marginTop: moderateScale(20, 0.6),
          }}
          contentContainerStyle={{
            paddingBottom: moderateScale(30, 0.6),
          }}
          data={data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.row_con}>
                <View style={styles.icon_circle}>
                  <View style={styles.icon_con}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={item.image}
                    />
                  </View>
                </View>
                <View
                  style={{
                    backgroundColor: '#222529',
                    width: windowWidth * 0.7,
                    // paddingHorizontal : moderateScale(15, 0.6),
                    paddingVertical: moderateScale(12, 0.6),
                    marginHorizontal: moderateScale(10, 0.6),
                    paddingHorizontal: moderateScale(15, 0.6),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderRadius: 25,
                    alignItems: 'center',
                  }}>
                  <CustomText style={styles.title}>{item.name}</CustomText>

                  {item?.id == 1 && (
                    <View
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                        
                          height: windowHeight * 0.02,
                          width: windowWidth * 0.04,
                        }}>
                        <CustomImage
                          style={{height: '100%', width: '100%'}}
                          source={require('../Assets/Images/shapes.png')}
                        />
                      </View>
                      <CustomText
                        style={{
                          fontSize: moderateScale(11, 0.6),
                          color: '#11A8FD',
                          marginLeft: moderateScale(5, 0.6),
                        }}>
                        premium
                      </CustomText>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </RBSheet>
  );
};

export default MusicModal;

const styles = StyleSheet.create({
  down: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderRadius: (windowWidth * 0.12) / 2,
    backgroundColor: '#1C1F22',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 16,
  },
  image_con: {
    height: windowWidth * 0.13,
    width: windowWidth * 0.13,
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.13) / 2,
  },

  icon_con: {
    height: windowHeight * 0.03,
    width: windowWidth * 0.07,
  },
  icon_circle: {
    height: windowWidth * 0.12,
    width: windowWidth * 0.12,
    borderRadius: (windowWidth * 0.12) / 2,
    backgroundColor: '#1C1F22',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#707274ff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  title: {
    color: Color.white,
    fontSize: moderateScale(16, 0.6),
  },
  row_con: {
    paddingVertical: moderateScale(10, 0.6),
    width: windowWidth * 0.9,
    paddingHorizontal: moderateScale(10, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: moderateScale(5, 0.6),
  },
});
