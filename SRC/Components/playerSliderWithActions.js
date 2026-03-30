import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeIconButton from './ThemeIconButton'
import Color from '../Assets/Utilities/Color'
import { moderateScale, scale } from 'react-native-size-matters'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { windowWidth } from '../Utillity/utils'
import AudioSlider from './AudioSlider'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import { playPlaylist, playNext, playPrevious } from './MusicPlayerController'
const PlayerSliderWithActions = ({ item }) => {
    console.log('item====================== >>>>>>> here from player slider with actions', item);
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    const handlePlayAll = async () => {
        await playPlaylist(item);
    };
    return (
        <View style={styles.container}>
            <AudioSlider
                width={windowWidth * 0.9}
                containerStyle={styles.sliderContainer}
                sliderTimerContainerStyle={styles.sliderTimerContainer}
            />
            <View style={styles.actions}>
                <ThemeIconButton
                    style={[styles.iconButton, { opacity: 0.5 }]} // Disabled look
                    iconType={FontAwesome}
                    iconSize={moderateScale(18, 0.2)}
                    iconName={"step-backward"}
                    iconColor={Color.white}
                // onPress omitted to disable it
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
                    iconType={Fontisto}
                    iconSize={moderateScale(14, 0.2)}
                    iconName={"step-forward"}
                    iconColor={Color.white}
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

        backgroundColor: "#4a4743"

    }
})