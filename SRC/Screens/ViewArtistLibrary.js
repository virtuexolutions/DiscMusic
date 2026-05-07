import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import ArtistAboutInfo from '../Components/ArtistAboutInfo'
import CustomButton from '../Components/CustomButton'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import FeaturingList from '../Components/FeaturingList'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import { playPlaylist } from '../Components/MusicPlayerController'
import PlayList from '../Components/PlayList'
import ThemeIconButton from '../Components/ThemeIconButton'
import TitleWithDescription from '../Components/TitleWithDescription'
import { baseUrl } from '../Config'
import { windowHeight, windowWidth } from '../Utillity/utils'
import PermiumModal from '../Components/PermiumModal'
import MusicModal from '../Components/MusicModal'





const ViewArtistLibrary = (props) => {
  const [data, setData] = useState(props?.route?.params?.artistData)

  const token = useSelector(state => state.authReducer.token)
  const activeSong = useSelector(state => state.commonReducer.activeSong)

  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();
  const rbRef = useRef(null);
  const isPlaying = playbackState.state === State.Playing;

  const [featuringArtists, setFeaturingArtists] = useState([])
  const [fanAlsoLike, setFanAlsoLike] = useState([])
  const [loading, setLoading] = useState(false)

  const handleArtistClick = async (item) => {
    setLoading(true);

    try {
      const url = 'auth/artists-list';
      const response = await Get(url, token);

      let fullArtistInfo = item;

      if (response && response?.data?.data?.artists) {
        const matchingArtist = response.data.data.artists.find(a => a.id === item.id);
        if (matchingArtist) {
          fullArtistInfo = matchingArtist;
        }
      }

      setData(fullArtistInfo);
      await getFeaturingArtists();
      await getFansAlsoLike();

    } catch (err) {
      setData(item);
    } finally {
      setLoading(false);
    }
  }


  const [bgColor, setBgColor] = useState('#9e0042ff')



  const handlePlayAll = async () => {
    await playPlaylist(data?.all_tracks);

  };

  const getFeaturingArtists = async () => {
    const url = 'auth/featuring-artists'
    setLoading(true)
    const response = await Get(url, token)
    setLoading(false)
    if (response != undefined) {
      setFeaturingArtists(response?.data?.data?.artists)
    }
  }
  const getFansAlsoLike = async () => {
    const url = 'auth/recommendations/recommended-artict'
    setLoading(true)
    const response = await Get(url, token)
    setLoading(false)
    if (response != undefined) {
      setFanAlsoLike(response?.data?.data[0])
    }
  }


  useEffect(() => {
    getFeaturingArtists()
    getFansAlsoLike()
  }, [])



  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>


        <CustomHeader
          style={{
            backgroundColor: Color.transparent,
          }}
          leftIcon={true}
          showBack={true}
          text={data?.artist_name || "Artist"}
          RightIcon={true}
          dots={true}
        />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Color.white}
            style={{ marginTop: windowHeight * 0.3 }}
          />
        ) : (
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={{
            }}
            contentContainerStyle={{
              paddingBottom: verticalScale(100),
            }}
          >
            <View style={styles.info}>

              <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
                <CustomImage
                  style={styles.image}
                  source={data?.profile_image ? { uri: `${baseUrl}/storage/${data?.profile_image}` } : require("../Assets/Images/artist.png")}
                />
              </View>
              <TitleWithDescription
                style={{ alignItems: "center" }}
                titleStyle={{ fontSize: moderateScale(14, 0.2) }}
                descriptionStyle={{ fontSize: moderateScale(14, 0.2) }}
                title='7,910,613 hfh jg'
                description='Monthly Listeners'
              />
            </View>
            <View style={styles.actions}>
              <CustomButton
                isGradient
                text={'Following'}
                textColor={Color.white}
                width={windowWidth * 0.4}
                height={windowHeight * 0.05}
                onPress={() => { }}
                style={{ marginRight: scale(25), }}
                borderRadius={windowWidth / 2}
                fontSize={moderateScale(16, 0.3)}

              />
              <ThemeIconButton
                onPress={() => {
                  rbRef.current.open();
                }}
                isGradient
                gradientColors={Color.themeGradient}
                iconName={"dots-three-vertical"}
              />
              <ThemeIconButton
                onPress={() => {
                  rbRef.current.open();
                }}
                isGradient={true}
                gradientColors={Color.themeGradient}
                iconSource={require("../Assets/Images/shuffle.png")}
              />
              <ThemeIconButton
                onPress={() => {
                  if (isPlaying) {
                    TrackPlayer.pause();
                  } else {
                    handlePlayAll();
                  }
                }}
                isGradient={true}
                gradientColors={Color.themeGradient2}
                iconSource={isPlaying ? require("../Assets/Images/pause.png") : require("../Assets/Images/play-circle.png")}
              />
            </View>
            {(data?.track_categories?.most_popular || data?.track_categories?.top_tracks) && <PlayList trackData={data?.track_categories?.most_popular ? data?.track_categories?.most_popular : data?.track_categories?.top_tracks} title={'top hits'} isSearch={false} isViewAll={false} />}
            {![undefined, [], null].includes(data?.track_categories?.recently_released) && <PlayList trackData={data?.track_categories?.recently_released} title={'new Rleases'} isSearch={false} isViewAll={false} />}
            {data?.all_tracks && <PlayList trackData={data?.all_tracks} title={'all tracks'} isSearch={false} isViewAll={false} />}


            <FeaturingList data={featuringArtists} title={'featuring artists'} onArtistPress={handleArtistClick} />
            <ArtistAboutInfo data={data} />
          </ScrollView>
        )}
        {activeSong && <MinimisedPlayer
          data={data}
          style={styles.player}
        />}
        <MusicModal rbRef={rbRef} from={'album'} />
        <PermiumModal rbRef={rbRef} from={'shuffle'} />

      </ImageBackground >
    </>
  )
}

export default ViewArtistLibrary

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },
  info: {
    alignItems: "center",
  },
  imageContainer: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    borderRadius: (windowWidth * 0.18) / 2,
    overflow: 'hidden',
    elevation: 16,
    shadowColor: Color.black,
    shadowRadius: (windowWidth * 0.2) / 2,
    shadowOffset: { width: 40, height: 10 },
    shadowOpacity: 0.4,
  },
  image: {
    width: "100%",
    height: "100%"
  },
  actions: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    // alignItems: "flex-end",
    justifyContent: "flex-end",
    gap: scale(10)
  },
  player: {
    paddingBottom: scale(20),
    bottom: scale(30)
  }
})