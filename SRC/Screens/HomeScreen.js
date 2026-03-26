import { ActivityIndicator, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Avatar, ScrollView } from 'native-base';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import TrendingView from '../Components/TrendingView';
import EventCard from '../Components/EventCard';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import CircularMenu from '../Components/CircularMenu';
import CustomImage from '../Components/CustomImage';
import TitleWithDescription from '../Components/TitleWithDescription';
import CarouselView from '../Components/CarouselView';
import Animated from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform } from 'react-native';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { AnimatedCard } from '../Components/DetailedCard';
import RecommendedArtist from '../Components/RecommendedArtist';
import BestArtistCard from './BestArtistCard';
import { baseUrl } from '../Config';
import PlayList from '../Components/PlayList';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import { useActiveTrack } from 'react-native-track-player';

const HomeScreen = () => {
  const token = useSelector(state => state.authReducer.token)
  const activeTrack = useActiveTrack()
  console.log('activeTrack==================================== >>>>>>>>>>>>> activeTrack', activeTrack)

  const [Loading, setLoading] = useState(false)
  const [currentLocation, setCurrentLocation] = useState(null);
  const [events, setEvents] = useState([])
  const [artist, setArtist] = useState([])
  const [recommendedArtist, setRecommendedArtist] = useState([])
  const [bestArtist, setBestArtist] = useState([])
  const [trending, setTrending] = useState([])
  // console.log('recommendedArtist', JSON.stringify(recommendedArtist, null, 2), 'recommendedArtist')
  // console.log(JSON.stringify(events, null, 2), 'events')



  // const getCurrentLocation = async () => {
  //   try {
  //     const position = await new Promise((resolve, reject) => {

  //       Geolocation.getCurrentPosition(
  //         position => {
  //           console.log(position, 'position')
  //           const coords = {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           };
  //           getWeather(position?.coords?.latitude, position?.coords?.longitude);
  //           resolve(coords);

  //         },
  //         error => {
  //           reject(new Error(error.message));
  //         },
  //         {
  //           enableHighAccuracy: true,
  //           timeout: 15000,
  //           maximumAge: 10000,
  //         },
  //       );
  //     });
  //     // console.log(weather, 'weather')
  //   } catch (error) {
  //     console.error('Error getting location:', error);
  //     throw error;
  //   }
  // };

  const getWeather = async (lat, lon) => {
    // return console.log('ppppppppppppppppppppppppppppp', lat, lon)
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, 'data')
      return data.current_weather;
    } catch (error) {
      console.log(error);
    }
  };


  const getArtist = async () => {
    const url = 'auth/artists-list'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>response artist', JSON.stringify(response?.data, null, 2), '------------------ >>>>response artist')
    setLoading(false)
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
    const url = 'auth/recommendations/recommended-artict'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log(JSON.stringify(response?.data, null, 2), '------------------ >>>>> recommended artist response')
    setLoading(false)
    if (response != undefined) {
      setRecommendedArtist(response?.data?.data[0])
    }
  }
  const getBestArtist = async () => {
    const url = 'auth/recommendations/best-artists'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>> best artist response ', JSON.stringify(response?.data?.data, null, 2), '------------------ >>>>> recommended artist response ')
    setLoading(false)
    if (response != undefined) {
      setBestArtist(response?.data?.data)
    }
  }


  const getTrendingTracks = async () => {
    const url = 'auth/trending-tracks'
    setLoading(true)
    const response = await Get(url, token)
    // return console.log('------------------ >>>>> treanding track response ', JSON.stringify(response?.data?.data, null, 2), '------------------ >>>>> recommended artist response ')
    setLoading(false)
    if (response != undefined) {
      // setBestArtist(response?.data?.data)
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
        <CustomHeader RightIcon dots />
        {Loading ? <ActivityIndicator style={{ height: windowHeight * 0.8, justifyContent: 'center', alignItems: 'center' }} size={'large'} color={Color.white} /> : <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            // alignSelf: 'center',
            alignItems: 'center',
            paddingBottom: moderateScale(120, 0.2),
          }}>
          <TrendingView />



          {/* <View style={[styles.eventListContainer, {
            backgroundColor: 'red',
            marginTop: verticalScale(35),
            height: windowHeight * 0.26,
            marginLeft: moderateScale(0, 0.6),

          }]}>
            <CustomText style={styles.heading}>trending</CustomText>
            <FlatList
              horizontal
              data={trending}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: moderateScale(25, 0.6),
              }}
              renderItem={({ item, index }) => {
                return <RecommendedArtist from={'home'} item={item} title={item?.title} image={item?.image} index={index} />

              }} />
          </View> */}
          <View style={{
            // width: windowWidth * 0.9,
            marginTop: moderateScale(20, .6),
            //  backgroundColor: 'red' 
            height: windowHeight * 0.255
          }}>

            <PlayList title={'Trending'} trackData={trending} from={'home'} />
          </View>


          <View style={[styles.caroselContainer, {
            marginTop: moderateScale(50, .6)
          }]}>
            <CustomText style={styles.heading}>Artists</CustomText>
            <CarouselView data={artist}
            // data={[1,2,,3,4,]}
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
            <CustomText style={styles.heading}>recommended artist</CustomText>
            <FlatList
              horizontal
              data={recommendedArtist}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: moderateScale(25, 0.6),
              }}
              renderItem={({ item, index }) => {
                const key = Object.keys(item)[0]
                const section = item[key]
                if (key === "week_summary") return null;
                if (!section?.items || section?.items?.length === 0) return null
                return <RecommendedArtist from={'home'} item={section} title={section?.title} image={section?.image} index={index} />

              }} />
          </View>
          {/* <View style={styles.eventListContainer}>
            <CustomText style={styles.heading}>Trending</CustomText>
            <AnimatedCard from={'home'} item={recommendedArtist?.your_weekly_top} />
          </View> */}
          <View style={styles.eventListContainer}>
            <CustomText style={styles.heading}>best artist</CustomText>

            <FlatList
              horizontal
              data={bestArtist}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: moderateScale(25, 0.6),
              }}
              renderItem={({ item, index }) => {
                const itemData = item?.tracks?.map((t) => {
                  // console.log('itemData==================================== >>>>>>>>>>>>> track best artist', baseUrl + '/' + t?.audio_file)

                })

                return <BestArtistCard from={'home'} item={item} index={index} />

              }} />


          </View>
          {/* <CustomImage
            style={{ marginTop: verticalScale(20) }}
            source={require('../Assets/Images/list.png')}
          /> */}
          <CircularMenu containerStyle={styles.circularButton} />
          <View style={styles.bottomContainer}>
            <Avatar source={require('../Assets/Images/song1.png')} />
            <TitleWithDescription
              title={'Don’t Forget Your Roots'}
              description="2025"
              titleStyle={styles.text}
              descriptionStyle={styles.text}
            />
          </View>
          {/* <MinimisedPlayer /> */}
        </ScrollView>}
        {activeTrack && <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.2 }} />}
      </ImageBackground >
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bg_container: {
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
