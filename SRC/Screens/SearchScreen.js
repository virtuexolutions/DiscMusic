import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import SearchContainer from '../Components/SearchContainer'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import MinimisedPlayer from '../Components/MinimisedPlayer'

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const browseCategories = [
    {
      id: 1,
      title: "Podcasts",
      image: require("../Assets/Images/podcasts.png"),
    },
    {
      id: 2,
      title: "Live Events",
      image: require("../Assets/Images/live-events.png"),
    },
    {
      id: 3,
      title: "Made for you",
      image: require("../Assets/Images/made-for-you.png"),
    },
    {
      id: 4,
      title: "New Releases",
      image: require("../Assets/Images/new-releases.png"),
    },
    {
      id: 5,
      title: "Hindi",
      image: require("../Assets/Images/hindi.png"),
    },
    {
      id: 6,
      title: "Punjabi",
      image: require("../Assets/Images/punjabi.png"),
    },
    {
      id: 7,
      title: "Tamil",
      image: require("../Assets/Images/tamil.png"),
    },
    {
      id: 8,
      title: "Telugu",
      image: require("../Assets/Images/telugu.png"),
    },
    {
      id: 9,
      title: "Charts",
      image: require("../Assets/Images/charts.png"),
    },
    {
      id: 10,
      title: "Pop",
      image: require("../Assets/Images/pop.png"),
    },
    {
      id: 11,
      title: "Indie",
      image: require("../Assets/Images/indie.png"),
    },
    {
      id: 12,
      title: "Trending",
      image: require("../Assets/Images/trending.png"),
    },
    {
      id: 13,
      title: "Love",
      image: require("../Assets/Images/love.png"),
    },
    {
      id: 14,
      title: "Discover",
      image: require("../Assets/Images/discover.png"),
    },
    {
      id: 15,
      title: "Radio",
      image: require("../Assets/Images/radio.png"),
    },
    {
      id: 16,
      title: "Mood",
      image: require("../Assets/Images/mood.png"),
    },
    {
      id: 17,
      title: "Party",
      image: require("../Assets/Images/party.png"),
    },
    {
      id: 18,
      title: "Devotional",
      image: require("../Assets/Images/devotional.png"),
    },
    {
      id: 19,
      title: "Decades",
      image: require("../Assets/Images/decades.png"),
    },
    {
      id: 20,
      title: "Hip-Hop",
      image: require("../Assets/Images/hip-hop.png"),
    },
    {
      id: 21,
      title: "Dance/Electronic",
      image: require("../Assets/Images/dance-electronic.png"),
    },
    {
      id: 22,
      title: "Student",
      image: require("../Assets/Images/student.png"),
    },
    {
      id: 23,
      title: "Chill",
      image: require("../Assets/Images/chill.png"),
    },
    {
      id: 24,
      title: "Gaming",
      image: require("../Assets/Images/gaming.png"),
    },
  ]; 
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>
          <CustomHeader text={"Search"} RightIcon={true} camera={true}/>
          <SearchContainer
          placeholder={"What do you want to listen to?"}
          data={search}
          setData={setSearch}
          input/>
          <CustomText
          style={styles.text}
          children={"Browse All"}
          />
          <FlatList
          data={browseCategories}
          numColumns={2}
          keyExtractor={item => item.id}

          contentContainerStyle={{paddingBottom:verticalScale(80)}}
          renderItem={({item, index}) =>{
            return (
                <CategoryComponent item={item}/>
            );
          }}
          />
          <MinimisedPlayer/>
        </ImageBackground>
        </>
  )
}
 function CategoryComponent({item}) {
  return (
    <TouchableOpacity style={styles.category} onPress={()=>{}}>
      <View style={styles.imageContainer}>
      <CustomImage source={item.image} style={[styles.image, {resizeMode: 'cover'}]}/>
      </View>
      <CustomText
      style={styles.categoryTitle}
      children={item.title}
      />
    </TouchableOpacity>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems:"center",
    // paddingHorizontal:scale(5)
  },
  image:{
    width:"100%",
    height:"100%"
  },
  category:{
    flexDirection:"row",
    width: windowWidth * 0.45,
    gap:scale(15),
    margin:scale(6),
    borderRadius:windowWidth * 0.2,
    backgroundColor:"#282C30",
    borderColor:"#424750",
    borderWidth:0.5,
    overflow:"hidden",
    alignItems:"center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,

    elevation: 10,
  },
  text:{
    width:windowWidth * 0.9,
    fontSize:moderateScale(20,0.2),
    color:Color.white,
    paddingVertical:verticalScale(20)
  },
  imageContainer:{
    width: windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius: (windowWidth * 0.2)/2,
    overflow:"hidden"
  },
  categoryTitle:{
    fontSize:moderateScale(12,0.2),
    color:Color.white,
  }
})