// import { useIsFocused } from '@react-navigation/native'
// import React, { useEffect, useRef, useState } from 'react'
// import { Alert, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
// import { launchImageLibrary } from 'react-native-image-picker'
// import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
// import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from 'react-native-vision-camera'
// import { useSelector } from 'react-redux'
// import Color from '../Assets/Utilities/Color'
// import { Get } from '../Axios/AxiosInterceptorFunction'

// import TextRecognition from '@react-native-ml-kit/text-recognition';
// import CustomHeader from '../Components/CustomHeader'
// import CustomImage from '../Components/CustomImage'
// import CustomStatusBar from '../Components/CustomStatusBar'
// import CustomText from '../Components/CustomText'
// import { windowHeight, windowWidth } from '../Utillity/utils'

// const ScanScreen = ({ navigation }) => {
//   const { hasPermission, requestPermission } = useCameraPermission();
//   // const device = useCameraDevice('back');
//   const isFocused = useIsFocused();
//   const [scanned, setScanned] = useState(false);


//   const camera = useRef(null);
//   const devices = useCameraDevices('back');
//   const device = devices.back;
//   // ✅ Token Redux se
//   const token = useSelector(state => state.authReducer.token);

//   useEffect(() => {
//     if (!hasPermission) {
//       requestPermission();
//     }
//   }, [hasPermission]);

//   const getTrackDetail = async (trackId) => {
//     try {
//       console.log('🔍 Track ID from QR:', trackId);
//       const url = `auth/track-detail/${trackId}`;
//       const response = await Get(url, token);

//       if (response != undefined) {
//         // ✅ Navigate karo
//         navigation.navigate('PlaylistScreen', { item: response?.data?.track_list });
//       } else {
//         Alert.alert('Error', 'something went wrong ');
//         setScanned(false);
//       }
//     } catch (e) {
//       console.error('Track Detail Error:', e);
//       setScanned(false);
//     }
//   };




//   const openGallery = async () => {
//     const result = await launchImageLibrary({ mediaType: 'photo' });
//     if (result.didCancel || !result.assets) return;

//     const uri = result.assets[0].uri;
//     try {
//       // const barcodes = await BarcodeScanning.scan(uri);
//       // if (barcodes.length > 0) {
//       console.log('🖼️ Gallery QR:', barcodes[0].value);
//       //   processScannedData(barcodes[0].value);
//       // } else {
//       //   Alert.alert('Error', 'Is image mein koi QR code nahi mila.');
//       // }
//     } catch (e) {
//       console.error('Gallery Scan Error:', e);
//       Alert.alert('Error', 'Image scan karne mein masla hua.');
//     }
//   };





//   const cameraRef = useRef(null);

//   useEffect(() => {
//     const interval = setInterval(async () => {
//       if (cameraRef.current && isFocused && !scanned) {
//         try {
//           const photo = await cameraRef.current.takePhoto({ flash: 'off' });
//           // const barcodes = await BarcodeScanning.scan(`file://${photo.path}`);
//           // if (barcodes.length > 0) {
//           console.log('📷 QR Scanned:', barcodes[0].value);
//           //   processScannedData(barcodes[0].value);
//           // }
//         } catch (e) { }
//       }
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [isFocused, scanned]);


//   const takePicture = async () => {
//     try {
//       setIsLoading(true);
//       if (!camera.current) return;

//       const photo = await camera.current.takePhoto({
//         qualityPrioritization: 'quality',
//         flash: 'auto',
//       });

//       const imagePath = `file://${photo.path}`;
//       const result = await TextRecognition.recognize(imagePath);

//       // Process the OCR result
//       if (result.text) {
//         console.log('📷 QR Scanned:', result.text);
//         // const permitData = parsePermitText(result.text);
//         // if (permitData) {
//         //   onPermitScanned(permitData);
//         // } else {
//         //   Alert.alert('Error', 'Could not detect valid permit information. Please try again.');
//         // }
//       }

