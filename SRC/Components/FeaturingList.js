import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import ArtistCard from './ArtistCard';
import Color from '../Assets/Utilities/Color';

const FeaturingList = () => {
    const featuredData=  [
        {id:"1", title:"this is abhijeet", image:require("../Assets/Images/recent2.png")},
        {id:"2", title:"abhijeet radio", image:require("../Assets/Images/featured2.png")},
        {id:"3", title:"hot hits hot", image:require("../Assets/Images/featured3.png")},
    ]
  return (
    <View style={styles.container}>
<CustomText
    children={"Featuring Abhijeet"}
    style={styles.heading}
    />
    <FlatList
    data={featuredData}
    contentContainerStyle={{
      gap:scale(20)
    }}
    
    showsHorizontalScrollIndicator={false}
    keyExtractor={item => item.id}
    horizontal={true}
    renderItem={({item, index}) =>{
      return (
        <ArtistCard
           image={item.image}
           title={item.title}
           key={item.id}
           />
          );
        }}
        />
        </View>
  )
}

export default FeaturingList

const styles = StyleSheet.create({
  container:{
    width:windowWidth,
    gap:scale(20),
    marginTop:verticalScale(15),
    paddingLeft:scale(18)
  },
    heading:{
      fontSize:moderateScale(14,0.2),
      color:Color.white,
      lineHeight:moderateScale(10)
    }
})