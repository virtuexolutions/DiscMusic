import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomImage from '../Components/CustomImage'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import TitleWithDescription from '../Components/TitleWithDescription'
import CustomButton from '../Components/CustomButton'
import ThemeIconButton from '../Components/ThemeIconButton'
import PopularSongs from '../Components/PopularSongs'
import PopularReleases from '../Components/PopularReleases'
import FeaturingList from '../Components/FeaturingList'
import FansLikedList from '../Components/FansLikedList'
import ArtistAboutInfo from '../Components/ArtistAboutInfo'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import PlayList from '../Components/PlayList'
import { baseUrl, imageUrl } from '../Config'
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { Get } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { playPlaylist } from '../Components/MusicPlayerController'
import { Vibrant } from 'node-vibrant/browser'
import LinearGradient from 'react-native-linear-gradient'



const ViewArtistLibrary = (props) => {
  const data = props?.route?.params?.artistData
  const token = useSelector(state => state.authReducer.token)
  const playbackState = usePlaybackState();
  const activeTrack = useActiveTrack();
  console.log('activeTrack', JSON.stringify(activeTrack, null, 2))
  const isPlaying = playbackState.state === State.Playing;

  // console.log(JSON.stringify(data, null, 2), '------------------ >>>>> data')
  const [featuringArtists, setFeaturingArtists] = useState([])
  const [fanAlsoLike, setFanAlsoLike] = useState([])
  const [loading, setLoading] = useState(false)



  const handlePlayAll = async () => {
    // if (isPlayerReady) {
    await playPlaylist(data?.all_tracks);
    // }
  };
  // const track = useActiveTrack();
  // // // console.log('track====================== >>>>>>> here from minimised player', track);
  // // // 2. Get the current playback state (playing/paused)
  // const playbackState = usePlaybackState();

  // // // If no track is playing, don't show the bar
  // if (!track) return null;

  // const isPlaying = playbackState.state === State.Playing;

  // const togglePlayback = async () => {
  //   if (isPlaying) { 
  //     await TrackPlayer.pause();
  //   } else {
  //     await TrackPlayer.play();
  //   }
  // };

  const getFeaturingArtists = async () => {
    const url = 'auth/featuring-artists'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>> featuring artists response ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> featuring artists response ')
    setLoading(false)
    if (response != undefined) {
      setFeaturingArtists(response?.data?.data?.artists)
    }
  }
  const getFansAlsoLike = async () => {
    const url = 'auth/recommendations/recommended-artict'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>> featuring artists response ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> featuring artists response ')
    setLoading(false)
    if (response != undefined) {
      setFanAlsoLike(response?.data?.data[0])
    }
  }


  const [bgColor, setBgColor] = useState('#9e0042ff')
  console.log('------------------ >>>>> bgColor ', bgColor)

  useEffect(() => {
    getFeaturingArtists()
    getFansAlsoLike()
  }, [])

  useEffect(() => {
    const fetchColor = async () => {
      console.log('------------------ >>>>> fullImageUrl ', '------------------ >>>>>   fullImageUrl ')
      if (data?.profile_image) {
        try {
          const fullImageUrl = `${imageUrl}${data?.profile_image}`
          const palette = await Vibrant.from(fullImageUrl).getPalette()
          const color = palette?.LightVibrant?.hex || palette?.Vibrant?.hex || '#ffbcbfff'
          setBgColor(color)
        } catch (error) {
          console.log("Color extraction error: ", error)
        }
      }
    }
    fetchColor()
  }, [data?.profile_image])

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>

        {/* <LinearGradient
          colors={[bgColor, 'transparent']}
          style={{
            height: windowHeight * 0.3,
            width: windowWidth
          }}
        > */}
        <CustomHeader
          style={{
            backgroundColor: Color.transparent,
            // marginTop: verticalScale(25),
            // bgc
          }}
          leftIcon={true}
          showBack={true}
          text={"Abhijeet"}
          RightIcon={true}
          dots={true}
        // text= 
        />
        {/* bgc */}
        {/* </LinearGradient> */}
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={{
            // backgroundColor: Color.black,
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
              title='7,910,613'
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
              // marginTop={moderateScale(20, 0
              // .3)}
              style={{ marginRight: scale(25), }}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(16, 0.3)}

            />
            <ThemeIconButton
              isGradient
              gradientColors={Color.themeGradient}
              iconName={"dots-three-vertical"}
            />
            <ThemeIconButton
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
            {/* <ThemeIconButton
              onPress={() => {
                console.log('first');
              }}
              isGradient={true}
              gradientColors={Color.themeGradient2}
              iconSource={require("../Assets/Images/pause.png")}
            /> */}
          </View>
          {(data?.track_categories?.most_popular || data?.track_categories?.top_tracks) && <PlayList trackData={data?.track_categories?.most_popular ? data?.track_categories?.most_popular : data?.track_categories?.top_tracks} title={'top hits'} isSearch={false} isViewAll={false} />}
          {![undefined, [], null].includes(data?.track_categories?.recently_released) && <PlayList trackData={data?.track_categories?.recently_released} title={'new Rleases'} isSearch={false} isViewAll={false} />}
          {data?.all_tracks && <PlayList trackData={data?.all_tracks} title={'all tracks'} isSearch={false} isViewAll={false} />}

          {/* <PopularSongs data={trackData?.top_tracks} title={'top hits'} />
          <PopularReleases data={trackData?.recently_released} title={'new Rleases'} />
          <PopularReleases data={trackData?.all_tracks} title={'all tracks'} /> */}

          <FeaturingList data={featuringArtists} title={'featuring artists'} />
          <ArtistAboutInfo data={data} />
          <FansLikedList data={featuringArtists} />
        </ScrollView>
        {activeTrack && <MinimisedPlayer
          data={data}
          style={styles.player}
        />}
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
    // paddingHorizontal:scale(5)
  },
  info: {
    alignItems: "center",
    // paddingVertical: verticalScale(20),
    // backgroundColor: 'red'
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
    // marginTop: moderateScale(30, .6)
  },
  image: {
    width: "100%",
    height: "100%"
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: scale(10)
  },
  player: {
    paddingBottom: scale(20),
    bottom: scale(30)
  }
})