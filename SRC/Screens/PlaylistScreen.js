import { Icon, ScrollView, View } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { ImageBackground, Share, TouchableOpacity } from 'react-native';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
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
import { useLikeTrack } from '../Hooks/useLikeTrack';
import { setAtiveSong } from '../Store/slices/common';
import { useDispatch } from 'react-redux';
import MinimizedPlayer from '../Components/MinimizedPlayer';
import PlayerSliderWithActions from '../Components/playerSliderWithActions';
import MusicModal from '../Components/MusicModal';
import PermiumModal from '../Components/PermiumModal';
import RepeatButton from '../Components/RepeatButton';
import TrackList from '../Components/Tracklist';
import LyricsContainer from '../Components/LyricsContainer';
import ShuffleButton from '../Components/ShuffleButton';


const PlaylistScreen = props => {

  const data = props?.route?.params?.item;
  const artistData = props?.route?.params?.artistData;
  console.log("🚀 ~ PlaylistScreen ~ artistData:", artistData)
  const from = props?.route?.params?.from;


  // console.log("🚀 ~ PlaylistScreen ~ data:", data)
  const allTracks = props?.route?.params?.allTracks;
  const dispatch = useDispatch()
  const rbRef = useRef(null);
  const RbRef = useRef(null);
  const TracklistRef = useRef(null);

  const playbackState = usePlaybackState();
  const isPlaying = playbackState.state === State.Playing;
  const currentTrack = useActiveTrack();
  console.log("🚀 ~ PlaylistScreen ~ currentTrack:", currentTrack)
  const artistName = getArtistNameFromTrack(currentTrack);

  const [lyrics, setLyrics] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const TrackObj = data;
  // console.log("🚀 ~ PlaylistScreen ~ TrackObj:", `${baseUrl}/storage/${TrackObj?.audio_file}`)
  const { toggleLike, loading: likeLoading, isLiked } = useLikeTrack(TrackObj);
  useEffect(() => {
    if (data && allTracks) {
      playPlaylistFromTrack(allTracks, data);
      dispatch(setAtiveSong(data))

    } else if (data) {
      playPlaylist(data);
      dispatch(setAtiveSong(data))
    }
  }, [data?.id]);

  useEffect(() => {
    const errorListener = TrackPlayer.addEventListener('playback-error', error => {
      console.error('Playback error:', error);
    });

    return () => errorListener.remove();
  }, []);

  useEffect(() => {
    // console.log('data====================== >>>>>>> here from playlist screen', data?.artist?.name, data?.title);
    const fetchLyrics = async () => {
      // Input check: agar artist ya song missing ho toh call na karein
      // if (!data?.artist || !data?.url) return;

      setLoading(true);
      setError(null);

      try {
        // console.log('track====================== >>>>>>> here from try ,');
        const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(data?.artist?.name)}&track_name=${encodeURIComponent(data?.title)}`;
        const response = await fetch(url);
        // console.log("reeeeeeeeeeeeeeeeeeeeesssssssssssssssssponnnnnnnnnnnse", response)

        if (!response.ok) {
          throw new Error("Sorry, lyrics are not available at the moment.");
        }

        const lyricsdata = await response.json();
        setLyrics(lyricsdata.syncedLyrics || lyricsdata.plainLyrics || "Sorry, lyrics are not available at the moment.");
      } catch (err) {
        setError(err.message);
        setLyrics("");
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();

    // Dependency array mein artist aur song daalna zaroori hai
  }, [data?.artist?.name, data?.title]);

  const onShare = async () => {
    console.log('🚀 ~ aaaaaaaaaaaaaaaaaaaaaaaaa onShare ~ data:', data)
    const shareUrl = `${baseUrl}/track/details/${data?.id}`;
    try {
      console.log('🚀 ~ onShare ~ shareUrl:', shareUrl);
      const result = await Share.share({
        // message: 'Hello from React Native!',
        // message: `${baseUrl}/${item?.id}`,
        message: shareUrl,
      });
      if (result.action === Share.sharedAction) {
        // linking;
        console.log('here is url which is im sharing to the other', shareUrl);

        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
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
          rbref={rbRef}
          fromPlaylist={true}
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
            paddingBottom: moderateScale(125, 0.6),
          }}
          style={{
            width: '100%',
            // flexGrow: 0,
            // backgroundColor: 'red'
          }}>
          <View style={styles.container}>

            <View style={styles.image_con}>
              <CustomImage
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={currentTrack ? { uri: `${baseUrl}/storage/${currentTrack?.cover_image}` } : data?.cover_image ? { uri: `${baseUrl}/storage/${data?.cover_image}` } : require('../Assets/Images/playlist_image.png')}
              />
            </View>
            <View style={styles.text_con}>
              <View>
                <CustomText style={styles.h1}>{currentTrack?.title || 'Unknown Title'}</CustomText>
                <CustomText style={styles.h2}>
                  {artistName}
                </CustomText>
              </View>
              <TouchableOpacity
                style={{ padding: 5, borderRadius: 5, paddingHorizontal: moderateScale(10, 0.6) }}
                onPress={toggleLike}
                disabled={likeLoading}
              >
                <Icon
                  style={{ alignSelf: 'center' }}
                  color={isLiked ? Color.red : Color.white}
                  size={moderateScale(20, 0.6)}
                  name={isLiked ? "heart" : "hearto"}
                  as={AntDesign}
                />
              </TouchableOpacity>

            </View>
            <AudioSlider width={windowWidth * 0.9} />
            <View style={styles.player_btn}>

              <ShuffleButton iconSize={moderateScale(20, 0.2)} />
              {/* <TouchableOpacity
                onPress={() => {
                  RbRef.current.open()
                }}
                style={styles.btn}>
                <Icon
                  name="shuffle"
                  as={Entypo}
                  color={Color.white}
                  size={moderateScale(13, 0.6)}
                />
              </TouchableOpacity> */}
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
              <RepeatButton
                onPress={() => {
                  console.log("repeat mode",);
                }} style={styles.btn}
              />
              {/* <TouchableOpacity

                onPress={() => {
                  console.log("repeat mode",);
                }} style={styles.btn}
                >
                <Icon
                  name="loop"
                  as={MaterialIcons}
                  color={Color.white}
                  size={moderateScale(13, 0.6)}
                />
              </TouchableOpacity> */}
            </View>
            {/* <View style={styles.devices_Con}>
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
            </View> */}
            <View style={styles.lyrics_con}>
              <View style={styles.lyrics_Header}>
                <TouchableOpacity
                  onPress={
                    () => {
                      onShare()
                      // Share.share({ message: `Listen to ${data?.title || 'this song'} on DiscMusic!` });
                    }
                  } style={styles.header_btn}>
                  <View style={styles.header_image}>
                    <CustomImage
                      onPress={
                        () => {
                          onShare()
                        }
                      }
                      style={{
                        height: '100%',
                        width: '100%',
                      }}
                      source={require('../Assets/Images/share.png')}
                    />
                  </View>
                </TouchableOpacity>
                <CustomText style={styles.h5}>Lyrics </CustomText>
                <TouchableOpacity
                  onPress={() => {
                    TracklistRef?.current.open();
                  }}
                  style={styles.header_btn}>
                  <Icon
                    name="filter-sharp"
                    as={Ionicons}
                    color={Color.white}
                    size={moderateScale(22, 0.6)}
                  />
                </TouchableOpacity>
              </View>
              <LyricsContainer lyrics={lyrics} height={windowHeight * 0.3} from={'playlist'} />
              {/* <View style={styles.lyrics}>
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
              </View> */}
            </View>
            {from != 'notification' && <Card artistData={data} data={artistData} />}
            {/* <Card fromEvent={true} artistData={data} /> */}

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
            <MusicModal rbRef={rbRef} track={TrackObj} />
            <PermiumModal rbRef={RbRef} />
            <TrackList items={allTracks} rbRef={TracklistRef} />
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
    height: windowWidth * 0.8,
    marginTop: moderateScale(30, 0.3),
    borderRadius: moderateScale(20, 0.3),
    marginRight: moderateScale(10, 0.3),
    backgroundColor: '#2c2c2cff',
    // justifyContent: 'center',
    paddingTop: moderateScale(15, 0.3),
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
    elevation: 8,
  },
  lyrics: {
    backgroundColor: '#191b1dff',
    // height: '72%',
    borderRadius: moderateScale(20, 0.6),
    width: '100%',
    paddingVertical: moderateScale(15, 0.6),
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
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  player_btn: {
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    width: '95%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default PlaylistScreen;
