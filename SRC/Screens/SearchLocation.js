import { ScrollView, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { moderateScale, ScaledSheet, verticalScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import OtherLocation from '../Components/OtherLocation';
import { windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';
import SearchContainer from '../Components/SearchContainer';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';

const SearchLocation = (prop) => {
    const [search, setSearch] = useState('');


    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}
                imageStyle={styles.image}>
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        alignItems: 'center',
                        paddingBottom: moderateScale(80, 0.6),
                    }}
                    style={styles.container}>
                    <CustomHeader leftIcon
                        showBack={true}
                        text={'Location'} subtext={''} />
                    <TouchableOpacity activeOpacity={0.9}>
                        <LinearGradient
                            colors={Color.themeGradient}
                            style={styles.Search_container}
                        >
                            <GooglePlacesAutocomplete
                                placeholder="search location..."
                                fetchDetails={true}
                                onPress={(data, details = null) => {
                                    setLocation({
                                        name: data?.description,
                                        lat: details?.geometry?.location?.lat,
                                        lng: details?.geometry?.location?.lng,
                                    });
                                }}
                                query={{
                                    key: 'YOUR_GOOGLE_API_KEY',
                                    language: 'en',
                                }}
                                styles={{
                                    container: {
                                        flex: 1,
                                    },
                                    textInputContainer: {
                                        backgroundColor: 'transparent',
                                        borderTopWidth: 0,
                                        borderBottomWidth: 0,
                                    },
                                    textInput: {
                                        color: Color.black,
                                        fontSize: 14,
                                        backgroundColor: 'transparent',
                                        paddingVertical: 0,
                                        paddingHorizontal: 0,
                                    },
                                    listView: {
                                        position: 'absolute',
                                        top: 45,
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                        zIndex: 999,
                                    },
                                    poweredContainer: {
                                        display: 'none',
                                    },
                                }}
                                textInputProps={{
                                    placeholderTextColor: Color.white,
                                }}
                            />
                        </LinearGradient>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </>
    );
};

const styles = ScaledSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    container: {
        width: windowWidth,
        height: windowHeight,
        paddingHorizontal: moderateScale(10, 0.6),
    },
    image: {
        width: '100%',
        height: '100%',
    },

    text_con: {
        alignSelf: 'center',
        marginTop: moderateScale(20, 0.6),
    },

    title: {
        color: Color.white,
        fontSize: moderateScale(19, 0.6),
    },
    sub_text: {
        color: '#7F8489',
        fontSize: moderateScale(13, 0.6),
        padding: moderateScale(2, 0.6),
        width: windowWidth * 0.65,
    },
    details: {
        paddingVertical: moderateScale(20, 0.6),
        backgroundColor: '#222529',
        width: windowWidth * 0.87,
        marginTop: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(10, 0.6),
        borderTopEndRadius: 35,
        borderBottomEndRadius: 35,
    },

    card: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth * 0.9,
        paddingVertical: moderateScale(10, 0.6),
        borderBottomWidth: 0.5,
        marginVertical: moderateScale(5, 0.6),
        borderBottomColor: Color.darkGray,
    },
    Circle: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: (windowWidth * 0.15) / 2,
        backgroundColor: '#1C1F22',
        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        marginRight: moderateScale(10, 0.6),
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 16,
    },

    btn_Con: {
        flexDirection: 'row',
        width: windowWidth * 0.28,
        marginLeft: moderateScale(5, 0.6),
        height: windowHeight * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 25,
        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 16,
        alignSelf: 'center',
        backgroundColor: '#1C1F22',
        marginTop: moderateScale(20, 0.6),
    },

    Search_container: {
        width: windowWidth * 0.8,
        paddingVertical: verticalScale(2),
        flexDirection: 'row',
        marginTop: moderateScale(10, 0.3),
        borderRadius: moderateScale(40, 0.3),
        paddingHorizontal: moderateScale(20, 0.3),
        shadowColor: '#fff',
        shadowOffset: {
            width: 10,
            height: 20,
        },
        shadowOpacity: 0.25,
        shadowRadius: 40,
        marginTop: moderateScale(20, .6),
        elevation: 10,
        alignItems: 'center',
    },
});

export default SearchLocation;
