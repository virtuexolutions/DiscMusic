import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useDispatch, useSelector } from 'react-redux';
import UpdatePlaylist from '../Components/UpdatePlaylist';
import navigationService from '../navigationService';
import PlayList from '../Components/PlayList';
import CustomImage from '../Components/CustomImage';
import { Icon } from 'native-base';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { setRemovePlaylistTrack } from '../Store/slices/common';
import { baseUrl } from '../Config';
import { useIsFocused } from '@react-navigation/native';

const PlaylistTrack = (props) => {
    const userData = useSelector((state) => state.commonReducer.userData);
    const token = useSelector((state) => state.authReducer.token);
    const playlistTrackData = useSelector((state) => state.commonReducer.playlist);
    console.log('playlistData ========================================== >>>>>>>>>>>>>>> mai hu bhai', playlistTrackData);

    const dispatch = useDispatch()
    const playlistData = props?.route?.params;
    const { from, data } = props?.route?.params;
    console.log("🚀 ~ PlaylistTrack ~ data:", data?.id)

    const [myTrackList, setMyTrackList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const rbRef = useRef(null);
    const isFoucs = useIsFocused()
    const tab = ['recommended', 'album', 'single']



    const myplaylist = async () => {
        const url = `auth/playlist-detail/${data?.id}`
        // console.log('first ============================= >>>>>>>>>>>>', url)
        setIsLoading(true)
        const response = await Get(url, token)
        // return console.log('------------------ >>>>> frommmmmmmmmmmmmmmm mmmmmmmmmmmmmmmmmmm meerab ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> recommended artist response ')
        setIsLoading(false)
        if (response != undefined) {
            setMyTrackList(response?.data?.playlist?.tracks)
        }
    }

    const removeTrack = async (item) => {
        const body = {
            playlist_id: data?.id,
            track_id: item?.id
        }
        setIsLoading(true)
        const url = `auth/playlist/remove-track`
        const response = await Post(url, body, apiHeader(token))
        setIsLoading(false)
        // return console.log('response ========================================== >>>>>>>>>>>>>>> mai hu bhai', response?.data);
        if (response != undefined) {
            myplaylist()
        }
    }



    useEffect(() => {
        myplaylist()
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
                    showBack={true}
                    leftIcon={true}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>
                    {from == 'edit' ?
                        <FlatList
                            data={myTrackList}
                            keyExtractor={(item) => item?.id}
                            renderItem={({ item, index }) => (
                                console.log('------------------ >>>>> recommended itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm ', JSON.stringify(item, null, 2), '------------------ >>>>> recommended artist response '),
                                (<TouchableOpacity

                                    onPress={() => {

                                        // removeTrack(item)
                                    }} style={styles.card_con}>
                                    <View style={styles.image_con}>
                                        <CustomImage
                                            source={item?.cover_image ? { uri: `${baseUrl}/storage/${item?.cover_image}` } : require('../Assets/Images/R&b.jpg')}
                                            style={{
                                                height: '100%',
                                                width: '100%',
                                                borderRadius: moderateScale(10),
                                            }} />
                                    </View>

                                    <View style={{
                                        width: windowWidth * 0.7,
                                    }}>
                                        <CustomText style={styles.titleText}>
                                            {item?.title}
                                            {/* ahasdhfjashdjkfhasjkdf */}
                                        </CustomText>
                                        <CustomText style={styles.artistText}>
                                            {item?.description}
                                        </CustomText>

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            removeTrack(item)
                                            setMyTrackList(myTrackList?.filter((item, i) => i !== index))
                                        }}
                                        style={styles.plus_btn}>



                                        <Icon style={{}} as={Entypo} name='minus' size={moderateScale(13)} color={Color.white} />
                                    </TouchableOpacity>

                                </TouchableOpacity>)
                            )}
                        />
                        :
                        <>

                            <View style={styles.tabsContainer}>
                                {
                                    tab?.map((item, index) => {
                                        return (
                                            <CustomText
                                                key={index}
                                                style={styles.tabText}
                                            >
                                                {item}
                                            </CustomText>
                                        )
                                    })
                                }
                            </View>
                            <PlayList title={''} trackData={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} from={'home'} />
                        </>
                    }



                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default PlaylistTrack;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    scrollContent: {
        paddingBottom: moderateScale(100),
        alignItems: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        // backgroundColor: 'red',
        width: windowWidth,
    }, tabText: {
        backgroundColor: Color.white,
        paddingVertical: moderateScale(5),
        paddingHorizontal: moderateScale(12),
        color: Color.black,
        borderRadius: moderateScale(20),
        marginHorizontal: moderateScale(5),

        fontSize: moderateScale(13, .6),
    }
    ,
    card_con:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.9,
        marginVertical: moderateScale(5, .6),
        marginHorizontal: moderateScale(5, .6)
    },
    image_con: {
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: moderateScale(10),
    }, editButton: {
        paddingVertical: moderateScale(4, .6),
        paddingHorizontal: moderateScale(10, .6),
        // padding: moderateScale(3, .6),
        marginRight: moderateScale(5, .6),
        borderRadius: moderateScale(20, .6), backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
    artistText: {
        color: Color.mediumGray,
        fontSize: moderateScale(13, .6),
        fontWeight: '600'
    },
    titleText: {
        color: Color.white,
        fontSize: moderateScale(15, .6),
        fontWeight: '600'
    }, plus_btn: {

        height: windowHeight * 0.02,
        width: windowHeight * 0.02,
        borderRadius: moderateScale(20),
        borderWidth: 1,
        borderColor: Color.mediumGray,
        shadowColor: "#000",
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 13,
        elevation: 20,

    }



});