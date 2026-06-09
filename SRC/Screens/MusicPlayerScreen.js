import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import ThemeIconButton from '../Components/ThemeIconButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleWithDescription from '../Components/TitleWithDescription'
import PlayerSliderWithActions from '../Components/playerSliderWithActions'
import LyricsContainer from '../Components/LyricsContainer'
import RotatingDisc from '../Components/RotatingDisc'
import CircularMenu from '../Components/CircularMenu'
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player'
import { OfflineManager, toggleShuffleMode, getCurrentShuffleMode, SHUFFLE_MODES } from '../Components/MusicPlayerController'
import AudioSlider from '../Components/AudioSlider'
import { useSelector } from 'react-redux'
import LikeButton from '../Components/LikeButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import PermiumModal from '../Components/PermiumModal'

const MusicPlayerScreen = () => {
    const userData = useSelector((state) => state.commonReducer.userData);
    const track = useActiveTrack();

    const rbRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const playbackState = usePlaybackState();
    const isPlaying = playbackState.state === State.Playing;
    const isFoucs = useIsFocused();
    const [lyrics, setLyrics] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [downloadedTracks, setDownloadedTracks] = useState([]);


    useEffect(() => {
        const fetchLyrics = async () => {
            if (!track?.artist || !track?.url) return;
            setLoading(true);
            setError(null);
            try {
                const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(track?.artist)}&track_name=${encodeURIComponent(track?.title)}`;
                const response = await fetch(url);
                if (!response.ok) throw new Error("Sorry, lyrics are not available at the moment.");
                const data = await response.json();
                setLyrics(data.syncedLyrics || data.plainLyrics || "Sorry, lyrics are not available at the moment.");
            } catch (err) {
                setError(err.message);
                setLyrics("");
            } finally {
                setLoading(false);
            }
        };
        fetchLyrics();
    }, [track?.artist, track?.title]);

    // ✅ Check if current track is already downloaded
    useEffect(() => {
        const checkDownloaded = async () => {
            if (!track?.id) return;
            const localUri = await OfflineManager.getLocalUri(track.id);
            setIsDownloaded(!!localUri);
        };
        checkDownloaded();
    }, [track?.id]);

    const handleDownload = async () => {
        const path = await OfflineManager.downloadTrack(track, (p) => {
            setProgress(p.toFixed(0));
        });
        if (path) setIsDownloaded(true);
    };

    const loadDownloadedSongs = async () => {
        const storedMap = await AsyncStorage.getItem('@offline_tracks_map');
        if (storedMap) {
            const map = JSON.parse(storedMap);
            const tracksArray = Object.keys(map).map(id => {
                const trackData = map[id];
                if (typeof trackData === 'string') {
                    return { id, url: trackData, title: `Song ${id}`, artist: 'Offline Artist' };
                }
                return trackData;
            });
            setDownloadedTracks(tracksArray);
        }
    };

    useEffect(() => {
        loadDownloadedSongs();
    }, [isFoucs]);

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

                            {/* ✅ Download button — downloaded ho toh skyblue */}
                            <ThemeIconButton
                                onPress={() => {
                                    if (userData?.subscriptions?.length > 0) {
                                        if (!isDownloaded) handleDownload(track);
                                    } else {
                                        rbRef.current.open();
                                    }
                                }}
                                style={styles.iconButton2}
                                iconType={Feather}
                                iconSize={moderateScale(22, 0.2)}
                                iconName={"download"}
                                iconColor={isDownloaded ? Color.themeColor : Color.themeLightGray} // ✅ skyblue if downloaded
                            />

                            {/* ✅ Shuffle button */}
                            {/* <ThemeIconButton
                                onPress={() => { handleShufflePress() }}
                                style={styles.iconButton2}
                                iconType={Ionicons}
                                iconSize={moderateScale(22, 0.2)}
                                iconName={
                                    shuffleMode === SHUFFLE_MODES.SMART_SHUFFLE
                                        ? 'sparkles'        // smart shuffle icon
                                        : 'shuffle'         // regular shuffle icon
                                }
                                iconColor={() => { getShuffleColor() }}
                            /> */}
                        </View>
                    </View>

                    <PlayerSliderWithActions item={track} />
                    <LyricsContainer lyrics={lyrics} height={windowHeight * 0.55} loading={loading} error={error} />
                    <CircularMenu containerStyle={styles.circularButton} />
                </ScrollView>
                <PermiumModal track={track} rbRef={rbRef} from={'import'} />
            </ImageBackground>
        </>
    )
}

export default MusicPlayerScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
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
        alignItems: "center"
    },
    iconButton2: {
        backgroundColor: "transparent",
        width: "auto",
        height: "auto",
        elevation: 0,
    },
    text1: {
        fontSize: moderateScale(14, 0.2),
        color: Color.white,
        fontWeight: "bold"
    },
    text2: {
        fontSize: moderateScale(12, 0.2),
        color: Color.white,
    },
    circularButton: {
        bottom: scale(-60),
    }
})