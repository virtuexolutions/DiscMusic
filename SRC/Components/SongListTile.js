import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import TitleWithDescription from './TitleWithDescription';
import CustomImage from './CustomImage';
import { Icon } from 'native-base';
import Color from '../Assets/Utilities/Color';
import Entypo from 'react-native-vector-icons/Entypo';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
const SongListTile = ({
  showMoreOption = false,
  image,
  title,
  subtitle,
  onPress,
  rbRef,
  from,
  addable,
  onMorePress,
  // addFunction
}) => {

  // console.log(addFunction, "addfunctionaddfunctionaddfunctionadd function")
  const handleAddSong = async () => {
    console.log('Pressed');
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <CustomImage onPress={onPress} source={image} style={styles.image} />
      </View>
      <TitleWithDescription onPress={onPress}
        style={styles.textContainer}
        title={title}
        description={subtitle}
        titleStyle={styles.text1}
        descriptionStyle={styles.text2}
      />
      {from != 'home' && <Icon style={{
        width: moderateScale(45, 0.6),
        height: moderateScale(45, 0.6),
        top: 10
      }} onPress={() => {
        console.log('Pressed');
        rbRef?.current?.open()
        // if (onMorePress) {
        //   onMorePress();
        // }
      }} name="dots-three-vertical" as={Entypo} color={Color.white} />
      }
      {addable && <TouchableOpacity
        // onPress={addFunction}
        style={{
          height: windowHeight * 0.017,
          width: windowHeight * 0.017,
          borderWidth: 1,
          borderColor: Color.mediumGray,
          borderRadius: windowHeight * 0.017 / 2,
          alignItems: 'center',
          justifyContent: 'center'

        }}>
        <Icon style={{

        }} onPress={() => {
          console.log('Pressed');
        }} name="plus" as={Entypo} color={Color.white} size={moderateScale(11, 0.2)} />
      </TouchableOpacity>}
    </TouchableOpacity>
  );
};

export default SongListTile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scale(5),
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  imageContainer: {
    width: scale(45),
    height: scale(45),
    overflow: 'hidden',
    borderRadius: scale(10),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: windowWidth * 0.7,
    paddingVertical: 0,
    // top: scale(-2),
    // gap: scale(),
  },
  text1: {
    textTransform: 'capitalize',
    fontSize: moderateScale(12, 0.2),
  },
  text2: {
    fontSize: moderateScale(10, 0.2),
  },
});
