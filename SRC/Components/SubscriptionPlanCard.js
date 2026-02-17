import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';

const SubscriptionPlanCard = () => {
  return <View style={styles.container}>
    <PlanLabel/>
    <CustomText style={styles.heading} children={"Starting Today"}/>
    <CustomText style={styles.text1} children={"One Time Payment Of 25.00"}/>
    <CustomText style={styles.text2} children={"Inr for 7days"}/>
    <CustomText style={styles.text3} children={"Offer terms apply."}/>
  </View>
};
const PlanLabel = () => {
  return (
    <View style={styles.labelContainer}>
      <CustomText children={'premium mini'} style={styles.title} />
      <CustomText children={'1 Premium Account'} style={styles.subtitle} />
    </View>
  );
};
export default SubscriptionPlanCard;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.75,
    backgroundColor: '#282C30',
    borderRadius: moderateScale(20, 0.2),
    alignItems:"center",
    padding:0,
    elevation: 6,
    shadowColor:"#101012BF",
    shadowOffset:{height:20, width:10},
    shadowOpacity:0.5,
    shadowRadius:moderateScale(20,0.2)
  },
  labelContainer:{
     borderBottomLeftRadius:moderateScale(20,0.2),
     borderBottomRightRadius:moderateScale(20,0.2),
     backgroundColor:Color.black,
     alignItems:"center",
     justifyContent:"center",
  },
  title:{
      fontSize:moderateScale(14,0.2),
      color:Color.white,
      fontWeight:"semibold"
  },
  subtitle:{
    fontSize:moderateScale(10,0.2),
    color:"#7F8489",
    fontWeight:"medium"
  },
  heading:{
    fontSize:moderateScale(16,0.2),
    color:"#7F8489",
    fontWeight:"semibold",
  },
  text1:{
    fontSize:moderateScale(14,0.2),
    color:Color.white,
    fontWeight:"semibold",
    lineHeight:moderateScale(14),
  },
  text2:{
    fontSize:moderateScale(10,0.2),
    color:"#7F8489",
    fontWeight:"medium",
    lineHeight:moderateScale(14),
  },
  
 
  text3:{
    fontSize:moderateScale(10,0.2),
    color:Color.white,
    fontWeight:"medium",
    lineHeight:moderateScale(14),
    textDecorationLine:"underline",
  },

});
