import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
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
import MusicModal from './MusicModal';

const PlayList = ({ data, trackData, isSearch, isViewAll, title, from }) => {

  const token = useSelector(state => state.authReducer.token);
  const [search, setSearch] = useState('');
  const [trackTitle, setTrackTitle] = useState('');
  const [isPlaying, setIsPlaying] = useState('');
  const [songsListArray, setSongsListArray] = useState([])
  const rbRef = useRef(null)





  const Songdata = async () => {
    const url = 'auth/track-list'
    const response = await Get(url, token)
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

          fontSize: from == 'home' ? moderateScale(20, .6) : moderateScale(15, .6),
        }]}>
          {title}
        </CustomText>
      }
      <FlatList
        showsVerticalScrollIndicator={false}
        data={trackData}
        contentContainerStyle={[styles.contentContainer]}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => {
          console.log('item====================== >>>>>>> item from playlist', `${baseUrl}/storage/${item?.cover_image_path}`);
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
              rbRef={rbRef}
            />
          );
        }}
      />
      <MusicModal
        rbRef={rbRef}
        isPlayButton={true}
        // track={activeSong}
        playFromHome={isPlaying}
        setPlayFromHome={setIsPlaying}
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
