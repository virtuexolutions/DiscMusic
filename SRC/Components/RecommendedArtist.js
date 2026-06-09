import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomText from './CustomText'
import CustomImage from './CustomImage'
import { baseUrl, imageUrl } from '../Config'
import navigationService from '../navigationService'

// const backgroundColors = [
//     // '#FF6B6B',
//     '#4ECDC4',
//     '#45B7D1',
//     '#96CEB4',
//     '#FFEEAD',

//     // '#D4A5A5',
//     '#bc14ffff',
//     // '#3498DB', '#E67E22', '#1ABC9C',
//     // '#F1C40F',
//     // '#E74C3C',
//     // '#2ECC71',
//     //  '#34495E',
//     //  '#16A085'
// ]
const backgroundColors = [
    "#61b3ffff", // pastel blue
    "#fd9bdbff", // pastel purple
    "#fda990ff", // pastel pink
    "#766cffff", // pastel beige/yellow
    "#8cfdb1ff", // pastel green
    "#edf7b5ff"  // pastel teal
];

const RecommendedArtist = ({ item, from, title, image }) => {
    // console.log("🚀 ~ RecommendedArtist ~ item:", item?.image)


    const onPress = () => {
        const tracksData = from === 'home' ? (item?.items || item?.item) : item?.tracks;
        navigationService.navigate('MusicDetailsScreen', { item: tracksData, data: item?.weekly_trending, from: from });
    };

    const colorIndex = item?.title
        ? item.title.charCodeAt(0) % backgroundColors.length
        : Math.floor(Math.random() * backgroundColors.length);

    const cover_image = item?.items?.length > 0 ? `${baseUrl}/storage/${item?.items[0]?.cover_image}` : '';
    // console.log("🚀 ~ RecommendedArtist ~ cover_image:", item?.items[0]?.cover_image)
    return (
        <TouchableOpacity
            activeOpacity={0.9} onPress={onPress}
            style={[
                styles.card,
                {
                    marginTop: moderateScale(10, .6),
                    backgroundColor: backgroundColors[colorIndex]
                },
            ]}
        >
            <View style={{
                // backgroundColor: 'red',
                height: windowHeight * 0.1,
                width: windowHeight * 0.12,
                borderRadius: 5,
                overflow: 'hidden',
                // marginTop: moderateScale(15, .6)
            }}>
                <CustomImage onPress={onPress}
                    source={{ uri: cover_image }}
                    style={styles.image}
                />
            </View>
            <>
                <CustomText style={styles.sub_title}>{item?.title}</CustomText>
            </>
        </TouchableOpacity>

    );
};

export default RecommendedArtist;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#282C30',
        borderRadius: moderateScale(16, 0.2),
        marginHorizontal: moderateScale(10, 0.2),
        width: windowWidth * 0.37,
        height: windowHeight * 0.15,
        borderColor: '#424750',
        borderWidth: 0.5,
        alignItems: 'center',
        shadowColor: "#e3ecd2ff",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 13,
        overflow: 'hidden',
        paddingTop: moderateScale(5, .6),
    },
    cardTitle: {
        fontSize: moderateScale(12, 0.6),
        width: windowWidth * 0.35,
        color: Color.black,

    },
    image: {
        height: '100%',
        width: '100%',
    },
    sub_title: {
        fontSize: moderateScale(11, .6),
        color: Color.black,
        textAlign: 'center',
        marginTop: moderateScale(5, .6)
    }
});