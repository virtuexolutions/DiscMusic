import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import ArtistCard from './ArtistCard';

const RecentlyPlayedSongsList = () => {
    const data = [
        {
          id: '1',
          title: 'Mega Hit Mix',
          image: require('../Assets/Images/recent2.png'),
        },
        {
          id: '2',
          title: 'La Bede - Remix',
          image: require('../Assets/Images/featured2.png'),
        },
        {
          id: '3',
          title: 'Un X 100to',
          image: require('../Assets/Images/featured3.png'),
        },
        {
          id: '4',
          title: 'Mega Hit Mix',
          image: require('../Assets/Images/radio.png'),
        },
        {
          id: '5',
          title: 'Daily Mix 1',
          image: require('../Assets/Images/recent1.png'),
        },
        {
          id: '6',
          title: 'La Bede - Remix',
          image: require('../Assets/Images/release2.png'),
        },
        {
          id: '7',
          title: 'Un X 100to',
          image: require('../Assets/Images/recent3.png'),
        },
        {
          id: '8',
          title: 'La Bede - Remix',
          image: require('../Assets/Images/artist.png'),
        },
        {
          id: '9',
          title: 'Daily Mix 1',
          image: require('../Assets/Images/recent4.png'),
        },
      ];
      
  return (
    <View style={styles.container}>
<CustomText
    children={"Recently Played"}
    style={styles.heading}
    />
    <FlatList
    data={data}
    contentContainerStyle={{
      flexWrap:"wrap",
        gap:scale(10),
        width:windowWidth,

    }}
    keyExtractor={item => item.id}
    horizontal={true}
    showsHorizontalScrollIndicator={false}
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

export default RecentlyPlayedSongsList

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