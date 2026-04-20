import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import CustomButton from '../Components/CustomButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import IconWithText from '../Components/IconWithText'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { Avatar } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient'
import ThemeIconButton from '../Components/ThemeIconButton'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import { useNavigation } from '@react-navigation/native'
import { State, useActiveTrack } from 'react-native-track-player'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { baseUrl } from '../Config'

const YourLibrary = () => {
  const token = useSelector(state => state.authReducer.token)
  // console.log('token====================== >>>>>>> here from YourLibrary', token);
  const activeTrack = useActiveTrack()
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false)
  const [artistList, setArtistList] = useState([]);

  const array = [
    {
      id: 1, title: "Abhijeet", type: "Artist", image: (require("../Assets/Images/artist7.png")),
    },
    {
      id: 2, title: "A.R.Rahman", type: "Artist", image: (require("../Assets/Images/artist8.png")),
    },
    {
      id: 3, title: "Sunidhi Chauhan", type: "Artist", image: (require("../Assets/Images/artist9.png")),
    },
  ];
  const actions = [{
    id: "add", title: "Add artist", onPress: () => {
      navigation.navigate("SearchArtist")
    },
  },
  {
    id: "add", title: "Add podcasts & shows", onPress: () => { },
  },
  ];



  const addArtist = async () => {
    const url = 'auth/liked-artist'
    setIsLoading(true)
    const resposnse = await Get(url, token)
    setIsLoading(false)
    // console.log('response====================== >>>>>>> here from addArtist', JSON.stringify(resposnse?.data?.artist_list, null, 2));
    if (resposnse != undefined) {
      setArtistList(resposnse?.data?.artist_list)
    }
    // navigation.navigate("SearchArtist")
  }

  useEffect(() => {
    addArtist()
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
        <CustomHeader text={"Your Library"}
          leftIcon={true}
          user={true}
          titlStyle={{
            width: windowWidth * 0.4
          }}
          RightIcon={true}
          search={true}
          add={true} />


        <View style={styles.row}>
          <CustomButton
            isGradient
            text={'Artists'}
            textColor={Color.white}
            width={windowWidth * 0.4}
            height={windowHeight * 0.05}
            onPress={() => { }}
            marginTop={moderateScale(20, 0.3)}
            borderRadius={windowWidth / 2}
            fontSize={moderateScale(16, 0.3)}
          />
        </View>
        <View style={styles.row}>
          <IconWithText
            iconSource={require("../Assets/Images/arrows.png")}
            text='Recents'
            textStyle={styles.text1}
          />
          <CustomImage
            source={require("../Assets/Images/category.png")}
            style={styles.icon}
            onPress={() => { }}
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: moderateScale(90, .6) }}>
          {

            isLoading ? <ActivityIndicator size={'large'} color={Color.white} /> :
              <FlatList
                style={{
                  // height: windowHeight * 0.3,
                  paddingVertical: moderateScale(10, .6)
                }}
                // data={[1, 3, 6, 6, 6, 6]}
                data={artistList}
                keyExtractor={item => item} z
                contentContainerStyle={{
                  // paddingHorizontal: moderateScale(10, .6),
                  // marginTop: verticalScale(5),
                  // paddingBottom: scale(50),
                  // gap: verticalScale(10),
                }}
                renderItem={({ item, index }) => {
                  // console.log('item====================== >>>>>>> here from renderItem', `${baseUrl}/storage/${item?.user?.profile_image}`);
                  return (
                    <ArtistCard
                      item={item}
                    />
                  );

                }}
              />
          }


          <ArtistCard
            item={{
              id: "add", title: "Add artist", onPress: () => {
                navigation.navigate("SearchArtist", { from: 'library' })
              },
            }}
          />

          <ArtistCard
            item={{ id: "add", title: "Add podcasts & shows", onPress: () => { }, }}
          /></ScrollView>
        {activeTrack && <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.25 }} />}
      </ImageBackground>
    </>
  )
}

const ArtistCard = ({
  item
}) => {
  const navigation = useNavigation();
  const isCreate = ['add'].includes(item.id);
  return (
    <TouchableOpacity
      style={[styles.card, isCreate && { overflow: "visible" }]}
      onPress={isCreate ? item?.onPress : () => {
        navigation.navigate("ViewArtistLibrary")
      }}
    >
      {isCreate ? <ThemeIconButton
        isGradient={true}
        iconName={"plus"}
        iconType={Feather}
        iconSize={scale(14)}
        gradientColors={Color.themeGradient}
        style={styles.imageContainer}
      /> : <Avatar
        // bgColor={[Color.black, "white"]}
        width={windowWidth * 0.18}
        height={windowWidth * 0.18}
        source={{ uri: `${baseUrl}/storage/${item?.user?.profile_image}` }}
        // shadow={"9"}
        style={{
          elevation: 16, shadowColor: Color.black,
          shadowOpacity: 0.87,
          shadowRadius: (windowWidth * 0.18) / 2,
          shadowOffset: { height: 15, width: 10 }
        }}

        outlineColor={"red"}
        outlineStyle={"dasheds"}

      />}

      {/* <View style={styles.imageContainer}>
      <CustomImage
        source={require("../Assets/Images/artist7.png")}
        style={styles.image}
      />
    </View> */}
      <View style={styles.info}>
        <CustomText
          children={item?.title ? item?.title : item?.user?.name}
          style={[styles.title, {

            fontSize: item?.title ? moderateScale(12, 0.2) : moderateScale(14, 0.2),
          }]}
        />
        {!isCreate && <CustomText
          children={'artist'}
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
    // paddingHorizontal:scale(5)
  },
  image: {
    width: "100%",
    height: "100%"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    width: windowWidth,
    paddingVertical: verticalScale(10)
  },
  text1: {
    fontSize: moderateScale(14, 0.2),
    fontWeight: "500"
  },
  icon: {
    width: scale(18),
    height: scale(18),
    tintColor: Color.white
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
  }
})