import { Alert, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Label from './Label'
import TitleWithDescription from './TitleWithDescription'
import ToggleSwitchWithInfo from './ToggleSwitchWithInfo'
import CustomText from './CustomText'
import IconWithText from './IconWithText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { windowWidth } from '../Utillity/utils'
import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { OfflineManager } from './MusicPlayerController'

const StorageSettings = () => {

  const [isToggle, setIsToggle] = useState(false)
  const [removeDownloadsToggle, setRemoveDownloadsToggle] = useState(false);
  const [cacheSize, setCacheSize] = useState("0.0");
  const [storageData, setStorageData] = useState(null);

  const [downloadedTracks, setDownloadedTracks] = useState([]);


  const clearCache = async () => {
    try {
      const cachePath = RNFS.CachesDirectoryPath;
      const exists = await RNFS.exists(cachePath);

      if (!exists) {
        console.log("Cache directory path does not exist.");
        return;
      }

      const files = await RNFS.readDir(cachePath);
      console.log('Files found in cache:', files);

      if (files.length > 0) {
        // Tamam files ko delete karne ka wait karein
        await Promise.all(
          files.map(file =>
            RNFS.unlink(file.path).catch(err => console.log(`Error deleting ${file.name}:`, err))
          )
        );
      }

      // Toggle ko loop se bahar rakhein taake loop na chalne par bhi state update ho
      setIsToggle(prev => !prev);
      console.log("Cache cleaning process finished.");

    } catch (err) {
      console.log("Cache clear error:", err);
    }
  };

  const calculateCacheSize = async () => {
    try {
      const cachePath = RNFS.CachesDirectoryPath; // App ka cache folder
      const files = await RNFS.readDir(cachePath);

      let totalBytes = 0;

      // Har file/folder ka size check karein
      for (let file of files) {
        if (file.isFile()) {
          totalBytes += parseInt(file.size);
        }
      }

      // Bytes ko GB mein convert karein
      // Note: Shuru mein size kam hoga toh MB behtar lagega
      const sizeInGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(2);

      return sizeInGB; // Yeh value aapke cacheSize state mein jayegi
    } catch (error) {
      console.error("Error calculating cache:", error);
      return "0.0";
    }
  };

  const loadDownloadedSongs = async () => {
    const storedMap = await AsyncStorage.getItem('@offline_tracks_map');
    console.log("hfahdfjha sjdfhjah sdkfjhas download", storedMap)
    if (storedMap) {
      const map = JSON.parse(storedMap);
      const tracksArray = Object.keys(map).map(id => {
        const trackData = map[id];
        if (typeof trackData === 'string') {
          return {
            id: id,
            url: trackData,
            title: `Song ${id}`,
            artist: 'Offline Artist',
          };
        }
        return trackData;
      });

      setDownloadedTracks(tracksArray);
    }
  };
  useEffect(() => {
    // console.log("downloadedTracks", downloadedTracks)
    loadDownloadedSongs();
  }, []);
  useEffect(() => {
    const fetchStorageDetails = async () => {
      const info = await RNFS.getFSInfo();
      const storageData = info
      const toGB = (bytes) => (bytes / (1024 * 1024 * 1024)).toFixed(1);
      const total = toGB(storageData.totalSpace);
      const free = toGB(storageData.freeSpace);
      const usedSpace = (storageData.totalSpace - storageData.freeSpace);
      const otherApps = toGB(usedSpace);
      setStorageData({
        totalSpace: total,
        freeSpace: free,
        usedSpace: otherApps
      });

      const size = await calculateCacheSize();
      setCacheSize(size);
    };
    fetchStorageDetails();
  }, []);

  const handleRemoveAll = async (downloadedTracksArray) => {
    console.log("🚀 ~ handleRemoveAll ~ downloadedTracksArray:", downloadedTracksArray)
    // downloadedTracksArray aapka wo data hai jo downloads screen par dikh raha hai
    for (const track of downloadedTracksArray) {
      await OfflineManager.deleteAllTracks(downloadedTracksArray);
      setRemoveDownloadsToggle(prev => !prev);
    }
    // alert("Sab delete ho gaya!");
    Platform.OS == 'android' ? ToastAndroid.show('Downloads are deleted successfully!', ToastAndroid.SHORT) : Alert.alert('Downloads are deleted successfully!');
  };


  return (
    <View style={styles.container}>
      <Label
        style={styles.label}
        text={"Storage"}
      />
      <View style={styles.container2}>
        <View style={styles.row}>
          <IconWithText
            iconSource={require("../Assets/Images/category.png")}
            text='Other apps'
          />
          <CustomText
            style={styles.text}
            children={`${storageData?.usedSpace} GB`}
          />
        </View>
        <View style={styles.row}>
          <IconWithText
            iconSource={require("../Assets/Images/trash.png")}
            text='Cache'
          />
          <CustomText
            style={styles.text}
            children={`${cacheSize} GB`}
          />
        </View>
        <View style={styles.row}>
          <IconWithText
            iconSource={require("../Assets/Images/folder-open.png")}
            text='Free'
          />
          <CustomText
            style={styles.text}
            children={`${storageData?.freeSpace} GB`}
          />
        </View>
      </View>
      <ToggleSwitchWithInfo
        title='Remove all downloads'
        description='Remove all of the DiscMusic content you have downloaded for offline use.'
        on={false}
        onToggle={() => {
          downloadedTracks?.length == 0 ?
            Platform.OS == 'android' ? ToastAndroid.show(`No Downloads Available!`, ToastAndroid.SHORT) : Alert.alert('No Downloads Available!')
            : handleRemoveAll(downloadedTracks)
          // setAudioQuality(prev => !prev)
        }}
      />
      <ToggleSwitchWithInfo
        title='Clear cache'
        description='You can free up storage by clearing your cache. your downloads won’t be removed.'
        on={isToggle}
        onToggle={() => {
          clearCache()
          // setIsToggle(!isToggle)
        }}
      />
    </View>
  )
}

export default StorageSettings

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // backgroundColor:Color.red,
    marginTop: verticalScale(8)
  },

  container2: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: moderateScale(25, 0.2),
    paddingHorizontal: scale(20),
    width: windowWidth * 0.7,
    paddingVertical: verticalScale(10),
  },
  label: {
    marginVertical: verticalScale(8),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: verticalScale(8)
  },
  text: {
    fontSize: moderateScale(10, 0.2),
    lineHeight: moderateScale(18, 0.2),
    color: Color.white
  }
})