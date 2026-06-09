import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TrackPlayer, { useActiveTrack } from 'react-native-track-player'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomButton from '../Components/CustomButton'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomText from '../Components/CustomText'
import IconWithText from '../Components/IconWithText'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import ThemeIconButton from '../Components/ThemeIconButton'
import { baseUrl } from '../Config'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'
import PlaylistBottomSheet from '../Components/PlaylistBottomSheet'
import { setPlaylistTrack } from '../Store/slices/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PlayList from '../Components/PlayList'

const DownloadTrack = () => {
    const token = useSelector(state => state.authReducer.token
    )
    const activeSong = useSelector(state => state.commonReducer.activeSong)
    // const isFoucs 
    const modalRef = useRef(null);
    const isFoucs = useIsFocused()
    const activeTrack = useActiveTrack()
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [artistList, setArtistList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);




    const [downloadedTracks, setDownloadedTracks] = useState([]);
    console.log("🚀aaaaaaaaaaaaaaaaaaaaaaaaaa ~ DownloadTrack ~ downloadedTracks:", downloadedTracks)


    const loadDownloadedSongs = async () => {
        const storedMap = await AsyncStorage.getItem('@offline_tracks_map');
        console.log("hfahdfjha sjdfhjah sdkfjhas download", storedMap)
        if (storedMap) {
            const map = JSON.parse(storedMap);
            const tracksArray = Object.keys(map).map(id => {
                const trackData = map[id];
                console.log("🚀 ~ loadDownloadedSongs ~ trackData:", trackData)
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
        console.log("downloadedTracks", downloadedTracks)
        loadDownloadedSongs();
    }, [isFoucs]);

    const playOfflineTrack = async (track) => {
        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.play();
    };

    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                <CustomHeader text={"downloads"}
                    // leftIcon={true}
                    // user={true}
                    // titlStyle={{
                    //     width: windowWidth * 0.4
                    // }}
                    leftIcon={true}
                    showBack={true}
                    text2={downloadedTracks.length}

                // text={'downloads'}


                />


                <PlayList title={''} trackData={downloadedTracks} from={'home'} download={true} />
                {downloadedTracks.length == 0 && <><CustomText style={{
                    fontSize: moderateScale(13, .6),
                    color: Color.mediumGray
                }}>
                    No Downloads Yet


                </CustomText>
                    <CustomText style={{
                        fontSize: moderateScale(12, .6),
                        color: Color.mediumGray,
                        textAlign: 'center',
                        width: windowWidth * 0.6
                    }}>Your downloaded items will appear here once you download them.</CustomText></>}
                {/* <FlatList
                    data={downloadedTracks}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: moderateScale(100, 0.6), paddingTop: moderateScale(10, 0.3) }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => playOfflineTrack(item)}>
                            <CustomImage
                                source={item.artwork ? { uri: item.artwork } : require('../Assets/Images/artist7.png')}
                                style={styles.cardImage}
                            />
                            <View style={styles.cardTextContainer}>
                                <CustomText style={styles.songName} numberOfLines={1}>{item.title || `Song ${item.id}`}</CustomText>
                                <CustomText style={styles.artistName} numberOfLines={1}>{item.artist || 'Offline Artist'}</CustomText>
                            </View>
                        </TouchableOpacity>
                    )}
                /> */}
            </ImageBackground>

            <PlaylistBottomSheet
                rbRef={modalRef}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    )
}



export default DownloadTrack

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: scale(20),
        width: windowWidth,
        paddingVertical: verticalScale(10)
    },
    text1: {
        fontSize: moderateScale(14, 0.2),
        fontWeight: "500"
    },
    card: {
        width: windowWidth * 0.92,
        height: windowHeight * 0.072,
        backgroundColor: '#282C30',
        borderRadius: moderateScale(12, 0.3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        marginBottom: moderateScale(10, 0.3),
        alignSelf: 'center',
    },
    cardImage: {
        width: windowHeight * 0.06,
        height: windowHeight * 0.06,
        borderRadius: moderateScale(8, 0.3),
    },
    cardTextContainer: {
        marginLeft: scale(12),
        width: '75%',
    },
    songName: {
        color: Color.white,
        fontSize: moderateScale(13, 0.3),
        fontWeight: '600',
    },
    artistName: {
        color: '#B0B0B0',
        fontSize: moderateScale(11, 0.3),
        marginTop: moderateScale(2, 0.3),
    },
})