import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { baseUrl } from '../Config';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { useNavigation } from '@react-navigation/native';
import navigationService from '../navigationService';

const SpotifyArtistCard = ({ artistName, bgColor, imageUri, item }) => {
    const navigation = useNavigation();
    // const softColors = [
    //     // background: "#0F172A",     // deep night (like a studio)
    //     "#1E293B",        // panels / cards
    //     "#7DD3FC",        // soft sky blue (controls, links)
    //     "#F9A8D4",      // soft pink (highlights)
    //     "#C4B5FD",         // dreamy lavender (active states)
    //     "#86EFAC",      // soft green (playing / success)
    //     "#0055c550",    // main text
    //     "#00429eff",  // muted text
    //     "#334155"          // subtle dividers
    // ];
    const softColors = [
        "#ff384cff", // soft pink
        "#c27e00ff", // peach
        "#7e6f00ff", // light yellow
        "#005a66ff", // light cyan
        "#9d9dffff", // lavender
        "#725b00ff", // vanilla
        "#004d3cff", // soft green
        "#f17e86ff", // blush pink
        "#6dcdfdff", // powder blue
        "#ff917dff"  // pale rose
    ];
    // console.log('item==================== >>>>>>>>>>>>>>>>>>>>>>>>', item)
    const colorIndex = item?.title
        ? item.title.charCodeAt(0) % softColors.length
        : Math.floor(Math.random() * softColors.length);
    const cardColor = softColors[colorIndex];
    return (
        <TouchableOpacity
            onPress={() => {

                navigationService.navigate('MusicDetailsScreen', { item: item?.tracks });
            }}
            style={[styles.container, {
                backgroundColor: cardColor,

            }]}>
            {/* 1. Main Card Body */}
            <View style={[styles.card, { backgroundColor: bgColor }]}>

                {/* White Top Section */}
                <View style={styles.whiteSection}>
                    {/* <Text style={styles.thisIsText}>THIS IS</Text> */}
                </View>

                {/* 2. Floating Image (Dono colors ke beech mein) */}
                <View style={styles.artistImage}>

                    <CustomImage
                        onPress={() => {

                            navigationService.navigate('MusicDetailsScreen', { item: item?.tracks });
                        }}
                        source={{ uri: `${baseUrl}/storage/${item?.profile_image}` }}
                        style={{
                            height: '100%',
                            width: '100%',

                        }}
                    />
                </View>

                {/* Bottom Section (Isme naam hota hai) */}
                <View style={styles.bottomSection}>
                    <CustomText style={styles.artistNameText}>{item?.user?.name}</CustomText>
                </View>
            </View>

            {/* Card ke neeche ka subtitle */}
            <CustomText numberOfLines={1} style={styles.subTitle}>This is {item?.name}.</CustomText>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(10, .6),
        // margin: 10,
        // width: 160,
        borderRadius: 8,
    },
    card: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.13,
        borderRadius: 8,
        overflow: 'hidden', // Taki white section corners round rahein
        position: 'relative',
    },
    whiteSection: {
        height: windowHeight * 0.15 * 0.6, // Uper ka safed hissa
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: moderateScale(10, .6),
    },
    thisIsText: {
        fontSize: moderateScale(18, .6),
        fontWeight: '900',
        color: '#000',
    },
    artistImage: {
        width: windowWidth * 0.3,
        height: windowHeight * 0.1,
        position: 'absolute',
        borderRadius: moderateScale(15, .6),
        top: '20%', // Image ko thoda uper white area mein overlap karne ke liye
        alignSelf: 'center',
        zIndex: 10,
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        // backgroundColor: '#e90c0cff',
    },
    artistNameText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#f0f0f0ff',
        textAlign: 'center',
    },
    subTitle: {
        color: Color.black,
        fontSize: moderateScale(12, .6),
        marginTop: moderateScale(8, .6),
        width: windowWidth * 0.4,
        paddingHorizontal: moderateScale(5, .6)
    }
});

export default SpotifyArtistCard;