//       // Clean up the temporary image file
//       //   await RNFS.unlink(imagePath);

//     } catch (error) {
//       Alert.alert('Error', 'Failed to process permit. Please try again.');
//       console.error('Permit scanning error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   return (
//     <>
//       <CustomStatusBar backgroundColor={Color.statusColor} barStyle={'light-content'} />
//       <ImageBackground source={require('../Assets/Images/bg.png')} style={styles.bg_container}>
//         <CustomHeader leftIcon={true} showBack={true} text={"Search"} />

//         <View style={styles.main}>
//           <View style={styles.container}>
//             <View style={styles.imgContainer}>
//               {device != null && hasPermission ? (
//                 <Camera
//                   ref={cameraRef}
//                   style={styles.image}
//                   device={device}
//                   isActive={isFocused && !scanned}
//                   // photo={true} 
//                   codeScanner={codeScanner} // ✅ zaruri hai
//                 />
//               ) : (
//                 <View style={styles.placeholderStyle}>
//                   <CustomImage style={styles.image} source={require("../Assets/Images/scan.png")} />
//                 </View>
//               )}
//             </View>
//             <CustomImage style={styles.waves} source={require("../Assets/Images/waves.png")} />
//           </View>

//           <CustomText style={styles.text1}>Point your camera at a music code</CustomText>

//           <TouchableOpacity onPress={openGallery} activeOpacity={0.7}>
//             <CustomText style={styles.text2}>Select from photos</CustomText>
//           </TouchableOpacity>
//         </View>
//       </ImageBackground>
//     </>
//   );
// };

// export default ScanScreen

// const styles = StyleSheet.create({
//   bg_container: {
//     width: windowWidth,
//     height: windowHeight,
//     alignItems: "center",
//   },
//   image: {
//     width: "100%",
//     height: "100%"
//   },
//   main: {
//     alignItems: "center",
//   },
//   container: {
//     marginTop: verticalScale(40),
//     backgroundColor: "rgba(0, 0, 0, 0.25)",
//     borderRadius: moderateScale(40, 0.2),
//     justifyContent: "center",
//     alignItems: "center",
//     gap: scale(40),
//     width: windowWidth,
//     paddingVertical: verticalScale(50)
//   },
//   imgContainer: {
//     width: windowWidth * 0.76,
//     height: windowHeight * 0.4,
//     overflow: "hidden",
//     borderRadius: moderateScale(40, 0.2),
//   },
//   placeholderStyle: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   waves: {
//     width: windowWidth * 0.45,
//     height: scale(30)
//   },
//   text1: {
//     marginTop: verticalScale(30),
//     fontSize: moderateScale(14, 0.2),
//     color: Color.white
//   },
//   text2: {
//     marginTop: verticalScale(10),
//     fontSize: moderateScale(10, 0.2),
//     lineHeight: moderateScale(14, 0.2),
//     color: Color.themeLightGray
//   }
// })


import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, ImageBackground, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Camera, useCameraDevice, useCameraDevices, useCameraPermission } from 'react-native-vision-camera'
import { useSelector } from 'react-redux'
import TextRecognition from '@react-native-ml-kit/text-recognition'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomText from '../Components/CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils'
import { Platform } from 'react-native'

