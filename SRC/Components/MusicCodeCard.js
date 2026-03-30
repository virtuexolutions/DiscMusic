import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage'
import { Avatar, CircleIcon } from 'native-base'
import Color from '../Assets/Utilities/Color'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const MusicCodeCard = ({image, style, imageContainerStyle, secondContainerStyle}) => {
  console.log("first  === ",image)
  return (
    <View style={[styles.mainContainer, style]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <CustomImage 
        source={image}
        style={styles.image}
        />
      </View>
      <View style={[styles.innerContainer, secondContainerStyle]}>
           <Avatar
          //  color={Color.white}
           backgroundColor={Color.themeSkyBlue}
           style={styles.avatar}
           children={<CustomImage 
            style={{tintCplor:Color.white, width:scale(13), height:scale(13)}}
            source={require("../Assets/Images/shapes2.png")}/>}
           />
           
           <CustomImage
           source={require('../Assets/Images/waves.png')}
           style={styles.wave}
           />
      </View>
    </View>
  )
}

export default MusicCodeCard

const styles = StyleSheet.create({
  mainContainer:{
    width: windowWidth * 0.4,
    backgroundColor:"#282C30",
    alignItems:"center",
    borderRadius:moderateScale(30),
    paddingVertical:verticalScale(10),
    gap:scale(20)
  },
  imageContainer:{
    width:windowWidth * 0.33,
    height:windowWidth * 0.4,
    overflow:"hidden",
    borderRadius:moderateScale(30),

  },
  image:{
    width:"100%",
    height:"100%"
  },
  innerContainer:{
    borderRadius:moderateScale(30,0.2),
     paddingHorizontal:scale(25),
     paddingVertical:verticalScale(14),
    alignItems:"center",
    gap:scale(5),
    backgroundColor:"rgba(0,0,0,0.225)"
  },
  avatar:{
    width:scale(25),
    height:scale(25),
    marginVertical:verticalScale(5)
  }
})