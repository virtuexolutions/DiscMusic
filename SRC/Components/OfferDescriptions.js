import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import IconWithText from './IconWithText'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const OfferDescriptions = () => {
    const premiumFeatures = [
        {
          id: 1,
          text: 'Download to listen offline without wifi',
          icon: 'check',
        },
        {
          id: 2,
          text: 'Music without ad interruptions',
          icon: 'check',
        },
        {
          id: 3,
          text: '2x higher sound quality than our free plan',
          icon: 'check',
        },
        {
          id: 4,
          text: 'Cancel monthly plans online anytime',
          icon: 'check',
        },
      ];
      
    return (
    <View style={styles.container}>
            <CustomText
        children={"Why Join Premium?"}
        style={styles.heading}
            />
            <View style={styles.innerContainer}>

         {premiumFeatures.map((item, index) => 
                <FeatureItem
                item={item.text}
                key={item.id}
                /> 
            )
            
        }         
        </View>
    </View>
  )
}

const FeatureItem = ({item}) =>{
    return(
        <View style={styles.feature}>
            <IconWithText
            iconName={"check-circle-outline"}
            textStyle={styles.text}
            text={item}
            iconColor={Color.green}
            iconType={MaterialCommunityIcons}
            />
        </View>
    );
}

export default OfferDescriptions

const styles = StyleSheet.create({
    container:{
        width:windowWidth * 0.9,
        marginTop:verticalScale(10),
        backgroundColor:"#282C30",
        borderTopColor:"#3B4047",
        borderTopWidth:1,
        paddingVertical:verticalScale(20),
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
    innerContainer:{
        alignItems:"center",
       gap:scale(10)
    },
    feature:{
        width: windowWidth * 0.8,
        // marginTop:verticalScale(20),
        backgroundColor:"rgba(0,0,0,0.2)",
        paddingVertical:verticalScale(10),
        // alignItems:"center",
        paddingHorizontal:scale(10),
        borderRadius:moderateScale(20,0.2)
    },
    heading:{
        fontSize:moderateScale(16,0.2),
        color:Color.white,
        // marginVertical:verticalScale(10),
        marginBottom:verticalScale(10),
        marginLeft:scale(20)
    },
    text:{
        fontSize:moderateScale(10,0.2),
        lineHeight:moderateScale(18,0.2)
    }

})