import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import { baseUrl } from '../Config';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';




const MusicBarcode = (props) => {
  const track = props?.route?.params?.track;
  const navigation = useNavigation();

  const [encryptedQrValue, setEncryptedQrValue] = useState(null)

  const imageSource = track?.artwork
    ? { uri: track.artwork }
    : track?.cover_image
      ? { uri: `${baseUrl}/storage/${track.cover_image}` }
      : require('../Assets/Images/music4.png');

  useEffect(() => {
    try {
      const rawData = {
        appId: 'DISCMUSIC_APP',
        id: track?.id,
        title: track?.title,
        artist: track?.artist?.name || track?.artist,
        cover_image: track?.artwork || (track?.cover_image ? `${baseUrl}/storage/${track.cover_image}` : null),
      };

      const qrString = JSON.stringify(rawData); // ✅ string banao
      setEncryptedQrValue(qrString);            // ✅ string set karo
      console.log('✅ QR Data:', qrString);
    } catch (e) {
      console.log('❌ Error:', e);
    }
  }, [track]);

  // Waveform bars generation
  const bars = useMemo(() => {
    const seed = (track?.id || 0) + (track?.title?.length || 5);
    const barCount = 28;
    const result = [];
    for (let i = 0; i < barCount; i++) {
      const h1 = Math.sin(seed * 0.7 + i * 0.9) * 0.35;
      const h2 = Math.cos(seed * 0.3 + i * 1.3) * 0.25;
      const h3 = Math.sin(seed * 1.1 + i * 0.5) * 0.15;
      const height = 0.3 + Math.abs(h1 + h2 + h3);
      result.push(Math.min(height, 1));
    }
    return result;
  }, [track?.id, track?.title]);
  console.log(`${baseUrl}/storage/${track?.cover_image}`, 'track?.cover_image');

  return (
    <View style={styles.screenContainer}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Close button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Feather name="x" size={scale(22)} color={Color.white} />
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <View style={styles.cardInner}>

          {/* ✅ QR Code — Encoded data ke saath, track image center mein */}
          <View style={styles.artworkContainer}>
            <CustomImage source={{ uri: `${baseUrl}/storage/${track?.cover_image}` }} style={{ width: '100%', height: '100%' }} />
            {/* {encryptedQrValue ? (
              <QRCode
                value={encryptedQrValue}
                size={scale(150)}
                logo={imageSource}
                logoSize={50}
                logoBackgroundColor="white"
                logoBorderRadius={5}
                color={Color.white}
                backgroundColor="transparent"
              />
            ) : (
              <CustomText style={{ color: Color.white }}>Loading...</CustomText>
            )} */}
          </View>

          {/* Track Title */}
          <View style={styles.trackInfoOverlay}>

            <CustomText
              style={styles.trackTitle}
              numberOfLines={1}
            >
              {track?.title || 'Unknown Track'}
            </CustomText>
          </View>

          {/* Barcode section — logo + waveform */}
          <View style={styles.barcodeSection}>
            <View style={styles.logoContainer}>
              <CustomImage
                style={styles.logo}
                source={require('../Assets/Images/logoSplash.png')}
              />
            </View>
            <CustomText style={{ color: Color.white, fontSize: moderateScale(18, 0.3), paddingHorizontal: moderateScale(6, .6) }}>{track?.track_no}</CustomText>
            {/* <View style={styles.waveformContainer}>
              {bars.map((height, index) => (
                <View
                  key={index}
                  style={[
                    styles.bar,
                    { height: scale(4 + height * 20) },
                  ]}
                />
              ))} */}
            {/* </View> */}
          </View>

        </View>
      </View>

      <CustomText style={styles.instructionText}>
        {'Point your camera at\na DiscMusic code.'}
      </CustomText>

    </View >
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#111111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: verticalScale(45),
    right: scale(20),
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cardContainer: {
    alignItems: 'center',
    marginTop: verticalScale(-30),
    width: windowWidth * 0.62,
    borderWidth: 0.4,
    borderColor: '#fff',
    borderRadius: moderateScale(20, .6),
    height: windowHeight * 0.35,
  },
  cardInner: {
    height: '100%',
    width: '100%',
    backgroundColor: '#282C30',
    borderRadius: moderateScale(20, 0.3),
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },
  artworkContainer: {
    height: windowHeight * 0.24,
    width: windowWidth * 0.6,
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: moderateScale(14, 0.3),
    overflow: 'hidden',
    // backgroundColor: 'red'
  },
  trackInfoOverlay: {
    // position: 'absolute',
    // bottom: scale(65),
    // left: scale(10),
    // backgroundColor: 'red',
    width: '90%',
    // height: '100%'
  },
  trackTitle: {
    color: Color.white,
    fontSize: moderateScale(13, 0.3),
    fontWeight: '700',
    paddingHorizontal: moderateScale(10, .3),
    paddingVertical: moderateScale(5, .6),
    // width: '80%'
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  barcodeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(10),
    // marginTop: verticalScale(10),
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: moderateScale(12, 0.3),
    gap: scale(10),
  },
  logoContainer: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  waveformContainer: {
    width: windowWidth * 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: scale(28),
  },
  bar: {
    width: scale(3),
    backgroundColor: Color.white,
    borderRadius: scale(1.5),
  },
  instructionText: {
    color: Color.white,
    fontSize: moderateScale(18, 0.3),
    fontWeight: '600',
    textAlign: 'center',
    marginTop: verticalScale(22),
    lineHeight: moderateScale(26, 0.3),
  },
});

export default MusicBarcode;

