import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import ArtistCard from './ArtistCard';
import navigationService from '../navigationService';
import { baseUrl } from '../Config';
import Color from '../Assets/Utilities/Color';

const RecentlyPlayedSongsList = ({ data, isLoading }) => {
  // console.log('data==================== >>>>>>>>>>>>>>>>>>>>>>>>', data)
  // const data = [
  //   {
  //     id: '1',
  //     title: 'Mega Hit Mix',
  //     image: require('../Assets/Images/recent2.png'),
  //   },
  //   {
  //     id: '2',
  //     title: 'La Bede - Remix',
  //     image: require('../Assets/Images/featured2.png'),
  //   },
  //   {
  //     id: '3',
  //     title: 'Un X 100to',
  //     image: require('../Assets/Images/featured3.png'),
  //   },
  //   {
  //     id: '4',
  //     title: 'Mega Hit Mix',
  //     image: require('../Assets/Images/radio.png'),
  //   },
  //   {
  //     id: '5',
  //     title: 'Daily Mix 1',
  //     image: require('../Assets/Images/recent1.png'),
  //   },
  //   {
  //     id: '6',
  //     title: 'La Bede - Remix',
  //     image: require('../Assets/Images/release2.png'),
  //   },
  //   {
  //     id: '7',
  //     title: 'Un X 100to',
  //     image: require('../Assets/Images/recent3.png'),
  //   },
  //   {
  //     id: '8',
  //     title: 'La Bede - Remix',
  //     image: require('../Assets/Images/artist.png'),
  //   },
  //   {
  //     id: '9',
  //     title: 'Daily Mix 1',
  //     image: require('../Assets/Images/recent4.png'),
  //   },
  // ];

  return (
    <>
      {isLoading ? <ActivityIndicator style={{ marginTop: verticalScale(20) }} size={"large"} color={Color.white} /> :

        (<View style={styles.container}>
          <CustomText
            children={"Recently Played"}
            style={styles.heading}
          />
          <FlatList
            data={data}
            contentContainerStyle={{
              width: windowWidth * 0.9,

              height: windowHeight * 0.38,
            }}
            numColumns={3}
            keyExtractor={item => item.id}
            // horizontal={true}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              return (
                <ArtistCard
                  fromrecent={true}
                  onPress={() => {
                    // navigationService.navigate("RecentlyPlayed")
                  }}
                  image={{ uri: `${baseUrl}/storage/${item?.track?.cover_image}` }}
                  title={item?.track?.title}
                  key={item.id}
                />
              );

            }}
            ListEmptyComponent={<CustomText style={{
              fontSize: moderateScale(13, .6),
              color: Color.lightGrey,
              textAlign: 'center'
            }}> No recent activity</CustomText>}
          />
        </View>)

      }
    </>
  )
}

export default RecentlyPlayedSongsList

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    gap: scale(20),
    marginTop: verticalScale(15),
    paddingLeft: scale(13)
  },
  heading: {
    fontSize: moderateScale(15, 0.2),
    color: Color.white,
    // backgroundColor: 'red',
    // lineHeight: moderateScale(10)
  }
})