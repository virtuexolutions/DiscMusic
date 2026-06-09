import { Avatar, KeyboardAvoidingView, ScrollView } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ImageBackground, Platform, StyleSheet, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useActiveTrack } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import CarouselView from '../Components/CarouselView';
import CircularMenu from '../Components/CircularMenu';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import EventCard from '../Components/EventCard';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import PlayList from '../Components/PlayList';
import RecommendedArtist from '../Components/RecommendedArtist';
import TitleWithDescription from '../Components/TitleWithDescription';
import TrendingView from '../Components/TrendingView';
import { windowHeight, windowWidth } from '../Utillity/utils';
import BestArtistCard from './BestArtistCard';
import { baseUrl } from '../Config';





const HomeScreen = () => {
  const token = useSelector(state => state.authReducer.token)
  // console.log('first ========================== >>tokentokentokentoken', token)
  const playbackSettingsState = useSelector(state => state.commonReducer.playbackSettings) || {};
  // console.log("🚀 ~ HomeScreen ~ playbackSettingsState:", playbackSettingsState)
  const user = useSelector(state => state.commonReducer.userData)
  const activeSong = useSelector(state => state.commonReducer.activeSong)

  const activeTrack = useActiveTrack()
  const dispatch = useDispatch()

  const [Loading, setLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null);
  const [events, setEvents] = useState([])
  const [artist, setArtist] = useState([])
  const [recommendedArtist, setRecommendedArtist] = useState([])
  const [bestArtist, setBestArtist] = useState([])
  const [trending, setTrending] = useState([])
  // console.log("🚀 ~ HomeScreen ~ trending:", trending)





  const getWeather = async (lat, lon) => {
    // return console.log('ppppppppppppppppppppppppppppp', lat, lon)
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data, 'data')
      return data.current_weather;
    } catch (error) {
      // console.log(error);
    }
  };


  const getArtist = async () => {
    const url = 'auth/artists-list'
    // setLoading(true)
    const response = await Get(url, token)
    // return console.log('......................... auth/artists-listauth/artists-listauth/artists-listauth/artists-list', JSON.stringify(response?.data?.data, null, 2))
    // setLoading(false)
    if (response != undefined) {
      setArtist(response?.data?.data?.artists)
    }
  }
  const getEvents = async () => {
    const url = 'auth/events-list'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log(JSON.stringify(response?.data, null, 2), '------------------ >>>>event response ')
    setLoading(false)
    if (response != undefined) {
      setEvents(response?.data?.event_list)
    }
  }


  const getRecommendedArtist = async () => {
    const url = 'auth/recommendations/recommended-artist'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>> recommended artist response ', JSON.stringify(response?.data?.data, null, 2), '------------------ >>>>> recommended artist response ')
    setLoading(false)
    if (response != undefined) {
      setRecommendedArtist(response?.data?.data)
    }
  }
  const getBestArtist = async () => {
    const url = 'auth/recommendations/best-artists'
    setLoading(true)
    const response = await Get(url, token)
    console.log("🚀 ~ getBestArtist ~ response:", JSON.stringify(response?.data?.data, null, 2))
    setLoading(false)
    if (response != undefined) {
      setBestArtist(response?.data?.data)
    }
  }


  const getTrendingTracks = async () => {
    const url = 'auth/trending-tracks'
    setLoading(true)
    const response = await Get(url, token)
    // console.log("🚀 ~ getTrendingTracks ~ response:", response?.data?.data?.tracks)
    setLoading(false)
    if (response != undefined) {
      setTrending(response?.data?.data?.tracks)
    }
  }

  useEffect(() => {
    getArtist()
    getEvents()
    getRecommendedArtist()
    getBestArtist()
    getTrendingTracks()

  }, [])
  const rawData = recommendedArtist[0];

  const formattedData = rawData?.map(obj => {
    const key = Object.keys(obj)[0];
    const section = obj[key];

    return {
      type: key,
      title: section?.title,
      items: section?.items || [],
      image: section?.items?.[0]?.cover_image || null,
    };
  }).filter(item => item.items.length > 0);

  // console.log("🚀 ~ HomeScreen ~ formattedData:", JSON.stringify(formattedData, null, 2))
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
        <CustomHeader RightIcon dots />
        {Loading ? <ActivityIndicator style={{ height: windowHeight * 0.8, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={Color.white} /> :
          // <KeyboardAvoidingView
          //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            contentContainerStyle={{
              alignItems: 'center',
              paddingBottom: activeSong ? moderateScale(190, .6) : moderateScale(120, 0.2),
            }}>
            <TrendingView
              trackData={trending.filter(song => !(song.is_explicit && !playbackSettingsState?.explicit))}
              from={'home'}
            />

            <View style={{
              marginTop: moderateScale(20, .6),
              height: windowHeight * 0.255
            }}>
              <PlayList title={'Trending'} trackData={trending.filter(song => !(song.is_explicit && !playbackSettingsState?.explicit))} from={'home'} />
            </View>


            <View style={[styles.caroselContainer, {
              marginTop: moderateScale(50, .6)
            }]}>
              <CustomText style={styles.heading}>Artists</CustomText>
              <CarouselView data={artist}
              />
            </View>
            <View style={[styles.eventListContainer]}>
              <CustomText style={styles.heading}>Events</CustomText>
              <FlatList
                horizontal
                data={events}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: moderateScale(25, 0.6),
                }}
                renderItem={({ item, index }) => {
                  return <EventCard data={item} />;
                }}
              />
            </View>
            <View style={[styles.eventListContainer]}>
              <CustomText style={styles.heading}>recommended songs</CustomText>
              <FlatList
                horizontal
                data={formattedData}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: moderateScale(25, 0.6),
                }}
                renderItem={({ item, index }) => {
                  const key = Object.keys(item)[0]


                  return (<RecommendedArtist
                    from={'home'}
                    item={item}
                    // API mein images 'profile_image' key mein hain
                    image={item.image}
                    title={item.title}
                  />)
                  //     < RecommendedArtist from={'home'} item={section} title={section?.title
                  // } image={section?.image} index={index} />

                }} />
            </View>
            <View style={styles.eventListContainer}>
              <CustomText style={styles.heading}>best artist</CustomText>

              <FlatList
                horizontal
                data={bestArtist}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: moderateScale(20, .6),
                  paddingRight: moderateScale(25, 0.6),
                }}
                renderItem={({ item, index }) => {
                  // console.log('======================== >>>>>>>>>', JSON.stringify(`${baseUrl} /storage/${item?.profile_image} `, null, 2))
                  return <BestArtistCard from={'home'} item={item} index={index} />

                }} />


            </View>
            {/* <CustomImage
            style={{ marginTop: verticalScale(20) }}
            source={require('../Assets/Images/list.png')}
          /> */}
            {/* <CircularMenu containerStyle={styles.circularButton} />
          <View style={styles.bottomContainer}>
            <Avatar source={require('../Assets/Images/song1.png')} />
            <TitleWithDescription
              title={'Don’t Forget Your Roots'}
              description="2025"
              titleStyle={styles.text}
              descriptionStyle={styles.text}
            />
          </View> */}
            {/* <MinimisedPlayer /> */}
          </ScrollView>
        }
        {/* </KeyboardAvoidingView> */}
        {activeSong && <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.25 }} />}
      </ImageBackground >
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bg_container: {
    backgroundColor: 'green',
    width: windowWidth,
    height: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  main_view: {
    marginVertical: moderateScale(40, 0.6),
  },
  eventListContainer: {
    width: windowWidth,
    marginLeft: moderateScale(26, 0.6),
    // paddingHorizontal: scale(10),
  },
  heading: {
    fontSize: moderateScale(20, 0.6),
    color: Color.white,
    paddingVertical: moderateScale(10, 0.6),
  },
  catgoryListContainer: {
    height: windowHeight * 0.25,
    gap: scale(10),
  },
  category_view: {
    width: windowWidth * 0.2,
    padding: moderateScale(10, 0.6),
    borderWidth: 1,
    borderColor: Color.veryLightGray,
    marginRight: moderateScale(10, 0.6),
    marginBottom: moderateScale(10, 0.6),
    borderRadius: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  category_text: {
    fontSize: moderateScale(11, 0.6),
    color: Color.veryLightGray,
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: scale(10),
    alignItems: 'center',
    width: windowWidth * 0.85,
    marginTop: verticalScale(20),
    // paddingVertical:verticalScale(1),
    paddingHorizontal: scale(10),
    // backgroundColor: 'red',
    backgroundColor: Color.black,
    borderRadius: moderateScale(18, 0.2),
  },
  caroselContainer: {
    height: windowHeight * 0.2,
    alignItems: 'center',
    gap: verticalScale(7),
  },
  text: {
    color: Color.white,
    fontSize: moderateScale(14, 0.2),
  },
  circularButton: {
    bottom: scale(-120),
    zIndex: 1,
  },
});
