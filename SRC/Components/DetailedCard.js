import { Animated, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef } from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomText from './CustomText'
import { FlatList } from 'native-base'
import CustomImage from './CustomImage'
import { baseUrl, imageUrl } from '../Config'
import navigationService from '../navigationService'

export const AnimatedCard = ({ item, from }) => {
    console.log('item====================== >>>>>>> item from detail', `${baseUrl}/storage/${item?.cover_image}`);
    // Use Animated.Value to handle the scale transform
    // const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const scaleValue = useRef(new Animated.Value(1)).current;

    // const handlePressIn = () => {
    //     Animated.spring(scaleValue, {
    //         toValue: 1.05, // Scale up slightly on press
    //         useNativeDriver: true,
    //         speed: 20,
    //         bounciness: 10,
    //     }).start();
    // };

    // const handlePressOut = () => {
    //     Animated.spring(scaleValue, {
    //         toValue: 1, // Return to normal scale on release
    //         useNativeDriver: true,
    //         speed: 20,
    //         bounciness: 10,
    //     }).start();
    // };


    return (
        <View style={{ marginBottom: moderateScale(13, 0.2), }}>
            <TouchableOpacity style={[styles.card,
            from == 'home' && {
                marginTop: moderateScale(10, .6)
            }
            ]}
                onPress={() => {
                    const tracksData = from === 'home' ? (item?.items || item?.item) : item?.tracks;
                    navigationService.navigate('MusicDetailsScreen', { item: tracksData, data: item?.weekly_trending, from: from });
                    // console.log('item====================== >>>>>>> item from detail payload:', baseUrl + item?.cover_image);
                }}
            >
                {/* <Animated.View style={{ transform: [{ scale: scaleValue }] }}> */}
                <CustomImage onPress={() => {
                    const tracksData = from === 'home' ? (item?.items || item?.item) : item?.tracks;
                    navigationService.navigate('MusicDetailsScreen', { item: tracksData, data: item?.weekly_trending, from: from });
                    // console.log('item====================== >>>>>>> item from detail payload:', tracksData);
                }}
                    source={{ uri: `${baseUrl}/storage/${item?.cover_image}` }}
                    style={styles.image}
                />
                {/* </Animated.View> */}
            </TouchableOpacity>
            {from != 'home' && (
                <>
                    <CustomText numberOfLines={2} style={styles.cardTitle}>{item?.title}</CustomText>
                    <CustomText style={styles.sub_title}>36,322 listeners</CustomText>
                </>
            )}
        </View>
    );
};

const DetailedCard = ({ title, DATA }) => {
    return (
        <>
            {/* Section Heading Component */}
            <View style={styles.sectionHeader}>
                <CustomText style={styles.sectionTitle}>{title}</CustomText>
            </View>

            {/* Horizontal List */}
            <View style={styles.listContainer}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.flatListContent}
                    renderItem={({ item }) => <AnimatedCard item={item} />}
                />
            </View>
        </>
    )
}

export default DetailedCard

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: moderateScale(20, 0.2),
        paddingVertical: verticalScale(4, .6),
    },
    sectionTitle: {
        fontSize: moderateScale(20, 0.6),
        fontWeight: 'bold',
        color: Color.white,
    },
    listContainer: {
        // height: windowHeight * 0.15,
        // paddingVertical: verticalScale(10),
    },
    flatListContent: {
        paddingHorizontal: moderateScale(10, 0.2),
        paddingVertical: moderateScale(20, .6)
    },
    card: {
        backgroundColor: '#282C30',
        borderRadius: moderateScale(16, 0.2),
        // padding: moderateScale(24, 0.2),
        marginHorizontal: moderateScale(10, 0.2),
        width: windowWidth * 0.37,
        height: windowHeight * 0.15,
        // justifyContent: 'center',
        // alignItems: 'center',
        borderColor: '#424750',
        borderWidth: 0.5,

        // Shadow properties for iOS
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        shadowColor: "#e3ecd2ff",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
        overflow: 'hidden',
        // elevation: 10,
    },
    cardTitle: {
        fontSize: moderateScale(12
            , 0.6),
        width: windowWidth * 0.35,
        // fontWeight: '700',
        paddingTop: moderateScale(2, .6),
        color: Color.white,
        textAlign: 'center',
        // backgroundColor: 'red',
        alignSelf: 'center',
    },
    image: {
        height: '100%',
        width: '100%',
        // borderRadius: moderateScale(16, 0.2),
        overflow: 'hidden',
        // backgroundColor: 'red'
    },
    sub_title: {
        fontSize: moderateScale(10, .6),
        color: Color.white,
        textAlign: 'center',
    }
})