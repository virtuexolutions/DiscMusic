import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
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
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import PermiumModal from '../Components/PermiumModal'
import MusicModal from '../Components/MusicModal'
import { useIsFocused } from '@react-navigation/native'
import { setFavArtist } from '../Store/slices/common'

// const ViewArtistLibrary = (props) => {
//   const [data, setData] = useState(props?.route?.params?.artistData)
//   console.log('sfgafgjkh jifgadfghadfjghhadfghhfaghhsfjghj', JSON.stringify(data, null, 2))
//   const token = useSelector(state => state.authReducer.token)
//   const userData = useSelector(state => state.commonReducer.userData)
//   const favArtist = useSelector(state => state.commonReducer.favArtist)
//   const activeSong = useSelector(state => state.commonReducer.activeSong)

//   const isFoucs = useIsFocused()
//   const playbackState = usePlaybackState();
//   const activeTrack = useActiveTrack();
//   const dispatch = useDispatch()
//   const rbRef = useRef(null);

//   const isPlaying = playbackState.state === State.Playing;
//   const [featuringArtists, setFeaturingArtists] = useState([])
//   console.log("🚀 ~ ViewArtistLibrary ~ featuringArtists:", JSON.stringify(featuringArtists, null, 2))
//   const [fanAlsoLike, setFanAlsoLike] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [isloading, setisLoading] = useState(false)
//   const [isSelected, setIsSelected] = useState({})
//   // console.log("🚀 ~ ViewArtistLibrary ~ isSelected:", isSelected)
//   // Derived: is the current artist already followed?
//   const isFollowing = Array.isArray(favArtist) &&
//     favArtist.some((item) => Number(item?.artist_id) === Number(data?.id))



//   const handleArtistClick = async (item) => {
//     setLoading(true);
//     try {
//       const url = 'auth/artists-list';
//       const response = await Get(url, token);
//       console.log("🚀 ~ handleArtistClick ~ response: fghjkkjgdshgjadgjhgdjhgjdghjjgjhfghj", JSON.stringify(response?.data?.data?.artists, null, 2))
//       let fullArtistInfo = item;
//       if (response && response?.data?.data?.artists) {
//         const matchingArtist = response.data.data.artists.find(a => a.id === item.id);
//         if (matchingArtist) {
//           fullArtistInfo = matchingArtist;
//         }
//       }
//       setData(fullArtistInfo);
//       // await getFeaturingArtists();
//     } catch (err) {
//       setData(item);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const [bgColor, setBgColor] = useState('#9e0042ff')

//   const handlePlayAll = async () => {
//     await playPlaylist(data?.all_tracks);
//   };

//   const getFeaturingArtists = async () => {
//     const url = 'auth/featuring-artists'
//     setLoading(true)
//     const response = await Get(url, token)
//     console.log("🚀 ~ getFeaturingArtists ~ response:", JSON.stringify(response?.data, null, 2))
//     setLoading(false)
//     if (response != undefined) {
//       setData(response?.data?.data?.artist)
//       setFeaturingArtists(response?.data?.data?.artists)
//     }
//   }

//   const addArtist = async () => {
//     const formatData = new FormData()
//     formatData.append('artist_id[0]', data?.id)
//     const url = 'auth/liked-artist/store'
//     setisLoading(true)
//     const response = await Post(url, formatData, apiHeader(token, true))
//     console.log('🚀 ~ addArtist ~ response:', response?.data)
//     setisLoading(false)
//     if (response != undefined) {
//       dispatch(setFavArtist(response?.data?.user_info?.liked_artist));
//     }
//   }

//   const removeArtist = async (ID) => {
//     const url = `auth/liked-artist/remove`
//     setisLoading(true)
//     const response = await Post(url, { artist_id: ID }, apiHeader(token, true))
//     console.log('🚀 ~ removeArtist ~ response:', response?.data)
//     setisLoading(false)
//     if (response != undefined) {
//       dispatch(setFavArtist(response?.data?.user_info?.liked_artist));
//     }
//   }

//   useEffect(() => {
//     getFeaturingArtists()
//   }, [isFoucs])

//   const tempData = {
//     bio: data?.bio,
//     name: data?.user?.name,
//     profile_image: data?.user?.profile_image
//   }


//   return (
//     <>
//       <CustomStatusBar
//         backgroundColor={Color.statusColor}
//         barStyle={'light-content'}
//       />
//       <ImageBackground
//         source={require('../Assets/Images/bg.png')}
//         style={styles.bg_container}>

