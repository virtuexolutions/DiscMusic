import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import TitleWithDescription from './TitleWithDescription'
import CustomImage from './CustomImage'
import { Icon } from 'native-base'
import Color from '../Assets/Utilities/Color'
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowWidth } from '../Utillity/utils'
const SongListTile = ({
    showMoreOption=false,
    image,
    title,
    subtitle
}) => {
  return (
    <TouchableOpacity style={styles.container}>
    <View style={styles.imageContainer}>
      <CustomImage 
      source={image}
      style={styles.image}
      />
    </View>
    <TitleWithDescription
    style={styles.textContainer}
    title={title}
    description={subtitle}
    titleStyle={styles.text1}
    descriptionStyle={styles.text2}
    />
   {showMoreOption && (<Icon
    name="dots-three-vertical"
    as={Entypo}
    color={Color.white}
    />)}
</TouchableOpacity>
  )
}

export default SongListTile

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        gap:scale(8),
        alignItems:"center",
        // justifyContent:"space-between",
        paddingVertical:verticalScale(5),
        // paddingHorizontal:scale(10)
    },
    imageContainer:{
        width:scale(45),
        height:scale(45),
        overflow:"hidden",
        borderRadius:scale(10),
    },
    image:{
        width:"100%",
        height:"100%",
    },
    textContainer:{
        width:windowWidth * 0.7,
        paddingVertical:0,
        top:scale(-2),
        gap:scale(5)
        // paddingBottom:scale(10)
    },
    text1:{
        textTransform:"capitalize",
        fontSize:moderateScale(12,0.2),
    },
    text2:{
        fontSize:moderateScale(10,0.2),
    },
})