const ScanScreen = ({ navigation }) => {
  const { hasPermission, requestPermission } = useCameraPermission()
  const isFocused = useIsFocused()
  const [scanned, setScanned] = useState(false)
  const cameraRef = useRef(null)
  const device = useCameraDevice('back')
  // const device = devices.back
  const token = useSelector(state => state.authReducer.token)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission])

  useEffect(() => {
    const interval = setInterval(async () => {
      if (cameraRef.current && isFocused && !scanned) {
        await takePicture()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isFocused, scanned])

  const processOcrResult = async (imagePath) => {
    const result = await TextRecognition.recognize(imagePath)

    if (result?.text) {
      const match = result.text.match(/DM(\S+)/)
      if (match && match[1]) {
        setScanned(true)
        console.log("🚀 ~ processOcrResult ~ match:", match)
        await getTrackDetail(match[0])
      } else {
        // Platform.OS == "android" ? ToastAndroid.show('No valid music code (DM) found. Please try again.', ToastAndroid.SHORT) : Alert.alert('Not Found', 'No valid music code (DM) found. Please try again.')
        setScanned(false)
      }
    } else {
      Platform.OS == "android" ? ToastAndroid.show('Could not read text from image. Please try again.', ToastAndroid.SHORT) : Alert.alert('Not Found', 'Could not read text from image. Please try again.')
      setScanned(false)
    }
  }

  const takePicture = async () => {
    try {
      if (!cameraRef.current) return

      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: 'quality',
        flash: 'off',
      })

      await processOcrResult(`file://${photo.path}`)
    } catch (error) {
      console.error('Camera Scan Error:', error)
    }
  }

  const openGallery = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' })
    if (result.didCancel || !result.assets) return

    const uri = result.assets[0].uri
    try {
      setScanned(true) // pause camera while processing
      await processOcrResult(uri)
    } catch (error) {
      console.error('Gallery Scan Error:', error)
      Platform.OS == "android" ? ToastAndroid.show('Could not process the selected image.', ToastAndroid.SHORT) : Alert.alert('Error', 'Could not process the selected image.')
      setScanned(false)
    }
  }

  const getTrackDetail = async (trackId) => {
    try {
      console.log('🔍 Track ID:', trackId)
      const url = `auth/track-detail/${trackId}`
      const response = await Get(url, token)
      console.log("🚀 ~ getTrackDetail ~ response:", response?.data)

      if (response != undefined) {
        navigation.navigate('PlaylistScreen', { item: response?.data?.track_list })
      } else {
        Platform.OS == "android" ? ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT) : Alert.alert('Error', 'Something went wrong. Please try again.')
        // Alert.alert('Error', 'Something went wrong. Please try again.')
        setScanned(false)
      }
    } catch (e) {
      console.error('Track Detail Error:', e)
      setScanned(false)
    }
  }

  return (
    <>
      <CustomStatusBar backgroundColor={Color.statusColor} barStyle={'light-content'} />
      <ImageBackground source={require('../Assets/Images/bg.png')} style={styles.bg_container}>
        <CustomHeader leftIcon={true} showBack={true} text={'Search'} />

        <View style={styles.main}>
          <View style={styles.container}>
            <View style={styles.imgContainer}>
              {/* {device != null && hasPermission ? */}
              <Camera
                ref={cameraRef}
                style={styles.image}
                device={device}
                isActive={isFocused && !scanned}
                photo={true}
              />
              {/* } */}
              {/* <View style={styles.placeholderStyle}>
                  <CustomImage style={styles.image} source={require('../Assets/Images/scan.png')} />
                </View> */}
              {/* )} */}
            </View>
            <CustomImage style={styles.waves} source={require('../Assets/Images/waves.png')} />
          </View>

          <CustomText style={styles.text1}>Point your camera at a music code</CustomText>

          <TouchableOpacity onPress={openGallery} activeOpacity={0.7}>
            <CustomText style={styles.text2}>Select from photos</CustomText>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  )
}

export default ScanScreen

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  main: {
    alignItems: 'center',
  },
  container: {
    marginTop: verticalScale(40),
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: moderateScale(40, 0.2),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(40),
    width: windowWidth,
    paddingVertical: verticalScale(50),
  },
  imgContainer: {
    width: windowWidth * 0.76,
    height: windowHeight * 0.4,
    overflow: 'hidden',
    borderRadius: moderateScale(40, 0.2),
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  waves: {
    width: windowWidth * 0.45,
    height: scale(30),
  },
  text1: {
    marginTop: verticalScale(30),
    fontSize: moderateScale(14, 0.2),
    color: Color.white,
  },
  text2: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(10, 0.2),
    lineHeight: moderateScale(14, 0.2),
    color: Color.themeLightGray,
  },
})