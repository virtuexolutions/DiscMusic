import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
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
import { useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { playPlaylist } from '../Components/MusicPlayerController'
import AudioSlider from '../Components/AudioSlider'
import { useSelector } from 'react-redux'
import { Post } from '../Axios/AxiosInterceptorFunction'

const MusicPlayerScreen = () => {
    const token = useSelector((state) => state.authReducer.token);
    const track = useActiveTrack();
    console.log('track====================== >>>>>>> here from music player screen', track);


    const likeTrack = async () => {
        const url = 'auth/liked-songs/store'
        const body = {
            track_id: track?.id,
            // is_liked: true
        }
        // return console.log('body====================== >>>>>>> here from music player screen',)
        const response = await Post(url, { track_id: track?.id }, apiHeader(token));
        if (response != undefined) {
            console.log('you liked this song')
        }
        console.log('response====================== >>>>>>> here from music player screen', response?.data);
    }

    const unlikeTrack = async () => {
        const url = 'auth/liked-songs/remove'

        // return console.log('body====================== >>>>>>> here from music player screen',)
        const response = await Post(url, { track_id: track?.id }, apiHeader(token));
        if (response != undefined) {
            console.log('you liked this song')
        }
        console.log('response====================== >>>>>>> here from music player screen', response?.data);
    }

    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.black}
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
                    <RotatingDisc isPlaying={true} image={track?.artwork} />
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

                            <ThemeIconButton
                                onPress={() => likeTrack()}
                                style={styles.iconButton2}
                                iconType={AntDesign}
                                iconName={"heart"}
                                iconSize={moderateScale(22, 0.2)}
                                iconColor={Color.themeDarkGray}
                            />
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
                    <LyricsContainer />
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
        alignItems: "center",
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
        shadowColor: "transparent",
    },
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
        // paddingHorizontal:scale(5)
    },
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