import React, { useEffect, useState } from 'react';
import {
    FlatList,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import CustomStatusBar from '../Components/CustomStatusBar';
import CustomHeader from '../Components/CustomHeader';
import SearchContainer from '../Components/SearchContainer';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Loader from '../Components/Loader';
import MinimisedPlayer from '../Components/MinimisedPlayer';

import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

import { Post } from '../Axios/AxiosInterceptorFunction';
import { baseUrl } from '../Config';

const Search = () => {
    const navigation = useNavigation();
    const token = useSelector(state => state.authReducer.token);

    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    console.log("🚀 ~ Search ~ searchData:", searchData)

    // Search API Function
    const searchArtistAndSong = async text => {
        setSearch(text);

        if (text?.trim()?.length === 0) {
            setSearchData([]);
            return;
        }
        const url = 'auth/search';
        const body = {
            query: text,
        };
        setIsLoading(true);
        const response = await Post(url, body, apiHeader(token));
        console.log("search data>>>>", response?.data?.artists)
        console.log("search data>>>>", response?.data?.tracks)

        setIsLoading(false);
        if (response !== undefined) {
            // adjust according to your api response
            const songs = response?.data?.tracks?.map(item => ({
                ...item,
                type: 'song',
            })) || [];

            const artists = response?.data?.artists?.map(item => ({
                ...item,
                type: 'artist',
            })) || [];

            // merge both arrays
            const mergedData = [...songs, ...artists];

            setSearchData(mergedData);
        }
    };

    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />

            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>

                <CustomHeader showBack={true} leftIcon={true} text={'Search'} titlStyle={styles.heading} />

                {/* <CustomText
                    style={styles.heading}
                    children={'Search Result'}
                /> */}
                {/* Search Input */}
                <SearchContainer
                    style={{
                        width: windowWidth * 0.9,
                        marginTop: verticalScale(15),
                    }}
                    placeholder={'Search artist or song'}
                    data={search}
                    setData={searchArtistAndSong}
                    input
                    placeholderTextColor={Color.white}
                />



                {isLoading ? (
                    <Loader animation={true} />
                ) : (
                    <FlatList
                        data={searchData}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={{
                            paddingBottom: moderateScale(100, 0.6),
                        }}
                        style={{
                            marginTop: moderateScale(25, 0.3),
                            // width: windowWidth * 0.9,
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            console.log("song name >>>>", `${baseUrl}/storage/${item?.user?.profile_image}`);
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={styles.card}
                                    onPress={() => {
                                        navigation.navigate('SongDetail', {
                                            item: item,
                                        });
                                    }}>

                                    {/* Image */}
                                    <CustomImage
                                        source={
                                            item?.user?.profile_image || item?.cover_image
                                                ? { uri: `${baseUrl}/storage/${item?.user?.profile_image || item?.cover_image}` }
                                                : require('../Assets/Images/artist7.png')
                                        }
                                        style={styles.image}
                                    />

                                    {/* Text Data */}
                                    <View style={styles.textContainer}>
                                        <CustomText
                                            style={styles.songName}
                                            numberOfLines={1}>
                                            {item?.user?.name || item?.title}
                                        </CustomText>

                                        <CustomText
                                            style={styles.artistName}
                                            numberOfLines={1}>
                                            {item?.artist_name || (item?.artist && typeof item.artist === 'object' ? (item.artist?.user?.name || item.artist?.name) : item?.artist) || ''}
                                        </CustomText>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}

                <MinimisedPlayer
                    style={{
                        bottom: 0,
                        height: windowHeight * 0.25,
                    }}
                />
            </ImageBackground>
        </>
    );
};

export default Search;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
    },

    heading: {
        width: windowWidth * 0.75,
        color: Color.white,
        fontSize: moderateScale(18, 0.3),
        marginTop: moderateScale(15, 0.3),
        textAlign: 'center',
        marginBottom: moderateScale(10, 0.3),
    },

    // Card Design
    card: {
        width: windowWidth * 0.92,
        height: windowHeight * 0.072,
        // marginVertical: moderateScale(15, .6), // 0.06 height
        backgroundColor: '#282C30',
        borderRadius: moderateScale(12, 0.3),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        // marginTop: moderateScale(15, 0.3),

        marginBottom: moderateScale(10, 0.3),
    },

    image: {
        width: windowHeight * 0.06,
        height: windowHeight * 0.06,
        borderRadius: moderateScale(8, 0.3),
    },

    textContainer: {
        marginLeft: scale(12),
        width: '75%',
    },

    songName: {
        color: Color.white,
        fontSize: moderateScale(13, 0.3),
        fontWeight: '600',
    },

    artistName: {
        color: '#B0B0B0',
        fontSize: moderateScale(11, 0.3),
        marginTop: moderateScale(2, 0.3),
    },
});