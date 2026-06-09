import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useActiveTrack } from 'react-native-track-player'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomButton from '../Components/CustomButton'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomText from '../Components/CustomText'
import IconWithText from '../Components/IconWithText'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import ThemeIconButton from '../Components/ThemeIconButton'
import { baseUrl } from '../Config'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'
import PlaylistBottomSheet from '../Components/PlaylistBottomSheet'
import { setPlaylistTrack } from '../Store/slices/common'
import SearchContainer from '../Components/SearchContainer'

const YourLibrary = () => {
  const token = useSelector(state => state.authReducer.token
  )
  const activeSong = useSelector(state => state.commonReducer.activeSong)

  const modalRef = useRef(null);
  const isFoucs = useIsFocused()
  const activeTrack = useActiveTrack()
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [artistList, setArtistList] = useState([]);
  console.log("🚀 ~ YourLibrary ~ artistList:", artistList)
  const [playlistList, setPlaylistList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [listType, setListType] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');





  const addArtist = async () => {
    const url = 'auth/liked-artist'
    setIsLoading(true)
    const resposnse = await Get(url, token)
    setIsLoading(false)
    if (resposnse != undefined) {
      setArtistList(resposnse?.data?.artist_list)
    }
  }



  const playlists = async () => {
    const url = 'auth/playlist/list'
    setIsLoading(true)
    const resposnse = await Get(url, token)
    console.log(JSON.stringify(resposnse?.data, null, 2), "==============================  herer resposnsresposnsresposnsresposns")
    setIsLoading(false)
    if (resposnse != undefined) {
      setPlaylistList(resposnse?.data?.playlist)
    }
  }
  useEffect(() => {
    addArtist()
    playlists()
  }, [listType, isFoucs])


  // const allData = [
  //   ...artistList?.map(item => ({ ...item, dataType: 'artist' })),
  //   ...playlistList?.map(item => ({ ...item, dataType: 'playlist' }))
  // ];
  // let displayData =
  //   listType === 'artist' ? artistList.map(item => ({ ...item, dataType: 'artist' })) :
  //     listType === 'playlist' ? playlistList.map(item => ({ ...item, dataType: 'playlist' }))
  //       : allData

  // if (searchQuery.trim() !== '') {
  //   const query = searchQuery.toLowerCase();
  //   displayData = displayData.filter(item => {
  //     const title = item?.title || item?.name || item?.user?.name || '';
  //     return title.toLowerCase().includes(query);
  //   });
  // }
  // 1. Fallback array [] lagaya hai taake agar map undefined ho toh spread crash na kare
  const allData = [
    ...(artistList?.map(item => ({ ...item, dataType: 'artist' })) || []),
    ...(playlistList?.map(item => ({ ...item, dataType: 'playlist' })) || [])
  ];

  // 2. displayData logic ko thora saaf aur safe banaya hai
  let displayData = [];

  if (listType === 'artist') {
    displayData = artistList ? artistList.map(item => ({ ...item, dataType: 'artist' })) : [];
  } else if (listType === 'playlist') {
    displayData = playlistList ? playlistList.map(item => ({ ...item, dataType: 'playlist' })) : [];
  } else {
    displayData = allData;
  }

  // 3. Search filter (Already mostly safe, but added extra check)
  if (searchQuery && searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase();
    displayData = displayData.filter(item => {
      const title = item?.title || item?.name || item?.user?.name || '';
      return title.toLowerCase().includes(query);
    });
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
        <CustomHeader text={"Your Library"}
          // leftIcon={true}
          // user={true}
          titlStyle={{
            width: windowWidth * 0.4
          }}
          RightIcon={true}
          search={true}
          onSearchPress={() => setShowSearch(!showSearch)}
          add={true}

          rbref={modalRef} />




        <View style={styles.row}>
          <CustomButton
            isGradient
            text={'Artists'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.05}
            onPress={() => {
              setListType('artist')
              // navigation.navigate("DownloadTrack", { from: 'library' })
            }}

            marginTop={moderateScale(20, 0.3)}
            marginRight={moderateScale(18, 0.3)}
            borderRadius={windowWidth / 2}
            fontSize={moderateScale(16, 0.3)}
          />
          <CustomButton
            isGradient
            text={'playlists'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.05}
            onPress={() => {
              setListType('playlist')
              // navigation.navigate("PlaylistScreen")
            }}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={windowWidth / 2}
            fontSize={moderateScale(16, 0.3)}
          />
        </View>
        {showSearch && (
          <View style={{ marginTop: moderateScale(10, 0.3) }}>
            <SearchContainer
              input={true}
              data={searchQuery}
              setData={setSearchQuery}
              placeholder="Search saved artists and playlists"
              width={windowWidth * 0.9}
              inputStyle={{
                color: Color.white,
                // marginTop: moderateScale(10, 0.3),
              }}
            />
          </View>
        )}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: moderateScale(130, .6) }}>
          {

            isLoading ? <ActivityIndicator size={'large'} color={Color.white} />
              :

              <FlatList
                style={{ paddingVertical: moderateScale(10, 0.6) }}
                data={displayData}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={({ item }) => {
                  if (item.dataType == 'playlist') {
                    return (
                      <ArtistCard
                        from={'playlist'}
                        item={{
                          item: item, // Poora playlist item
                          onPress: () => navigation.navigate("CreatePlaylistScreen", { playlistData: item }),
                        }}
                      />
                    );
                  }

                  // 2. Agar Artist hai toh normal format
                  return <ArtistCard item={item} />;


                }}
              // ListFooterComponent={() => (
              //   <ArtistCard item={{
              //     id: "add", title: "Add artist", onPress: () => {
              //       navigation.navigate("SearchArtist", { from: 'library' })
              //     },
              //   }} />
              // )}
              />
          }


          < ArtistCard
            item={{
              id: "add", title: "Add artist", onPress: () => {
                navigation.navigate("SearchArtist", { from: 'library' })
              },
            }}
          />

          {/* <ArtistCard
            item={{ id: "add", title: "Add podcasts & shows", onPress: () => { }, }}
          /> */}
        </ScrollView>
        {activeSong && <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.25 }} />}
      </ImageBackground>

      <PlaylistBottomSheet
        rbRef={modalRef}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  )
}

