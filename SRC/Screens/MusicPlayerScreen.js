import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import ThemeIconButton from '../Components/ThemeIconButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import CustomButton from '../Components/CustomButton'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import TitleWithDescription from '../Components/TitleWithDescription'
import PlayerSliderWithActions from '../Components/playerSliderWithActions'
import LyricsContainer from '../Components/LyricsContainer'
import RotatingDisc from '../Components/RotatingDisc'
import CircularMenu from '../Components/CircularMenu'
import { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { playPlaylist } from '../Components/MusicPlayerController'
import AudioSlider from '../Components/AudioSlider'
import { useSelector } from 'react-redux'
import { Post } from '../Axios/AxiosInterceptorFunction'
import LikeButton from '../Components/LikeButton'

const MusicPlayerScreen = () => {
    const token = useSelector((state) => state.authReducer.token);
    const track = useActiveTrack();
    // console.log('   fdhfkj sdf jksdhfkjshdkjfhksjdhfkjshdf hsdjk fhksdhkfhskdhf', track)

    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    // console.log('afaghfha gdfagdhfahf hag fhga fahdg ghdf', isPlaying)
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // console.log('track====================== >>>>>>> here from music player screen', track);



    useEffect(() => {
        const fetchLyrics = async () => {
            // Input check: agar artist ya song missing ho toh call na karein
            if (!track?.artist || !track?.url) return;

            setLoading(true);
            setError(null);

            try {
                // console.log('track====================== >>>>>>> here from try ,');
                const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(track?.artist)}&track_name=${encodeURIComponent(track?.title)}`;
                // const url = `https://lrclib.net/api/get?artist_name=${'Michael Jackson'}&track_name=${'They dont really care about us'}`;
                // console.log('response====================== >>>>>>> here from music url ', url, 'sdffsadfsdfsdfsdfsdf');

                const response = await fetch(url);
                // console.log("reeeeeeeeeeeeeeeeeeeeesssssssssssssssssponnnnnnnnnnnse", response)

                if (!response.ok) {
                    throw new Error("Sorry, lyrics are not available at the moment.");
                }

                const data = await response.json();
                // console.log('data====================== >>>>>>> here from music player screen', data);
                setLyrics(data.syncedLyrics || data.plainLyrics || "Sorry, lyrics are not available at the moment.");
            } catch (err) {
                setError(err.message);
                setLyrics("");
            } finally {
                setLoading(false);
            }
        };

        fetchLyrics();

        // Dependency array mein artist aur song daalna zaroori hai
    }, [track?.artist, track?.title]);

    // if (loading) return <p>Loading lyrics...</p>;
    // if (error) return <p style={{ color: 'red' }}>{error}</p>;


    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                <CustomHeader
                    leftIcon={true}
                    showBack={true}
                    RightIcon={true}
                    dots={true} />
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        paddingTop: verticalScale(10),
                        paddingBottom: verticalScale(100),
                    }}>
                    <RotatingDisc isPlaying={isPlaying ? true : false} image={track?.artwork} />
                    {/* <View style={styles.actions}>
                        <CustomButton
                            //   isGradient
                            isBold={true}
                            text={'Sad Vibes'}
                            textColor={Color.white}
                            onPress={() => { }}
                            style={styles.button}
                            borderColor={Color.white}
                            borderRadius={moderateScale(8, 0.2)}
                            fontSize={moderateScale(16, 0.3)}

                        />
                        <ThemeIconButton
                            style={styles.iconButton}
                            iconName={"chevron-down"}
                        />
                    </View> */}
                    <View style={styles.actions}>
                        <TitleWithDescription
                            disable={true}
                            title={track?.title}
                            titleStyle={styles.text1}
                            description={track?.artist}
                            descriptionStyle={styles.text2}
                        />
                        <View style={styles.innerView}>

                            <LikeButton track={track} style={styles.iconButton2} />
                            <ThemeIconButton
                                style={styles.iconButton2}
                                iconType={Feather}
                                iconSize={moderateScale(22, 0.2)}
                                iconName={"download"}
                                iconColor={Color.themeLightGray}
                            />
                        </View>
                    </View>
                    <PlayerSliderWithActions item={track} />
                    {/* <AudioSlider /> */}
                    <LyricsContainer lyrics={lyrics} loading={loading} error={error} />
                    <CircularMenu
                        containerStyle={styles.circularButton}
                    />
                </ScrollView>

            </ImageBackground>
        </>
    )
}

export default MusicPlayerScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        // alignItems: "center",
        // paddingHorizontal:scale(5)
    },

    actions: {
        width: windowWidth,
        paddingHorizontal: scale(20),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    innerView: {
        flexDirection: "row",
        gap: scale(13),
        // backgroundColor: "red",
        alignItems: "center"
    },
    iconButton: {
        elevation: 0,
        borderColor: Color.white,
        borderWidth: 1,
        borderRadius: moderateScale(17, 0.2)
    },
    iconButton2: {
        backgroundColor: "transparent",
        width: "auto",
        height: "auto",
        elevation: 0,
        // shadowColor: "transparent",
    },
    // bg_container: {
    //     width: windowWidth,
    //     height: windowHeight,
    //     alignItems: "center",
    //     // paddingHorizontal:scale(5)
    // },
    button: {
        borderWidth: 1,
        paddingHorizontal: scale(15),
        paddingVertical: verticalScale(4)
    },
    text1: {
        fontSize: moderateScale(14, 0.2),
        color: Color.white,
        fontWeight: "bold"
    },
    text2: {
        fontSize: moderateScale(12, 0.2),
        color: Color.white,
        // fontWeight:"bold"
    },
    circularButton: {
        bottom: scale(-60),
        // right:scale(-120)
    }
})