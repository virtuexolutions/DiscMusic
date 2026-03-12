import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

const MusicDetailsScreen = ({ route }) => {
    const { item } = route.params;
    console.log('item====================== >>>>>>> item from music detail', item);
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    console.log('mmmmmmmmmmmmmmmmmmmm ', playbackState.state)
    const songsList = [
        {
            id: '1',
            image: require('../Assets/Images/bottom.png'),
            title: 'Someone to Be Around',
            type: 'song | Six60',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
            duration: 402,
        },
        {
            id: '2',
            image: require('../Assets/Images/recent1.png'),
            title: 'Miss You',
            type: 'song | Oliver Tree',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
            // url: 'https://www.zedge.net/notification-sounds/a03bfc80-eb9c-4fb6-84ec-c3940f10bc0a',
        },
        {
            id: '3',
            image: require('../Assets/Images/artist1.png'),
            title: "Don't remind me i'm minding me",
            type: 'playlist | PlaylistM7',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '4',
            image: require('../Assets/Images/recent2.png'),
            title: 'Mega Hit Mix',
            type: 'playlist | Spotify',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '5',
            image: require('../Assets/Images/recent3.png'),
            title: 'One Kiss (With Dua Lipa)',
            type: 'song | Calvin Harris',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '6',
            image: require('../Assets/Images/recent4.png'),
            title: 'Heather',
            type: 'song | Conan Gray',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '7',
            image: require('../Assets/Images/release2.png'),
            title: 'Catching Feelings',
            type: 'song | Calvin Harris',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '8',
            image: require('../Assets/Images/release3.png'),
            title: "Don't Forget Your Roots - 2021",
            type: 'playlist | PlaylistM7',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        },
        {
            id: '9',
            image: require('../Assets/Images/release4.png'),
            title: 'Before You Leave',
            url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
            type: 'song | Conan Gray',
        },
    ];


    // const handlePlayAll = async () => {
    //     // if (isPlayerReady) {
    //     await playPlaylist(songsList);
    //     // }
    // };
    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.black}
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
                            source={require('../Assets/Images/playlist_image.png')}
                        />
                    </View>
                    <View style={styles.actions}>
                        <TitleWithDescription
                            style={styles.textContainer}
                            title={"Miss You"}
                            titleStyle={styles.text1}
                            descriptionStyle={styles.text2}
                            description='oliver tree, robin schulz'
                        />

                        <ThemeIconButton
                            isGradient={true}
                            gradientColors={Color.themeGradient}
                            iconName={"hearto"}
                            iconType={AntDesign}

                        />
                        <ThemeIconButton
                            onPress={() => {
                                // if (isPlaying) {
                                //     TrackPlayer.pause();
                                // } else {
                                //     handlePlayAll();
                                // }
                            }}
                            isGradient={true}
                            gradientColors={Color.themeGradient2}
                            iconSource={State.Playing ? require("../Assets/Images/pause.png") : require("../Assets/Images/play-circle.png")}
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
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/shuffle.png")}
                        />
                        <ThemeIconButton
                            style={styles.iconBtn}
                            iconSource={require("../Assets/Images/import.png")}
                        />
                        <ThemeIconButton
                            style={styles.iconBtn}
                            iconName={"dots-three-vertical"}
                            iconType={Entypo}
                        />
                    </View>
                    <PlayList trackData={item} />
                    <RecentlyPlayedSongsList />
                </ScrollView>
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