//         <CustomHeader
//           style={{
//             backgroundColor: Color.transparent,
//           }}
//           leftIcon={true}
//           showBack={true}
//           text={data?.artist_name || "Artist"}
//           RightIcon={true}
//           dots={true}
//         />
//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color={Color.white}
//             style={{ marginTop: windowHeight * 0.3 }}
//           />
//         ) : (
//           <ScrollView
//             scrollEnabled={true}
//             showsVerticalScrollIndicator={false}
//             removeClippedSubviews={true}
//             style={{}}
//             contentContainerStyle={{
//               paddingBottom: verticalScale(100),
//             }}
//           >
//             <View style={styles.info}>
//               <View style={[styles.imageContainer, { backgroundColor: bgColor }]}>
//                 <CustomImage
//                   style={styles.image}
//                   source={data?.user?.profile_image ? { uri: `${baseUrl}/storage/${data?.user?.profile_image}` } : require("../Assets/Images/artist.png")}
//                 />
//               </View>
//               <TitleWithDescription
//                 style={{ alignItems: "center" }}
//                 titleStyle={{ fontSize: moderateScale(14, 0.2) }}
//                 descriptionStyle={{ fontSize: moderateScale(14, 0.2) }}
//                 title={data?.statistics?.monthly_listeners}
//                 description='Monthly Listeners '
//               />
//             </View>

//             <View style={styles.actions}>
//               <CustomButton
//                 onPress={() => {
//                   if (isFollowing) {
//                     console.log('=> removeArtist id:', data?.id)
//                     removeArtist(data?.id)
//                   } else {
//                     console.log('=> addArtist id:', data?.id)
//                     addArtist()
//                   }
//                 }}
//                 isGradient
//                 bgColor={isFollowing ? Color.themeGradient2 : Color.themeGradient}
//                 text={isloading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
//                 textColor={Color.white}
//                 width={windowWidth * 0.4}
//                 height={windowHeight * 0.05}
//                 style={{ marginRight: scale(25) }}
//                 borderRadius={windowWidth / 2}
//                 fontSize={moderateScale(16, 0.3)}
//               />

//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
//                 <ThemeIconButton
//                   onPress={() => {
//                     rbRef.current.open();
//                   }}
//                   isGradient={true}
//                   gradientColors={Color.themeGradient}
//                   iconSource={require("../Assets/Images/shuffle.png")}
//                 />
//                 <ThemeIconButton
//                   onPress={() => {
//                     if (isPlaying) {
//                       TrackPlayer.pause();
//                     } else {
//                       handlePlayAll();
//                     }
//                   }} s
//                   isGradient={true}
//                   gradientColors={Color.themeGradient2}
//                   iconSource={isPlaying ? require("../Assets/Images/pause.png") : require("../Assets/Images/play-circle.png")}
//                 />
//               </View>
//             </View>

//             {/* {(data?.track_categories?.most_popular || data?.track_categories?.top_tracks) && <PlayList trackData={data?.track_categories?.most_popular ? data?.track_categories?.most_popular : data?.track_categories?.top_tracks} title={'top hits'} isSearch={false} isViewAll={false} />}
//             {![undefined, [], null].includes(data?.track_categories?.recently_released) && <PlayList trackData={data?.track_categories?.recently_released} title={'new Rleases'} isSearch={false} isViewAll={false} />} */}
//             {data?.tracks && <PlayList trackData={data?.tracks} isSearch={false} isViewAll={false} from={'home'} artistData={tempData} />}

//             <FeaturingList
//               data={featuringArtists}
//               setIsSelected={setIsSelected} title={'featuring artists'}
//             // onArtistPress={handleArtistClick}
//             />
//             <ArtistAboutInfo data={data} />
//           </ScrollView>
//         )}
//         {activeSong && <MinimisedPlayer
//           data={data}
//           style={styles.player}
//         />}
//         <MusicModal rbRef={rbRef} from={'album'} />
//         <PermiumModal rbRef={rbRef} from={'shuffle'} />

