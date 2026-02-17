import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import MusicCodeCard from '../Components/MusicCodeCard'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import CustomText from '../Components/CustomText'
import CustomButton from '../Components/CustomButton'

const MusicCodeScreen = ({navigation}) => {
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
           <View style={styles.container}>
            <View style={styles.cardsContainer}>

            <MusicCodeCard
            image={require("../Assets/Images/music4.png")}
            style={styles.card1}
            />
            <MusicCodeCard
            secondContainerStyle={styles.container2}
            imageContainerStyle={styles.imgContainer}
            image={require("../Assets/Images/music5.png")}
            style={styles.card2}
            />
            <MusicCodeCard
            image={require("../Assets/Images/music6.png")}
            style={styles.card3}
            />
            </View>   

            <CustomText
            style={styles.text1}
             children={"Music Codes"}
            />
            <CustomText
            style={styles.text2}
             children={"Everythig on music has a code for sharing. scan it with your phone and you’ll be sent straight to that song, podcast, artist, or playlist."}
            />
           <View style={styles.actionsContainer}>
           <CustomButton
              isGradient

              text={'Cancel'}
              textColor={Color.white}
              width={windowWidth * 0.3}
              height={windowHeight * 0.065}
              // onPress={() => { setIsVisible(false) }}
              onPress={() => navigation.goBack()}
              marginTop={moderateScale(20, 0.3)}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(16, 0.3)}
            />
           <CustomButton
              isGradient
                gradientColors={["#016BB8", "#11A8FD"]}
                shadowColor={Color.black}
              text={'Scan'}
              onPress={()=>{
                navigation.navigate("ScanScreen")
              }}
              textColor={Color.white}
              width={windowWidth * 0.3}
              height={windowHeight * 0.065}
              marginTop={moderateScale(20, 0.3)}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(16, 0.3)}
            />
           </View>
           </View>
    </ImageBackground>
            </>
  )
}

export default MusicCodeScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems:"center",
        justifyContent:"center",
   },
    image:{
        width:"100%",
        height:"100%"
      },
      cardsContainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",

      },
      container:{
        // flexDirection:"row",
        // width:100,
        width: windowWidth * 0.92,
     alignItems:"center",
     justifyContent:"center",
        overflow:"hidden",
        borderRadius:moderateScale(40,0.2),
        // height:100,
        // paddingHorizontal:scale(15),
        paddingVertical:verticalScale(30),
        backgroundColor:'rgba(0,0,0,0.2)'
        // backgroundColor:"red",
      },
      card1:{
        // position:"absolute",
        right:scale(4)
    },
    card2:{
        position:"absolute",
        zIndex:1,
        width: windowWidth * 0.5
    },
    imgContainer:{
        width: windowWidth * 0.4,
        height: windowWidth * 0.48,
    },
    container2:{
        paddingHorizontal:scale(30)
    },
    text1:{
        marginTop:verticalScale(40),
        fontSize:moderateScale(16,0.3),
        color:Color.white,
    },
    text2:{
        fontSize:moderateScale(10,0.3),
        color:Color.themeLightGray,
        marginTop:verticalScale(15),
        width: "75%",
        textAlign:"center",
        lineHeight:moderateScale(14,0.2),
    },
    actionsContainer:{
        flexDirection:"row",
        gap:scale(20),
        paddingVertical:verticalScale(10),
    }
  
})