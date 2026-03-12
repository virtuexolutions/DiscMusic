import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { moderateScale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import { imageUrl } from '../Config';

const ITEM_SIZE = 140;
const SIDE_SIZE = 90;
const CarouselView = ({
  data
}) => {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ marginLeft: moderateScale(10, 0.6), marginEnd: moderateScale(10, 0.6) }}
        renderItem={({ index, item }) => {
          console.log('------------------ >>>>dataitemitemitem', JSON.stringify(item, null, 2))
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('first');
                // navigation.navigate('MusicPlayerScreen');
                navigation.navigate('ViewArtistLibrary', { artistData: item });

              }}
              style={styles.circleContainer}>
              <CustomImage
                onPress={() => {
                  console.log('first');
                  navigation.navigate('ViewArtistLibrary', { artistData: item });

                  // navigation.navigate('MusicPlayerScreen');
                }}
                source={{ uri: imageUrl + item?.user?.profile_image }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              // style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
              />
            </TouchableOpacity>
          );
        }}
      />
      {/* </View> */}
    </GestureHandlerRootView>
  );
};

export default CarouselView;

const styles = StyleSheet.create({
  circleContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.3,
    overflow: 'hidden',
    borderRadius: (windowWidth * 0.3) / 2,
    // backgroundColor: "#222",
    elevation: 5,
    borderWidth: 0.2,
    borderColor: "#11A8FD",
    marginRight: moderateScale(13, .6),
  },
});
