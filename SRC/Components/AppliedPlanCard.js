import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import TitleWithDescription from './TitleWithDescription'
import CustomText from './CustomText'

const AppliedPlanCard = () => {
  return (
    <View style={styles.container}>
       <View style={styles.label}>
       <TitleWithDescription
        style={styles.labelTextContainer}
        title={"Premium Mini"}
        description={"1 Premium Account"}
        titleStyle={styles.type}
        descriptionStyle={styles.labelSubText}
        />
       </View>
       <CustomText
       children={"Starting Today"}
       style={styles.text1}
       isBold={true}
       />
       <TitleWithDescription
        style={styles.textContainer}
        title={"One Time Payment Of 25.00"}
        description={"INR for 7days"}
        titleStyle={styles.text2}
        descriptionStyle={styles.text3}
        />
       
       <CustomText
       children={"Offer terms apply."}
       style={styles.text4}
       />


    </View>
  )
}

export default AppliedPlanCard

const styles = StyleSheet.create({
    container:{
        width:windowWidth * 0.9,
        padding:0,
        gap:verticalScale(20),
        marginTop:verticalScale(10),
        backgroundColor:"#282C30",
        borderTopColor:"#3B4047",
        borderTopWidth:1,
        alignItems:"center",
        paddingBottom:verticalScale(20),
        // paddingVertical:verticalScale(20),
        borderRadius:moderateScale(30,0.2),
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
    label:{
        margin:0,
        top:verticalScale(-4),
        backgroundColor:"rgba(0,0,0,0.3)",
        paddingVertical:verticalScale(10),
        paddingHorizontal:scale(20),
        borderBottomLeftRadius:moderateScale(20),
        borderBottomRightRadius:moderateScale(20),
    },
    labelTextContainer:{
            width:"100%",
            paddingVertical:0,
            paddingHorizontal:0,
            alignItems:"center",
    },
    
    type:{
        fontSize:moderateScale(14,0.2),
        color:Color.white
    },
    labelSubText:{
        fontSize:moderateScale(10,0.2),
        color:"#7F8489"
    },
    text1:{
        fontSize:moderateScale(16,0.2),
        color:"#7F8489",
        fontWeight:"bold",
    },
    textContainer:{
        paddingVertical:0,
        paddingHorizontal:0,
        width:"auto",
        alignItems:"center",
        gap:verticalScale(5)
 
      },
    text2:{
        fontSize:moderateScale(12,0.2),
        color:Color.white,
        fontWeight:"bold"
    },
    text3:{
        fontSize:moderateScale(10,0.2),
        color:"#7F8489",
        fontWeight:"bold"
    },
    text4:{
        fontSize:moderateScale(10,0.2),
        color:Color.white,
        fontWeight:"bold",
        textDecorationColor:Color.white,
        textDecorationLine:"underline",
        textDecorationStyle:"solid"
    },
})