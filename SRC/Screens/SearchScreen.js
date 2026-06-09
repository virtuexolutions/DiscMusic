import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import SearchContainer from '../Components/SearchContainer';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';
import { baseUrl } from '../Config';

const SearchScreen = () => {
  const token = useSelector(state => state.authReducer.token)

  const activeSong = useSelector(state => state.commonReducer.activeSong)
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [genreList, setGenreList] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const getgenre = async () => {
    const url = 'auth/genres-list'
    setIsLoading(true)
    const response = await Get(url, token)
    setIsLoading(false)
    if (response != undefined) {
      setGenreList(response?.data?.track_list?.data)
    }
  }

  useEffect(() => {
    getgenre()
  }, [])
  const cardImage = [
    { name: 'pop', image: require('../Assets/Images/pop.png') },
    { name: 'hip-hop', image: require('../Assets/Images/hip-hop.png') },
    { name: 'classical', image: require('../Assets/Images/classic.jpg') },
    { name: 'country', image: require('../Assets/Images/country.jpg') },
    { name: 'bertel', image: require('../Assets/Images/bertel.jpg') },
    { name: 'reggae', image: require('../Assets/Images/reggae.jpg') },
    { name: 'rock', image: require('../Assets/Images/rock.jpg') },
    { name: 'electronic', image: require('../Assets/Images/electronic.jpg') },
    { name: 'jazz', image: require('../Assets/Images/jazz.jpg') },
    { name: 'r&b', image: require('../Assets/Images/R&b.jpg') },
    { name: 'blues', image: require('../Assets/Images/blues.jpg') },

  ]

  const searchArtistAndSong = async text => {
    setSearch(text);

    // 1. Agar search empty hai
    if (text?.trim()?.length === 0) {
      setSearchData([]);
      return;
    }

    setIsLoading(true);

    try {
      const url = 'auth/search';
      const body = { query: text };
      const response = await Post(url, body, apiHeader(token));

      // 2. API se Songs aur Artists nikaalna
      const songs = response?.data?.tracks?.map(item => ({
        ...item,
        type: 'song',
      })) || [];

      const artists = response?.data?.artists?.map(item => ({
        ...item,
        type: 'artist',
      })) || [];

      // 3. Local Genres ko filter karna (Jo aap niche kar rahe thay)
      const filteredGenres = genreList?.filter(item =>
        item?.name?.toLowerCase().includes(text.toLowerCase())
      ).map(item => ({
        ...item,
        type: 'genre', // Type add kar diya taaki UI pe pehchan sakein
      })) || [];

      // 4. Sab ko ek hi array mein merge kar dena
      const mergedData = [...songs, ...artists, ...filteredGenres];

      setSearchData(mergedData);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
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
        style={styles.bg_container}>
        <CustomHeader text={'Search'} RightIcon={true} camera={true} />
        <SearchContainer
          placeholder={'What do you want to listen to?'}
          data={search}
          setData={searchArtistAndSong}
          input
          placeholderTextColor={Color.white}
        />
        <CustomText style={styles.text} children={'Browse All'} />
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: moderateScale(activeSong ? 125 : 120, 0.6) }}
        >

          {
            isLoading ? <Loader animation={true} /> :
              search.trim().length > 0 ? (
                <FlatList
                  key="vertical_list"
                  data={searchData}
                  numColumns={1}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{ paddingBottom: moderateScale(80, 0.6) }}
                  renderItem={({ item }) => (
                    <SongComponent item={item} isLoading={isLoading} />
                  )}
                  ListEmptyComponent={<View style={styles.empty_container} ><CustomText style={styles.empty_txt} children={'No Result'} /></View>}
                />
              ) : (

                <FlatList
                  numColumns={2}
                  data={genreList}
                  keyExtractor={item => item.id}
                  contentContainerStyle={{ paddingBottom: moderateScale(80, 0.6) }}
                  renderItem={({ item }) => {
                    const cardData = cardImage.find(i => i.name.toLowerCase() === item.name.toLowerCase());
                    return <CategoryComponent item={item} isLoading={isLoading} cardData={cardData} />;
                  }}
                  ListEmptyComponent={<View style={styles.empty_container} ><CustomText style={styles.empty_txt} children={'No Result'} /></View>}

                />
              )}
        </ScrollView>

        {activeSong && <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.25 }} />}
      </ImageBackground >
    </>
  );
};
function CategoryComponent({ item, isLoading, cardData }) {
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      style={styles.category}
      onPress={() => {
        navigation.navigate('DetailScreen', { item_id: item?.id, title: item?.name });
      }}>
      <View style={styles.imageContainer}>
        {!isLoading && <CustomImage
          onPress={() => {
            navigation.navigate('DetailScreen', { item_id: item?.id, title: item?.name });
          }}
          source={item?.name.toLowerCase() == cardData?.name.toLowerCase() ? cardData?.image : require('../Assets/Images/artist7.png')}
          style={[styles.image, { resizeMode: 'cover' }]}
        />}
      </View>
      {!isLoading && <CustomText style={styles.categoryTitle} children={item.name} />}
    </TouchableOpacity>
  );
}
function SongComponent({ item, isLoading, cardData }) {
  // console.log('item====================== >>>>>>> here from category', JSON.stringify(item, null, 2));
  const navigation = useNavigation();


  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => {
        navigation.navigate('SongDetail', {
          item: item,
        });
      }}>

      {/* Image */}
      <CustomImage
        source={
          item?.user?.profile_image || item?.cover_image
            ? { uri: `${baseUrl}/storage/${item?.user?.profile_image || item?.cover_image}` }
            : require('../Assets/Images/artist7.png')
        }
        style={styles.image_song}
      />

      {/* Text Data */}
      <View style={styles.textContainer}>
        <CustomText
          style={styles.songName}
          numberOfLines={1}>
          {item?.user?.name || item?.title}
        </CustomText>

        <CustomText
          style={styles.artistName}
          numberOfLines={1}>
          {item?.artist_name || (item?.artist && typeof item.artist === 'object' ? (item.artist?.user?.name || item.artist?.name) : item?.artist) || ''}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
}
export default SearchScreen;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    // paddingHorizontal:scale(5)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    flexDirection: 'row',
    width: windowWidth * 0.45,
    gap: scale(15),
    backgroundColor: "red",
    margin: scale(9, .6),
    borderRadius: windowWidth * 0.2,
    backgroundColor: '#282C30',
    borderColor: '#424750',
    borderWidth: 0.5,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: '#888888ff',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: windowWidth * 0.2,

    elevation: 13,
  },
  text: {
    width: windowWidth * 0.9,
    fontSize: moderateScale(20, 0.2),
    color: Color.white,
    paddingTop: moderateScale(18, .6),
    paddingBottom: moderateScale(10, .6),
  },
  imageContainer: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: (windowWidth * 0.2) / 2,
    overflow: 'hidden',
    // backgroundColor: "#3D4044",
  },
  categoryTitle: {
    fontSize: moderateScale(12, 0.2),
    color: Color.white,
  },
  card: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.072,
    // marginVertical: moderateScale(15, .6), // 0.06 height
    backgroundColor: '#282C30',
    borderRadius: moderateScale(12, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    // marginTop: moderateScale(15, 0.3),

    marginBottom: moderateScale(10, 0.3),
  },

  image_song: {
    width: windowHeight * 0.06,
    height: windowHeight * 0.06,
    borderRadius: moderateScale(8, 0.3),
  },

  textContainer: {
    marginLeft: scale(12),
    width: '75%',
  },

  songName: {
    color: Color.white,
    fontSize: moderateScale(13, 0.3),
    fontWeight: '600',
  },

  artistName: {
    color: '#B0B0B0',
    fontSize: moderateScale(11, 0.3),
    marginTop: moderateScale(2, 0.3),
  },
  empty_txt: {
    textAlign: 'center',
    paddingTop: windowHeight * 0.2,
    color: Color.white,
    letterSpacing: moderateScale(1, 0.6),
    fontSize: moderateScale(13, 0.6)
  }, empty_container: { height: windowHeight * 0.5, width: windowWidth * 0.92, }
});
