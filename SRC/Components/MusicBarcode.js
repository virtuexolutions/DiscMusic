import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import { baseUrl } from '../Config';
import BackButton from './BackButton';
import { moderateScale } from 'react-native-size-matters';
import QRCode from 'react-native-qrcode-svg';

const MusicBarcode = (props) => {
  const track = props?.route?.params?.track;
  console.log(track, "<<<<<<<<<<<<<<<<<<<<<<< ============== trackId")
  // Remove the fake bars generation
  const qrValue = JSON.stringify({
    id: track?.id,
    title: track?.title,
    artist: track?.artist?.name || 'Unknown Artist'
  });

  const imageSource = track?.artwork
    ? { uri: track.artwork }
    : track?.cover_image
      ? { uri: `${baseUrl}/storage/${track.cover_image}` }
      : require('../Assets/Images/music4.png');

  return (
    <View style={styles.mainContainer}>
      <BackButton />
      <View style={styles.imageContainer}>
        <CustomImage style={{
          height: '100%',
          width: '100%',
          // resizeMode:'contain'
        }} source={imageSource}
        />
      </View>

      <View style={[styles.container,]}>
        <View style={styles.codeWrapper}>
          <View style={styles.qrContainer}>
            <QRCode
              value={qrValue}
              size={120}
              color={Color.white}
              backgroundColor="transparent"
              logo={require('../Assets/Images/logoSplash.png')}
              logoSize={30}
              logoBackgroundColor={Color.black}
              logoBorderRadius={15}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.black,
    paddingVertical: moderateScale(12.6),
    paddingHorizontal: moderateScale(16, .6),
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: moderateScale(12, .6),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  imageContainer:
  {
    height: windowHeight * 0.23,
    width: windowWidth * 0.5,
    backgroundColor: 'red',
    alignSelf: 'center',
    borderRadius: moderateScale(20, 0.2),
    overflow: 'hidden',
    marginTop: windowHeight * 0.25
  },
  mainContainer: {
    paddingHorizontal: moderateScale(20, .6),
    paddingTop: windowHeight * 0.05,
    backgroundColor: Color.black,
    width: windowWidth,
    height: windowHeight,
  },
  codeWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10, 0.6)
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: Color.black,
    borderRadius: 10,
  }
});

export default MusicBarcode;
