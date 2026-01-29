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

const MusicDetailsScreen = () => {
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
                            isGradient={true}
                            gradientColors={Color.themeGradient2}
                            iconSource={require("../Assets/Images/pause.png")}
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
                    <PlayList />
                    <RecentlyPlayedSongsList />
                </ScrollView>
                    <MinimisedPlayer />
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
        gap: scale(10)
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