const ArtistCard = ({
  from,
  item
}) => {
  console.log('item from artist card ============================= >>>> ', `${baseUrl}/storage/${item?.item?.photo}`);

  const navigation = useNavigation();
  const isCreate = ['add'].includes(item.id);
  return (
    <TouchableOpacity
      style={[styles.card, isCreate && { overflow: "visible" }]}
      onPress={item?.onPress ? item.onPress : () => {
        navigation.navigate("ViewArtistLibrary", { item: item })
      }}
    >
      {isCreate ? <ThemeIconButton
        onPress={() => {
          // navigationService.navigate('SavedPlaylist')
        }}
        isGradient={true}
        iconName={"plus"}
        iconType={Feather}
        iconSize={scale(14)}
        gradientColors={Color.themeGradient}
        style={styles.imageContainer}
      /> :
        <>
          {from != 'playlist' ?
            <Avatar
              width={windowWidth * 0.18}
              height={windowWidth * 0.18}
              source={{ uri: `${baseUrl}/storage/${item?.user?.profile_image}` }}
              style={styles.avtar_con}

              outlineColor={"red"}
              outlineStyle={"dasheds"}

            />
            :
            <View style={styles.container}>

              <View style={styles.iconContainer}>
                <CustomImage
                  source={item?.item?.photo ? { uri: `${baseUrl}/storage/${item?.item?.photo}` } : item?.track?.length > 0 ? { uri: `${baseUrl}/storage/${item?.track[0]?.cover_image}` } : require('../Assets/Images/musical-note.png')

                  }
                  style={styles.icon}
                  onPress={() => { }}
                />
              </View>
              {/* <View></View> */}
            </View>

          }
        </>
      }


      <View style={styles.info}>
        <CustomText
          children={item?.title || item?.item?.name || item?.user?.name}
          style={[styles.title, {

            fontSize: item?.title || item?.name ? moderateScale(12, 0.2) : moderateScale(14, 0.2),
          }]}
        />
        {!isCreate && <CustomText
          children={from == 'playlist' ? 'playlist' : 'artist'}
          style={styles.desc}
        />}
      </View>



    </TouchableOpacity>
  );
}


export default YourLibrary

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    paddingHorizontal: scale(20),
    width: windowWidth,
    // paddingVertical: verticalScale(10)
  },
  text1: {
    fontSize: moderateScale(14, 0.2),
    fontWeight: "500"
  },
  icon: {
    width: '100%',
    height: '100%',
    // tintColor: Color.white
  },
  card: {
    width: windowWidth * 0.9,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(20),
    marginTop: moderateScale(10, .6),
    overflow: "hidden",
    backgroundColor: "#282C30",
    borderRadius: (windowWidth * 0.18) / 2,
    elevation: 16,
    shadowColor: Color.black,
    shadowRadius: (windowWidth * 0.2) / 2,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 0.15,
  },
  imageContainer: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: (windowWidth * 0.18) / 2,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: Color.white,
    shadowRadius: (windowWidth * 0.2) / 2,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
  },
  info: {
    gap: verticalScale(5)
  },
  title: {
    fontWeight: "500",
    color: Color.white
  },
  desc: {
    fontSize: moderateScale(10, 0.2),
    fontWeight: "500",
    color: Color.themeLightGray,
  },
  container: {
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: windowWidth * 0.18 / 2,
    elevation: 16, shadowColor: Color.lightGrey,
    shadowOpacity: 0.87,
    backgroundColor: "#282C30",
    shadowOffset: { height: 15, width: 10 }
  },
  iconContainer:
  {
    // flexDirection: 'row',
    // justifyContent: "center",
    // alignItems: "center",
    width: windowWidth * 0.18,
    overflow: 'hidden',
    height: windowWidth * 0.18,
    borderRadius: windowWidth * 0.18 / 2,
  }, avtar_con: {
    elevation: 16, shadowColor: Color.black,
    shadowOpacity: 0.87,
    shadowRadius: (windowWidth * 0.18) / 2,
    shadowOffset: { height: 15, width: 10 }
  }

})