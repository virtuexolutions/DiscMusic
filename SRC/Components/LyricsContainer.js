import { StyleSheet, Text, View } from 'react-native'
import React, { version } from 'react'
import CustomText from './CustomText'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const LyricsContainer = ({data}) => {
    const lyrics = [
        'In the stillness of the night',
        'I feel the weight, the emptiness inside',
        'Whispers in my mind, they call my name',
        'Shadows dance beneath the pale moonlight',
        'Every heartbeat echoes quiet pain',
        'I’m searching for a spark to make me whole',
        'Lost between the memories and truth',
        'Holding on to hope I barely know',
        'Waiting for the dawn to break me through',
        'Till the silence fades and I find you',
      ];
      
  
    return (
    <View style={styles.container}>
      <CustomText
      isBold={true}
      children={"Show Lyrics"}
      style={styles.heading}
      />
      <View style={styles.textContainer}>
     {lyrics.map((item, index) => <CustomText
     key={index}
      children={item}
      style={styles.text}
      />)}

      </View>
    </View>
  )
}

export default LyricsContainer

const styles = StyleSheet.create({
    container:{
        backgroundColor:Color.black,
        width:windowWidth * 0.8,
        alignSelf:"center",
        gap:verticalScale(10),
        marginTop:verticalScale(20),
        borderRadius: moderateScale(12,0.2),
        paddingVertical:verticalScale(20),
        paddingHorizontal:scale(10),

    },

    heading:{
        fontSize:moderateScale(15,0.2),
        color:Color.white
    },
    textContainer:{
      alignItems:"center" ,
      gap:verticalScale(10),
      paddingVertical:verticalScale(10)       
    },
    text:{
        fontSize:moderateScale(12,0.2),
        color:Color.white

    }
})