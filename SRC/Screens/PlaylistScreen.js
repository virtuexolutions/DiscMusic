import { Icon, ScrollView, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import TrackPlayer, { Event, State, usePlaybackState, useActiveTrack } from 'react-native-track-player';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import AudioSlider from '../Components/AudioSlider';
import Card from '../Components/Card';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { playNext, playPlaylist, playPrevious, playSingleTrack, getArtistNameFromTrack, playPlaylistFromTrack } from '../Components/MusicPlayerController';
import { baseUrl } from '../Config';

const PlaylistScreen = props => {
  const data = props?.route?.params?.item;
  const allTracks = props?.route?.params?.allTracks;
  console.log('🚀 ~ PlaylistScreen ~ data >>>>>>>>>>>>>>>>>>>>>>>>>>>> :', data?.is_liked);


  // Use the reactive hook to track the actual play state
  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;
  // console.log('mmmmmmmmmmmmmmmmmmmm ', playbackState.state)
  const currentTrack = useActiveTrack();
  const artistName = getArtistNameFromTrack(currentTrack);


  const [liked, setLiked] = useState(data?.is_liked);
  console.log('djhfjksdhkfhskdfh kshdj skdfh', liked)

  const likeTrack = async () => {
    const url = 'auth/liked-songs/store'
    const body = {
      track_id: track?.id,
      // is_liked: true
    }
    return console.log('body====================== >>>>>>> here from music player screen',)
    const response = await Post(url, { track_id: track?.id }, apiHeader(token));
    if (response != undefined) {
      console.log('you liked this song')
    }
    console.log('response====================== >>>>>>> here from music player screen', response?.data);
  }

  const unlikeTrack = async () => {
    const url = 'auth/liked-songs/remove'

    // return console.log('body====================== >>>>>>> here from music player screen',)
    const response = await Post(url, { track_id: track?.id }, apiHeader(token));
    if (response != undefined) {
      console.log('you liked this song')
    }
    console.log('response====================== >>>>>>> here from music player screen', response?.data);
  }



  const handleLike = async () => {
    // ✅ UI turant update
    setLiked(!liked);

    try {
      await
        liked || data?.is_liked ? unlikeTrack() : likeTrack(); // API call
    } catch (error) {
      // ❌ agar API fail ho jaye to revert
      setLiked(false);
    }
  };
  useEffect(() => {
    // Play the full list but start from the selected track
    if (data && allTracks) {
      playPlaylistFromTrack(allTracks, data);
    } else if (data) {
      playPlaylist(data);
    }
  }, [data?.id]);

  useEffect(() => {
    // Add playback error listener
    const errorListener = TrackPlayer.addEventListener('playback-error', error => {
      console.error('Playback error:', error);
    });

    // Cleanup listener on unmount
    return () => errorListener.remove();
  }, []);
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
        <CustomHeader
          leftIcon
          RightIcon
          showBack={true}
          dots={true}
          text1={'playing from playlist'}
          subtext={'Mega hit mix'}
        />
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingBottom: moderateScale(15, 0.6),
          }}
          style={{
            width: '100%',
            flexGrow: 0,
            // backgroundColor: 'red'
          }}>
          <View style={styles.container}>

            <View style={styles.image_con}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={{ uri: data?.cover_image ? `${baseUrl}/storage/${data?.cover_image}` : require('../Assets/Images/playlist_image.png') }}
              />
            </View>
            <View style={styles.text_con}>
              <View>
                <CustomText style={styles.h1}>{currentTrack?.title || 'Unknown Title'}</CustomText>
                <CustomText style={styles.h2}>
                  {artistName}
                </CustomText>
              </View>
              <TouchableOpacity style={{ padding: 5, borderRadius: 5, paddingHorizontal: moderateScale(10, 0.6) }} onPress={() => handleLike()}>
                <Icon
                  onPress={() => handleLike()}
                  style={{ alignSelf: 'center' }}
                  color={liked || data?.is_liked ? Color.red : Color.white}
                  size={moderateScale(20, 0.6)}
                  name={liked || data?.is_liked ? "heart" : "hearto"}
                  as={AntDesign}
                />
              </TouchableOpacity>
            </View>
            <AudioSlider width={windowWidth * 0.9} />
            <View style={styles.player_btn}>
              <TouchableOpacity style={styles.btn}>
                <Icon
                  name="shuffle"
                  as={Entypo}
                  color={Color.white}
                  size={moderateScale(13, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={true}
                onPress={() => {
                  playPrevious();
                }}
                style={[
                  styles.btn,
                  {
                    width: windowWidth * 0.12,
                    height: windowWidth * 0.12,
                    borderRadius: (windowWidth * 0.12) / 2,
                  },
                ]}>
                <Icon
                  onPress={() => {
                    // playPrevious();
                  }}
                  name="play-skip-back-outline"
                  as={Ionicons}
                  color={Color.white}
                  size={moderateScale(17, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // If we have a track in Context, we want to play/pause appropriately
                  if (isPlaying) {
                    TrackPlayer.pause();
                  } else {
                    TrackPlayer.play();
                  }
                }}
                style={[
                  styles.btn,
                  {
                    width: windowWidth * 0.15,
                    height: windowWidth * 0.15,
                    borderRadius: (windowWidth * 0.15) / 2,
                  },
                ]}>
                <Icon
                  onPress={() => {
                    // If we have a track in Context, we want to play/pause appropriately
                    if (isPlaying) {
                      TrackPlayer.pause();
                    } else {
                      TrackPlayer.play();
                    }
                  }}
                  name={isPlaying ? 'pause' : 'play'}
                  as={Feather}
                  color={Color.white}
                  size={moderateScale(20, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  playNext()
                }}
                style={[
                  styles.btn,
                  {
                    width: windowWidth * 0.12,
                    height: windowWidth * 0.12,
                    borderRadius: (windowWidth * 0.13) / 2,
                  },
                ]}>
                <Icon onPress={() => {
                  playNext()
                }}
                  name="play-skip-forward-outline"
                  as={Ionicons}
                  color={Color.white}
                  size={moderateScale(17, 0.6)}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.btn}>
                <Icon
                  name="loop"
                  as={MaterialIcons}
                  color={Color.white}
                  size={moderateScale(13, 0.6)}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.devices_Con}>
              <View style={styles.dec1}>
                <Icon
                  name="mobile"
                  as={Entypo}
                  color={Color.white}
                  size={moderateScale(20, 0.6)}
                />
                <View style={{ marginLeft: moderateScale(10, 0.3) }}>
                  <CustomText style={styles.h3}>current Device </CustomText>
                  <CustomText style={styles.h4}>this phone </CustomText>
                </View>
              </View>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidth * 0.18,
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.header_image}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={require('../Assets/Images/share.png')}
                    />
                  </View>
                  <Icon
                    name="filter-sharp"
                    as={Ionicons}
                    color={Color.white}
                    size={moderateScale(22, 0.6)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.lyrics_con}>
              <View style={styles.lyrics_Header}>
                <TouchableOpacity style={styles.header_btn}>
                  <View style={styles.header_image}>
                    <CustomImage
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={require('../Assets/Images/share.png')}
                    />
                  </View>
                </TouchableOpacity>
                <CustomText style={styles.h5}>Lyrics </CustomText>
                <TouchableOpacity style={styles.header_btn}>
                  <Icon
                    name="filter-sharp"
                    as={Ionicons}
                    color={Color.white}
                    size={moderateScale(22, 0.6)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.lyrics}>
                <CustomText style={styles.text2}>
                  {` Don’t remind me. \n i’m minding my own damn business \n don’t try to find me `}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.6),
                    color: Color.mediumGray,
                    lineHeight: 19,
                    paddingTop: moderateScale(5, 0.6),
                  }}>
                  {` i’m better left alone than in this \n it doesn’t surprise me \n do you really think that i could care`}
                </CustomText>
              </View>
            </View>
            <Card artistData={data} />
            <Card fromEvent={true} artistData={data} />

            {/* <View style={styles.lyrics_con}></View> */}

            {/* <CustomButton
              isGradient
              text={'Set Up Profile'}
              textColor={Color.white}
              width={windowWidth * 0.9}
              height={windowHeight * 0.07}
              onPress={() => {
                // setIsVisible(false);
              }}
              bgColor={Color.lightGrey}
              marginTop={windowHeight * 0.1}
              borderRadius={moderateScale(30, 0.3)}
              fontSize={moderateScale(12, 0.3)}
            /> */}
          </View>
        </ScrollView>
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
    // height: windowHeight,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  image: {
    width: '100%',
    height: '100%',
  },

  image_con: {
    height: windowHeight * 0.3,
    width: windowWidth * 0.59,
    alignSelf: 'center',
    marginBottom: moderateScale(20, 0.3),
    marginTop: windowHeight * 0.05,
    overflow: 'hidden',
    borderRadius: moderateScale(30, 0.3),
  },
  text_con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  h1: {
    fontSize: moderateScale(18, 0.3),
    color: Color.white,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: moderateScale(13, 0.3),
    color: Color.white,
  },
  btn: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    borderRadius: (windowWidth * 0.1) / 2,
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#2c2c2cff',
    justifyContent: 'center',
    alignItems: 'center',
    // iOS Shadow
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
  devices_Con: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(20, 0.3),
  },
  dec1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  h3: {
    fontSize: moderateScale(14, 0.3),
    color: Color.white,
  },

  h4: {
    fontSize: moderateScale(12, 0.3),
    color: Color.white,
  },
  h5: {
    fontSize: moderateScale(15, 0.3),
    color: Color.white,
    paddingTop: moderateScale(4, 0.6),
  },
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
    // backgroundColor: 'red',
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
  player_btn: {
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    // backgroundColor: 'red',
  },
});

export default PlaylistScreen;
