import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomHeader from '../Components/CustomHeader'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from '../Components/CustomImage'
import ThemeIconButton from '../Components/ThemeIconButton'
import Color from '../Assets/Utilities/Color'
import TitleWithDescription from '../Components/TitleWithDescription'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import RecentlyPlayedSongsList from '../Components/RecentlyPlayedSongsList'
import PlayList from '../Components/PlayList'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import { playPlaylist } from '../Components/MusicPlayerController'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { baseUrl } from '../Config'
import { Get } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'
import { useLikeTrack } from '../Hooks/useLikeTrack'
import LikeButton from '../Components/LikeButton'
import PermiumModal from '../Components/PermiumModal'
import MusicModal from '../Components/MusicModal'
// import { useLikeTrack } from '../Components/useLikeTrack'


const MusicDetailsScreen = ({ route }) => {
    const { item, image_url } = route.params;

    console.log('item====================== >>>>>>> item from music detailscreen ', image_url);
    const token = useSelector(state => state.authReducer.token)
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;


    const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isShuffleClicked, setIsShuffleClicked] = useState('')

    const { toggleLike, loading: likeLoading, isLiked } = useLikeTrack(item);
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
        console.log('recentlyPlayedSongs====================== >>>>>>> ', JSON.stringify(response?.data?.data?.recently_played, null, 2))
        setIsLoading(false)

        if (response != undefined) {
            setRecentlyPlayedSongs(response?.data?.data?.recently_played)
        }
    };


    useEffect(() => {
        recentlyPlayed()
    }, [])
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
                            source={{ uri: image_url }}
                        />
                    </View>
                    <View style={styles.actions}>
                        {/* <TitleWithDescription
                            style={styles.textContainer}
                            title={"Miss You"}
                            titleStyle={styles.text1}
                            descriptionStyle={styles.text2}
                            description='oliver tree, robin schulz'
                        /> */}

                        <LikeButton track={item} style={styles.iconButton2} />
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
                            style={[styles.textContainer, { width: "45%" }]}
                            title={"Miusic"}
                            titleStyle={styles.text1}
                            descriptionStyle={styles.text2}
                            description='178,426 likes | 3h 25min'
                        />

                        <ThemeIconButton
                            onPress={() => {
                                rbRef.current.open()
                                setIsShuffleClicked('shuffle')
                            }}
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/shuffle.png")}
                        />
                        <ThemeIconButton
                            onPress={() => {
                                rbRef.current.open(),
                                    setIsShuffleClicked('import')
                            }}
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/import.png")}
                        />
                        <ThemeIconButton
                            onPress={() => {
                                rb.current.open()
                            }}
                            style={styles.iconBtn}
                            iconName={"dots-three-vertical"}
                            iconType={Entypo}
                        />
                    </View>
                    <PlayList trackData={item} />
                    <RecentlyPlayedSongsList data={recentlyPlayedSongs} isLoading={isLoading} />
                </ScrollView>
                <MusicModal rbRef={rb} />
                <PermiumModal track={item} rbRef={rbRef} from={isShuffleClicked} />
                {/* <MinimisedPlayer /> */}
            </ImageBackground>
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
        justifyContent: "center",
        gap: scale(10),
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

        width: windowWidth * 0.9,
        alignItems: "center",
    }
})