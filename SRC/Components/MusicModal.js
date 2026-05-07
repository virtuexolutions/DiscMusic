import { Icon } from 'native-base';
import React, { useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Share, Alert, Platform, ToastAndroid } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import { useNavigation } from '@react-navigation/native';
import MusicBarcode from './MusicBarcode';
import { baseUrl } from '../Config';
import { useLikeTrack } from '../Hooks/useLikeTrack';
import TrackPlayer from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHiddenSong, addToPlaylist } from '../Store/slices/common';
import navigationService from '../navigationService';

const MusicModal = ({ track, setRef, rbRef }) => {
  console.log(track, "itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm <<<<<<<<<<<<<<<<<<<<<<<<====================================")
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const hiddenSongs = useSelector(state => state.commonReducer.hiddenSongs || []);
  const isHidden = hiddenSongs?.some(id => Number(id) === Number(track?.id));
  const { toggleLike, isLiked } = useLikeTrack(track);

  const data = [
    {
      id: 1,
      name: 'listen to music ad-free',
      image: require('../Assets/Images/diamonds.png'),
      onPress: () => {
        rbRef.current.close();
        navigation.navigate("PremiumScreen", { fromModal: true });
      }
    },
    {
      id: 2,
      name: isLiked ? 'unlike' : 'like',
      image: require('../Assets/Images/heartVector.png'),
      onPress: () => {
        toggleLike();
      }
    },
    {
      id: 3,
      name: isHidden ? 'unhide this song' : 'hide this song',
      image: require('../Assets/Images/minus-cirlce.png'),
      onPress: () => {
        rbRef.current.close();
        if (track) {
          dispatch(toggleHiddenSong(track.id));
          Platform.OS === 'android'
            ? ToastAndroid.show(isHidden ? 'Song unhidden' : 'Song hidden from recommendations', ToastAndroid.SHORT)
            : Alert.alert(isHidden ? 'Unhidden' : 'Hidden', isHidden ? 'This song is now visible.' : 'This song has been hidden from your recommendations.');
        }
      }
    },
    {
      id: 4,
      name: 'add to playlist',
      image: require('../Assets/Images/music-square-add.png'),
      onPress: () => {
        rbRef.current.close();
        if (track) {
          dispatch(addToPlaylist(track));
          Platform.OS === 'android'
            ? ToastAndroid.show('Added to playlist for long term', ToastAndroid.SHORT)
            : Alert.alert('Added', 'Added to playlist for long term.');
        }
      }
    },
    {
      id: 5,
      name: 'add to queue',
      image: require('../Assets/Images/firstline.png'),
      onPress: async () => {
        rbRef.current.close();
        if (track) {
          const activeTrackIndex = await TrackPlayer.getActiveTrackIndex();
          if (activeTrackIndex !== undefined && activeTrackIndex !== null) {
            await TrackPlayer.add([track], activeTrackIndex + 1);
          } else {
            await TrackPlayer.add([track]);
          }
          Platform.OS == 'android' ? ToastAndroid.show('Added to queue to play next', ToastAndroid.SHORT) : Alert.alert('Added', 'Added to queue to play next.');
        }
      }
    },
    {
      id: 6,
      name: 'view album',
      image: require('../Assets/Images/record-circle.png'),
      onPress: () => {
        rbRef.current.close();
        navigationService.navigate('DetailScreen', { item: track, from: 'viewAblum' });
        // Alert.alert('View Album', 'Album view coming soon!');
      }
    },
    {
      id: 7,
      name: 'view artist',
      image: require('../Assets/Images/profile-2user.png'),
      onPress: () => {
        rbRef.current.close();
        navigation.navigate('AboutArtist', { artistData: track?.artist })
        // Alert.alert('View Artist', 'Artist view coming soon!');
      }
    },
    {
      id: 8,
      name: 'share',
      image: require('../Assets/Images/share.png'),
      onPress: () => {
        rbRef.current.close();
        Share.share({ message: `Listen to ${track?.title || 'this song'} on DiscMusic!` });
      }
    },
    {
      id: 9,
      name: 'show credits',
      image: require('../Assets/Images/user-add.png'),
      onPress: () => {
        rbRef.current.close();
        Alert.alert('Credits', `Performed by ${track?.artist || 'Unknown'}`);
      }
    },
    {
      id: 10,
      name: 'show discmusic code',
      image: require('../Assets/Images/sound.png'),
      onPress: () => {
        rbRef.current.close();
        navigation.navigate('MusicBarcode', { track: track });
      }
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
              // source={track?.artwork ? { uri: track.artwork } : track?.cover_image ? { uri: `${baseUrl}/storage/${track.cover_image}` } : require('../Assets/Images/bottom.png')}
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
              {/* {track?.title || 'Unknown Title'} */}
            </CustomText>
            <CustomText
              style={{
                color: '#7F8489',
                fontSize: moderateScale(16, 0.6),
              }}>
              {/* {track?.artist || 'six 60'} */}
            </CustomText>
            {/* <MusicBarcode
              trackId={item?.id || 'default'}
              style={{ alignSelf: 'flex-start', marginVertical: 5, paddingVertical: 8, paddingHorizontal: 12 }}
            /> */}
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
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={item?.onPress} style={styles.row_con}>
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
                          style={{ height: '100%', width: '100%' }}
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
