import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage'
import TitleWithDescription from './TitleWithDescription'
import CustomText from './CustomText'
import LinearGradient from 'react-native-linear-gradient'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale, scale } from 'react-native-size-matters'

const OfferCard = () => {
  return (
    <LinearGradient 
    style={styles.card}
    colors={["rgba(34, 37, 41, 0)", "#10A2F68A"]}
    start={{x:0.4, y:0.5}}
    end={{x:0.9, y:0.9}}
>
   <View style={styles.textContainer}>

   <CustomText
   style={styles.text1}
   children={"offer ends soon"}
   />
   <TitleWithDescription
   style={styles.textContainer2}
   titleStyle={styles.text2}
   descriptionStyle={styles.text2}
   title='Ends Soon:'
   description='3 months of premium for $0.00'
   />
   </View>
<CustomImage
style={styles.groupImages}
source={require("../Assets/Images/images.png")}
/>
    </LinearGradient>

  )
}

export default OfferCard

const styles = StyleSheet.create({
    card:{
        borderTopColor:"#3B4047",
        borderTopWidth:1,
        flexDirection:"row",        
        width: windowWidth * 0.9,
        borderRadius:moderateScale(20,0.2),
        // paddingVertical:verticalScale(10),
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 40,
        },
        shadowOpacity: 0.45,
        shadowRadius: 40,
        elevation: 10,
    },
    textContainer:{
      position:"absolute",
      gap:scale(5),
      left:scale(20),
      top:scale(20)
    },
    groupImages:{
      right:scale(-30)
    },
    text1:{
        fontSize:moderateScale(12,0.2),
        color:Color.white,
        textTransform:"uppercase",
    },
    textContainer2:{
     paddingVertical:0,
     paddingHorizontal:0,
     width:windowWidth * 0.4
    },
    text2:{
        fontWeight:"bold",
        fontSize:moderateScale(14,0.2),
        color:Color.white,
        textTransform:"capitalize",
        // width:windowWidth * 0.35
    }
})