//       </ImageBackground>
//     </>
//   )
// }
const ViewArtistLibrary = (props) => {
  const [data, setData] = useState(props?.route?.params?.artistData)
  const token = useSelector(state => state.authReducer.token)
  const favArtist = useSelector(state => state.commonReducer.favArtist)
  const activeSong = useSelector(state => state.commonReducer.activeSong)

  const isFoucs = useIsFocused()
  const playbackState = usePlaybackState();
  const dispatch = useDispatch()
  const rbRef = useRef(null);

  const isPlaying = playbackState.state === State.Playing;
  const [featuringArtists, setFeaturingArtists] = useState([])
  const [loading, setLoading] = useState(false)
  const [isloading, setisLoading] = useState(false)
  const [isSelected, setIsSelected] = useState({})

  // ✅ initial params data save karo - kabhi override nahi hoga
  const originalData = useRef(props?.route?.params?.artistData)

  const isFollowing = Array.isArray(favArtist) &&
    favArtist.some((item) => Number(item?.artist_id) === Number(data?.id))

  // ✅ Featuring artist click - artists-list se match karke full data set karo
  const handleArtistClick = async (item) => {
    setLoading(true);
    try {
      const url = 'auth/artists-list';
      const response = await Get(url, token);
      let fullArtistInfo = item;
      if (response?.data?.data?.artists) {
        const matchingArtist = response.data.data.artists.find(a => a.id === item.id);
        if (matchingArtist) {
          fullArtistInfo = matchingArtist;
        }
      }
      setData(fullArtistInfo); // ✅ clicked artist show hoga
    } catch (err) {
      setData(item); // fallback
    } finally {
      setLoading(false);
    }
  }

  const handlePlayAll = async () => {
    await playPlaylist(data?.tracks || data?.all_tracks);
  };

  // ✅ FIX: setData REMOVE - sirf featuringArtists set karo
  const getFeaturingArtists = async () => {
    const url = 'auth/featuring-artists'
    setLoading(true)
    const response = await Get(url, token)
    console.log("featuring response:", JSON.stringify(response?.data, null, 2))
    setLoading(false)
    if (response != undefined) {
      // ❌ setData(response?.data?.data?.artist)  --> REMOVED - params data override hota tha
      setFeaturingArtists(response?.data?.data?.artists || [])
    }
  }

  // ✅ FIX: useEffect mein data reset karo params se - featuring API data override na kare
  useEffect(() => {
    setData(originalData.current) // params wala data restore karo
    getFeaturingArtists()
  }, [isFoucs])

  const addArtist = async () => {
    const formatData = new FormData()
    formatData.append('artist_id[0]', data?.id)
    const url = 'auth/liked-artist/store'
    setisLoading(true)
    const response = await Post(url, formatData, apiHeader(token, true))
    setisLoading(false)
    if (response != undefined) {
      dispatch(setFavArtist(response?.data?.user_info?.liked_artist));
    }
  }

  const removeArtist = async (ID) => {
    const url = `auth/liked-artist/remove`
    setisLoading(true)
    const response = await Post(url, { artist_id: ID }, apiHeader(token, true))
    setisLoading(false)
    if (response != undefined) {
      dispatch(setFavArtist(response?.data?.user_info?.liked_artist));
    }
  }

  const tempData = {
    bio: data?.bio,
    name: data?.user?.name,
    artist_name: data?.artist_name,
    profile_image: data?.profile_image || data?.user?.profile_image
  }

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
          style={{ backgroundColor: Color.transparent }}
          leftIcon={true}
          showBack={true}
          text={data?.artist_name || data?.user?.name || "Artist"}
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
            contentContainerStyle={{ paddingBottom: verticalScale(100) }}
          >
            <View style={styles.info}>
              <View style={[styles.imageContainer]}>
                <CustomImage
                  style={styles.image}
                  source={
                    (data?.profile_image || data?.user?.profile_image)
                      ? { uri: `${baseUrl}/storage/${data?.profile_image || data?.user?.profile_image}` }
                      : require("../Assets/Images/artist.png")
                  }
                />
              </View>
              <TitleWithDescription
                style={{ alignItems: "center" }}
                titleStyle={{ fontSize: moderateScale(14, 0.2) }}
                descriptionStyle={{ fontSize: moderateScale(14, 0.2) }}
                title={data?.statistics?.monthly_listeners || data?.likes_count || 0}
                description='Monthly Listeners'
              />
            </View>

            <View style={styles.actions}>
              <CustomButton
                onPress={() => {
                  if (isFollowing) {
                    removeArtist(data?.id)
                  } else {
                    addArtist()
                  }
                }}
                isGradient
                bgColor={isFollowing ? Color.themeGradient2 : Color.themeGradient}
                text={isloading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                textColor={Color.white}
                width={windowWidth * 0.4}
                height={windowHeight * 0.05}
                style={{ marginRight: scale(25) }}
                borderRadius={windowWidth / 2}
                fontSize={moderateScale(16, 0.3)}
              />

              <View style={{ flexDirection: 'row', alignItems: 'center', gap: scale(10) }}>
                <ThemeIconButton
                  onPress={() => rbRef.current.open()}
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
                  iconSource={isPlaying
                    ? require("../Assets/Images/pause.png")
                    : require("../Assets/Images/play-circle.png")
                  }
                />
              </View>
            </View>

            {data?.tracks?.length > 0 && (
              <PlayList
                trackData={data?.tracks}
                isSearch={false}
                isViewAll={false}
                from={'home'}
                artistData={tempData}
              />
            )}

            {/* ✅ FIX: onArtistPress uncomment - click pe handleArtistClick chalega */}
            <FeaturingList
              data={featuringArtists}
              setIsSelected={setIsSelected}
              title={'featuring artists'}
              onArtistPress={handleArtistClick}  // ✅ uncomment kiya
            />

            <ArtistAboutInfo data={data} />
          </ScrollView>
        )}

        {activeSong && <MinimisedPlayer data={data} style={styles.player} />}
        <MusicModal rbRef={rbRef} from={'album'} />
        <PermiumModal rbRef={rbRef} from={'shuffle'} />

      </ImageBackground>
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
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: scale(65),
    paddingRight: scale(10)
  },
  player: {
    paddingBottom: scale(20),
    bottom: scale(30)
  }
})