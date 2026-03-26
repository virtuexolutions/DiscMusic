import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { baseUrl } from '../Config';
import { moderateScale } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';

const SpotifyArtistCard = ({ artistName, bgColor, imageUri, item }) => {
    // console.log('item==================== >>>>>>>>>>>>>>>>>>>>>>>>', item)
    return (
        <View style={styles.container}>
            {/* 1. Main Card Body */}
            <View style={[styles.card, { backgroundColor: bgColor }]}>

                {/* White Top Section */}
                <View style={styles.whiteSection}>
                    {/* <Text style={styles.thisIsText}>THIS IS</Text> */}
                </View>

                {/* 2. Floating Image (Dono colors ke beech mein) */}
                <View style={styles.artistImage}>

                    <CustomImage
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: moderateScale(10, .6),
        // margin: 10,
        // width: 160,
        backgroundColor: 'red',
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
        color: '#b3b3b3',
        fontSize: moderateScale(12, .6),
        marginTop: moderateScale(8, .6),
        width: windowWidth * 0.4,
        paddingHorizontal: moderateScale(5, .6)
    }
});

export default SpotifyArtistCard;