import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomImage from './CustomImage';
import TitleWithDescription from './TitleWithDescription';
import { Icon } from 'native-base';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import SongListTile from './SongListTile';
import SearchContainer from './SearchContainer';
import navigationService from '../navigationService';
import { State } from 'react-native-gesture-handler';
import TrackPlayer, {
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  RepeatMode
} from 'react-native-track-player';
import { setupPlayer, playPlaylist, playSingleTrack } from './MusicPlayerController';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import { baseUrl } from '../Config';

const PlayList = ({ data, trackData, isSearch, isViewAll, title, from }) => {
  // console.log('trackData==================================', trackData)
  const token = useSelector(state => state.authReducer.token);
  const [search, setSearch] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState('');
  const [songsListArray, setSongsListArray] = useState([])

  // console.log('trackDatatrackDatatrackDatatrackDatatrackData', trackData)

  const songsList = [
    {
      id: '1',
      image: require('../Assets/Images/bottom.png'),
      title: 'Someone to Be Around',
      type: 'song | Six60',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      duration: 402,
    },
    {
      id: '2',
      image: require('../Assets/Images/recent1.png'),
      title: 'Miss You',
      type: 'song | Oliver Tree',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      // url: 'https://www.zedge.net/notification-sounds/a03bfc80-eb9c-4fb6-84ec-c3940f10bc0a',
    },
    {
      id: '3',
      image: require('../Assets/Images/artist1.png'),
      title: "Don't remind me i'm minding me",
      type: 'playlist | PlaylistM7',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '4',
      image: require('../Assets/Images/recent2.png'),
      title: 'Mega Hit Mix',
      type: 'playlist | Spotify',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '5',
      image: require('../Assets/Images/recent3.png'),
      title: 'One Kiss (With Dua Lipa)',
      type: 'song | Calvin Harris',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '6',
      image: require('../Assets/Images/recent4.png'),
      title: 'Heather',
      type: 'song | Conan Gray',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '7',
      image: require('../Assets/Images/release2.png'),
      title: 'Catching Feelings',
      type: 'song | Calvin Harris',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '8',
      image: require('../Assets/Images/release3.png'),
      title: "Don't Forget Your Roots - 2021",
      type: 'playlist | PlaylistM7',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    },
    {
      id: '9',
      image: require('../Assets/Images/release4.png'),
      title: 'Before You Leave',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
      type: 'song | Conan Gray',
    },
  ];


  const Songdata = async () => {
    const url = 'auth/track-list'
    const response = await Get(url, token)
    // console.log('response====================== >>>>>>> here from playlist', JSON.stringify(response?.data, null, 2));
    if (response?.status) {
      setSongsListArray(response?.data)
    }
  }



  useEffect(() => {
    async function init() {
      await setupPlayer();
    }
    playPlaylist(songsListArray)
    init();
    Songdata()
  }, []);




  return (
    <View style={[styles.container, from != 'home' && {

      backgroundColor: '#282C30',
      elevation: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 10,
        height: 40,
      },
      shadowOpacity: 0.45,
      shadowRadius: 40,
    }]}>
      {isSearch && <SearchContainer
        placeholder={'Find in Playlist'}
        data={search}
        setData={setSearch}
        input
      />}
      {
        title && <CustomText style={[styles.title, {
          // color: Color.white,

          fontSize: from == 'home' ? moderateScale(20, .6) : moderateScale(15, .6),
        }]}>
          {title}
        </CustomText>
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        // scrollEnabled={false}
        data={trackData}
        contentContainerStyle={[styles.contentContainer]}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          // console.log('item====================== >>>>>>> item from playlist', `${baseUrl}/storage/${item?.audio_file}`);
          return (
            <SongListTile

              onPress={() => {
                navigationService.navigate('PlaylistScreen', {
                  item: item,
                  allTracks: trackData
                });
              }}
              image={{ uri: `${baseUrl}/storage/${item?.cover_image}` }}
              title={item?.title}
              subtitle={item?.description?.length > 0 ? item?.description : ''}
              showMoreOption={true}
              from={from}
            />
          );
        }}
      />
    </View>
  );
};

export default PlayList;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    alignItems: 'center',
    gap: verticalScale(12),
    borderRadius: moderateScale(30, 0.2),
    marginTop: verticalScale(10),
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(15),

  },
  contentContainer: {
    paddingBottom: scale(15),

  },
  heading: {
    fontSize: moderateScale(14, 0.2),
    color: Color.white,
    paddingVertical: verticalScale(10),
  },
  title: {
    color: Color.white,
    alignSelf: 'flex-start',
    paddingHorizontal: scale(10),
    paddingTop: moderateScale(10, .2)
  }
});
