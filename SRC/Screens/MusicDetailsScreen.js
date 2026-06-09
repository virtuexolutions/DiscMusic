import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import MusicModal from '../Components/MusicModal'
import { OfflineManager, playPlaylist } from '../Components/MusicPlayerController'
import PermiumModal from '../Components/PermiumModal'
import PlayList from '../Components/PlayList'
import RecentlyPlayedSongsList from '../Components/RecentlyPlayedSongsList'
import ThemeIconButton from '../Components/ThemeIconButton'
import TitleWithDescription from '../Components/TitleWithDescription'
import { useLikeTrack } from '../Hooks/useLikeTrack'
import { windowHeight, windowWidth } from '../Utillity/utils'
import ShuffleButton from '../Components/ShuffleButton'
import { baseUrl } from '../Config'
// import { useLikeTrack } from '../Components/useLikeTrack'


const MusicDetailsScreen = ({ route }) => {
    console.log("🚀 ~ MusicDetailsScreen ~ route:", route.params)
    const { item, image_url, from, artisdata } = route.params;
    console.log("🚀 ~ MusicDetailsScreen ~ item:", artisdata)
    const token = useSelector(state => state.authReducer.token)
    const userData = useSelector(state =>
        state.commonReducer.userData)

    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    // const userSub = [{ id: 1, package: 'premium' }]
    const isFoucs = useIsFocused();
    const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isShuffleClicked, setIsShuffleClicked] = useState('')
    const [downloadedTracks, setDownloadedTracks] = useState([]);

    const [progress, setProgress] = useState(0);
    console.log("🚀 ~ MusicDetailsScreen ~ progress:", progress)
    const [isDownloaded, setIsDownloaded] = useState(false);

    const rbRef = useRef(null);
    const rb = useRef(null);

    const handlePlayAll = async () => {
        // if (isPlayerReady) {
        await playPlaylist(item);
        // }
    };


    const recentlyPlayed = async () => {
        const url = 'auth/recently-played'
        setIsLoading(true)
        const response = await Get(url, token)
        setIsLoading(false)

        if (response != undefined) {
            setRecentlyPlayedSongs(response?.data?.data?.recently_played)
        }
    };


    useEffect(() => {
        recentlyPlayed()
    }, [])


    // const loadDownloadedSongs = async () => {
    //     const storedMap = await AsyncStorage.getItem('@offline_tracks_map');
    //     console.log("hfahdfjha sjdfhjah sdkfjhas download", storedMap)
    //     if (storedMap) {
    //         const map = JSON.parse(storedMap);
    //         const tracksArray = Object.keys(map).map(id => {
    //             const trackData = map[id];
    //             console.log("🚀 ~ loadDownloadedSongs ~ trackData:", trackData)
    //             if (typeof trackData === 'string') {
    //                 return {
    //                     id: id,
    //                     url: trackData,
    //                     title: `Song ${id}`,
    //                     artist: 'Offline Artist',
    //                 };
    //             }
    //             return trackData;
    //         });

    //         setDownloadedTracks(tracksArray);
    //     }
    // };
    // useEffect(() => {
    //     console.log("downloadedTracks", downloadedTracks)
    //     loadDownloadedSongs();
    // }, [isFoucs]);

    const handleDownload = async () => {
        const path = await OfflineManager.downloadTrack(track, (p) => {
            setProgress(p.toFixed(0));
        });
        if (path) setIsDownloaded(true);
    };
    return (

        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}
                imageStyle={styles.image}>
                <CustomHeader
                    leftIcon
                    RightIcon
                    showBack={true}
                    dots={true}
                />
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        gap: verticalScale(20),
                        alignItems: 'center',
                        paddingBottom: verticalScale(80)
                    }}>

                    <View style={styles.imageContainer}>
                        <CustomImage
                            style={styles.image}
                            // source={{ uri: from == 'home' ? activeTrack?.cover_image ? activeTrack?.cover_image : item?.[0]?.cover_image : image_url }}
                            source={{ uri: image_url ? image_url : `${baseUrl}/storage/${item[0]?.cover_image}` }}
                        />
                    </View>

                    <View style={styles.actions}>
                        {/* {from == 'home' &&
                            <TitleWithDescription
                                style={styles.textContainer}
                                title={activeTrack?.cover_image ? activeTrack?.title : item?.[0]?.title}
                                titleStyle={styles.text1}
                                descriptionStyle={styles.text2}
                                description={activeTrack?.artist ? activeTrack?.artist : item?.[0]?.artist}
                            />} */}

                        {/* {from != 'home' && <LikeButton track={item} style={styles.iconButton2} />} */}
                        {/* <ThemeIconButton
                            isGradient={true}
                            gradientColors={Color.themeGradient}
                            iconName={isLiked ? "heart" : "hearto"}
                            iconType={AntDesign}
                            onPress={toggleLike}
                            disabled={likeLoading}
                            iconColor={isLiked ? Color.red : Color.white}
                        /> */}

                        <ThemeIconButton
                            onPress={() => {
                                if (isPlaying) {
                                    TrackPlayer.pause();
                                } else {
                                    handlePlayAll();
                                }
                            }}
                            isGradient={true}
                            gradientColors={Color.themeGradient2}
                            iconSource={isPlaying ? require("../Assets/Images/pause.png") : require("../Assets/Images/play-circle.png")}
                        />
                    </View>
                    <View style={[styles.actions2]}>
                        <CustomImage
                            source={require('../Assets/Images/shapes3.png')}
                            style={styles.logo}
                        />
                        <TitleWithDescription
                            style={[styles.textContainer, { width: "60%" }]}
                            title={"Music"}
                            titleStyle={styles.text1}
                            descriptionStyle={styles.text2}
                            description=''
                        />

                        <ShuffleButton iconSize={moderateScale(20, .6)}
                        />
                        {/* <ThemeIconButton
                            onPress={() => {
                                rbRef.current.open()
                                setIsShuffleClicked('shuffle')
                            }}
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/shuffle.png")}
                        /> */}
                        <ThemeIconButton
                            onPress={() => {
                                if (userData?.subscriptions?.length > 0) {
                                    console.log("🚀 ~ MusicDetailsScreen ~ userSub:")
                                    // console.log("🚀 ~ MusicDetailsScreen ~ userSub:", userSub.length)
                                    handleDownload(item[0])
                                } else {
                                    console.log("🚀 ~ MusicDetailsScreen ~ no sub :")

                                    rbRef.current.open(),
                                        setIsShuffleClicked('import')
                                }
                            }}
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/import.png")}
                        />
                        {/* <ThemeIconButton
                            onPress={() => {
                                rb.current.open()
                            }}
                            style={styles.iconBtn}
                            iconName={"dots-three-vertical"}
                            iconType={Entypo}
                        /> */}
                        {/* <RepeatButton
                            style={styles.iconBtn}
                        /> */}
                    </View>
                    <PlayList trackData={item} from={'home'} artistData={artisdata} />
                    <RecentlyPlayedSongsList data={recentlyPlayedSongs} isLoading={isLoading} />
                </ScrollView>
                <MusicModal rbRef={rb} />
                <PermiumModal track={item} rbRef={rbRef} from={isShuffleClicked} item={item[0]} />
                {/* <MinimisedPlayer /> */}
            </ImageBackground >
        </>

    )
}

export default MusicDetailsScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    imageContainer: {
        width: windowWidth * 0.45,
        height: windowWidth * 0.45,
        overflow: "hidden",
        // backgroundColor: 'red',
        borderRadius: moderateScale(50, 0.3),
    },

    image: {
        width: '100%',
        height: '100%',
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // gap: scale(10),
        width: windowWidth * 0.89,
        // backgroundColor: 'red'
    },
    textContainer: {
        gap: scale(5),
        paddingVertical: 0,
        paddingHorizontal: 0,
        width: windowWidth * 0.5,
    },
    text1: {
        fontWeight: "600",
        textTransform: "capitalize",
        fontSize: moderateScale(14, 0.2),
        // lineHeight:moderateScale(14,0.2),
    },
    text2: {
        textTransform: "capitalize",
        fontSize: moderateScale(12, 0.2),
        lineHeight: moderateScale(14, 0.2),
    },
    iconBtn: {
        elevation: 0,
        width: "auto",
        height: "auto",
        paddingHorizontal: scale(10),
        backgroundColor: "transparent",
    },
    actions2: {
        flexDirection: "row",
        gap: scale(10),
        // paddingHorizontal: scale(10),
        width: windowWidth * 0.9,
        alignItems: "center",
    }
})