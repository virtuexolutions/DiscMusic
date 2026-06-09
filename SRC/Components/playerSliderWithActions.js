import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ThemeIconButton from './ThemeIconButton'
import Color from '../Assets/Utilities/Color'
import { moderateScale, scale } from 'react-native-size-matters'
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { windowWidth } from '../Utillity/utils'
import AudioSlider from './AudioSlider'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { playPlaylist, playNext, playPrevious, SHUFFLE_MODES, toggleShuffleMode, getCurrentShuffleMode } from './MusicPlayerController'
import RepeatButton from './RepeatButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import { useIsFocused } from '@react-navigation/native'
import ShuffleButton from './ShuffleButton'
const PlayerSliderWithActions = ({ item }) => {
    // console.log('item====================== >>>>>>> here from player slider with actions', item);
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    const handlePlayAll = async () => {
        await playPlaylist(item);
    };
    // ✅ Shuffle state
    const [shuffleMode, setShuffleMode] = useState(SHUFFLE_MODES.OFF);

    const rbRef = useRef(null);
    const isFoucs = useIsFocused();

    // ✅ Shuffle button press
    const handleShufflePress = async () => {
        console.log("userData?.subscriptions?.lengthaaaaaaaaaaaaaa",)
        // if (userData?.subscriptions?.length > 0) {
        const newMode = await toggleShuffleMode();
        setShuffleMoe(newMode);
        // } else {
        //     rbRef.current.open();
        // }
    };

    // ✅ Shuffle icon color
    const getShuffleColor = () => {
        if (shuffleMode === SHUFFLE_MODES.SMART_SHUFFLE) return '#FFD700'; // gold — smart shuffle
        if (shuffleMode === SHUFFLE_MODES.SHUFFLE) return Color.themeColor;  // theme — regular shuffle
        return Color.themeLightGray; // gray — off
    };

    useEffect(() => {
        // Sync shuffle mode on screen focus
        setShuffleMode(getCurrentShuffleMode());
    }, [isFoucs]);

    return (
        <View style={styles.container}>
            <AudioSlider
                width={windowWidth * 0.9}
                containerStyle={styles.sliderContainer}
                sliderTimerContainerStyle={styles.sliderTimerContainer}
            />
            <View style={styles.actions}>
                {/* <ThemeIconButton
                    onPress={() => {
                        console.log("userData?.subscriptions?.lengthaaaaaaaaaaaaaa mai hu bahhahhahhhahha",)
                        handleShufflePress()
                    }}
                    style={[styles.iconButton, { backgroundColor: shuffleMode === SHUFFLE_MODES.OFF ? "#4a4743" : Color.themeSkyBlue, opacity: 0.5 }]}
                    iconType={Ionicons}
                    iconSize={moderateScale(20, 0.2)}
                    iconName={"shuffle"}
                    // iconColor={Color.white}
                    iconColor={getShuffleColor()}
                /> */}
                <ShuffleButton iconSize={moderateScale(20, 0.2)} />
                <ThemeIconButton
                    onPress={() => playPrevious()}
                    style={styles.iconButton}
                    iconType={AntDesign}
                    iconSize={moderateScale(20, 0.2)}
                    iconName={"stepbackward"}
                    iconColor={Color.white}
                />
                <ThemeIconButton
                    onPress={() => {
                        if (isPlaying) {
                            TrackPlayer.pause();
                        } else {
                            if (playbackState.state === State.Paused || playbackState.state === State.Ready) {
                                TrackPlayer.play();
                            } else {
                                handlePlayAll();
                            }
                        }
                    }}
                    style={styles.iconButton}
                    iconType={Fontisto}
                    iconSize={moderateScale(14, 0.2)}
                    iconSource={isPlaying ? require("../Assets/Images/pause.png") : require("../Assets/Images/play-circle.png")}
                    iconColor={Color.white}
                />
                <ThemeIconButton
                    onPress={() => playNext()}
                    style={styles.iconButton}
                    iconType={AntDesign}
                    iconSize={moderateScale(20, 0.2)}
                    iconName={"stepforward"}
                    iconColor={Color.white}
                />
                <RepeatButton
                    iconSize={moderateScale(20, 0.2)}
                />
            </View>
        </View>
    )
}

export default PlayerSliderWithActions

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        alignItems: "center"
    },
    sliderContainer: {
        paddingHorizontal: scale(10)
    },
    sliderTimerContainer: {
        marginTop: 0,
        paddingHorizontal: scale(10)
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        gap: scale(10)
    },
    iconButton: {
        elevation: 0,
        shadowColor: "transparenet",
        borderColor: Color.themeLightGray,
        borderWidth: 1,

    }
})