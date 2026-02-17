import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ScrollView } from 'native-base'
import CustomHeader from '../Components/CustomHeader'
import CustomStatusBar from '../Components/CustomStatusBar'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import TrendingView from '../Components/TrendingView'
import EventCard from '../Components/EventCard'
import CustomText from '../Components/CustomText'
import Color from '../Assets/Utilities/Color'
import CircularMenu from '../Components/CircularMenu'
import CustomImage from '../Components/CustomImage'
import TitleWithDescription from '../Components/TitleWithDescription'
import CarouselView from '../Components/CarouselView'

const HomeScreen = () => {
  const events = [
    {
      id: 1,
      name: 'Miss You',
      text: 'oliver tree, robin schulz',
      image: require('../Assets/Images/event_1.png'),
    },
    {
      id: 2,
      name: 'Miss You',
      text: 'oliver tree, robin schulz',
      image: require('../Assets/Images/event_2.png'),
    },
    {
      id: 3,
      name: 'Miss You',
      text: 'oliver tree, robin schulz',
      image: require('../Assets/Images/event_3.png'),
    },
  ];

  const musicCategories = [
    'Classic',
    'Pop',
    'Jazz',
    'Hip-Hop',
    'R&B',
    'Rock',
    'Anime',
    'K-pop',
    'Indie',
    'Instrumental',
    'Dance',
  ];

  const artist = [
    {
      id: 1,
      image: require('../Assets/Images/event_1.png'),
    },
    {
      id: 2,
      image: require('../Assets/Images/event_2.png'),
    },
    {
      id: 3,
      image: require('../Assets/Images/event_3.png'),
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
      style={styles.bg_container}
      imageStyle={styles.image}>
        <CustomHeader leftIcon RightIcon 
        dots
        showBack={true}
        />
      <ScrollView
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        contentContainerStyle={{
          // alignSelf: 'center',
          alignItems: 'center',
          paddingBottom:moderateScale(120,0.2)
        }}>
          <TrendingView />
          <View style={styles.eventListContainer}>
              <CustomText style={styles.heading}>Events</CustomText>
              <FlatList
                horizontal
                data={events}
                // contentContainerStyle={styles.eventListCOntainer}
                renderItem={({item, index}) => {
                  return <EventCard data={item} />;
                }}
              />

              
              </View>
 
              <View style={styles.catgoryListContainer}>

              <CustomText style={styles.heading}>Genre</CustomText>
              <FlatList
                numColumns={4}
                contentContainerStyle={styles.catgoryListContainer}
                data={musicCategories}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.category_view}>
                      <CustomText
                        numberOfLines={1}
                        style={styles.category_text}>
                        {item}
                      </CustomText>
                    </View>
                  );
                }}
                />
                </View>
                <View style={styles.caroselContainer}>
              <CustomText style={styles.heading}>Artists</CustomText>
              <CarouselView 
              // data={[1,2,,3,4,]}
              />
              </View>
              <CustomImage
              style={{marginTop:verticalScale(20)}}
              source={require("../Assets/Images/list.png")}
              />
                <CircularMenu
                containerStyle={styles.circularButton}
                />
                <View style={styles.bottomContainer}>
                  <Avatar
                    source={require("../Assets/Images/song1.png")}
                  />
                  <TitleWithDescription
                  title={"Don’t Forget Your Roots"}
                  description='2025'
                  titleStyle={styles.text}
                  descriptionStyle={styles.text}
                  />
                </View>
               
          </ScrollView>
          </ImageBackground>
          </>
  )
}

export default HomeScreen

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
  eventListContainer:{
    // backgroundColor:"red",
    height:windowHeight * 0.2,
    paddingHorizontal:scale(10),
    marginTop:verticalScale(35)
    // padding:,

  },
  heading: {
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
    paddingVertical: moderateScale(10, 0.6),

  },
  catgoryListContainer:{
    // backgroundColor:Color.red,
    height:windowHeight * 0.25,
    gap:scale(10)
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
  bottomContainer:{
    flexDirection:"row",
    gap:scale(10),
    alignItems:"center",
    width:windowWidth * 0.85,
    marginTop:verticalScale(20),
    // paddingVertical:verticalScale(1),
    paddingHorizontal:scale(10),
    backgroundColor:Color.black,
    borderRadius:moderateScale(18,0.2)
  },
  caroselContainer:{
    height:windowHeight * 0.2,
    alignItems:"center",
    gap:verticalScale(10)
  },
  text:{
    color:Color.white,
    fontSize:moderateScale(14,0.2)
  },
  circularButton:{
    
    bottom:scale(-120),
    zIndex:1,
  }
})