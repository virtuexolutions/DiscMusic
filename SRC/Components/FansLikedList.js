import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import ArtistCard from './ArtistCard';
import Color from '../Assets/Utilities/Color';
import { baseUrl } from '../Config';

const FansLikedList = ({ data }) => {
  const featuredData = [
    { id: "1", title: "Folguni Pathak", image: require("../Assets/Images/artist11.png") },
    { id: "2", title: "Pankaj udhas", image: require("../Assets/Images/artist12.png") },
    { id: "3", title: "Kumar Sanu", image: require("../Assets/Images/artist13.png") },
  ]
  return (
    <View style={styles.container}>
      <CustomText
        children={"Fans Also Like"}
        style={styles.heading}
      />
      <FlatList
        data={data}
        contentContainerStyle={{
          gap: scale(20)
        }}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          // console.log('item====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', `${baseUrl}/storage/${item?.profile_image}`);
          return (
            <ArtistCard
              image={{ uri: `${baseUrl}/storage/${item?.profile_image}` }}
              title={item.artist_name}
              key={item.id}
            />
          );
        }}
      />
    </View>
  )
}

export default FansLikedList;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    gap: scale(20),
    marginTop: verticalScale(15),
    paddingLeft: scale(18)
  },
  heading: {
    fontSize: moderateScale(14, 0.2),
    color: Color.white,
    lineHeight: moderateScale(10)
  }
})