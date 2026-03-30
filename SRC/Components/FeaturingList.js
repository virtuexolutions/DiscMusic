import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import ArtistCard from './ArtistCard';
import Color from '../Assets/Utilities/Color';
import { baseUrl } from '../Config';

const FeaturingList = ({ data, onArtistPress }) => {

  return (
    <View style={styles.container}>
      <CustomText
        children={"Featuring Abhijeet"}
        style={styles.heading}
      />
      <FlatList
        data={data}
        contentContainerStyle={{
          gap: scale(20)
        }}

        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        horizontal={true}
        renderItem={({ item, index }) => {
          // console.log('item====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', `${baseUrl}/storage/${item?.profile_image}`);
          return (
            <ArtistCard
              image={{ uri: `${baseUrl}/storage/${item?.profile_image}` }}
              title={item.artist_name}
              key={item.id}
              onPress={() => {
                onArtistPress(item)
              }}
            />
          );
        }}
      />
    </View>
  )
}

export default FeaturingList

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