import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

const ViewArtistLibrary = () => {
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>
        <CustomHeader 
        leftIcon={true}
        showBack={true}
        text={"Abhijeet"}
          RightIcon={true}
          dots={true} />
        <ScrollView
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingBottom: verticalScale(100),
          }}
        >
          <View style={styles.info}>
            <View style={styles.imageContainer}>
              <CustomImage
                style={styles.image}
                source={require("../Assets/Images/artist10.png")}
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
              isGradient={true}
              gradientColors={Color.themeGradient2}
              iconSource={require("../Assets/Images/pause.png")}
            />
          </View>
          <PopularSongs
          />
          <PopularReleases/>
          <FeaturingList/>
          <ArtistAboutInfo/>
          <FansLikedList/>
        </ScrollView>
        <MinimisedPlayer 
        style={styles.player}
        />
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
    // paddingHorizontal:scale(5)
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    gap: scale(10)
  },
  player:{
    paddingBottom:scale(20),
    bottom:scale(30)
  }
})