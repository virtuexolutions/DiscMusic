import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomHeader from '../Components/CustomHeader';
import CustomImage from '../Components/CustomImage';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import PlayList from '../Components/PlayList';
import UpdatePlaylist from '../Components/UpdatePlaylist';
import { baseUrl } from '../Config';
import navigationService from '../navigationService';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../Components/Loader';


const CreatePlaylistScreen = (props) => {
    // const playlistData = props?.route?.params;
    const playlistData = props?.route?.params?.playlistData;
    const track = props?.route?.params?.track;

    console.log("🚀 ~ CreatePlaylistScreen ~ playlistData:", track)


    const userData = useSelector((state) => state.commonReducer.userData);
    const token = useSelector((state) => state.authReducer.token);
    const rbRef = useRef(null);
    const isfocused = useIsFocused()
    const dispatch = useDispatch();

    const [myPlaylist, setMyPlaylist] = useState([]);
    const [myTrackList, setMyTrackList] = useState([]);
    console.log("🚀 ~ CreatePlaylistScreen ~ myTrackList:", myTrackList)
    const [isLoading, setIsLoading] = useState(false);
    const [playlistimage, setPlaylistimage] = useState({})



    const getRecommendedArtist = async () => {
        const url = 'auth/recommendations/recommended-tracks'
        setIsLoading(true)
        const response = await Get(url, token)
        // return console.log('------------------ >>>>> recommended response ', JSON.stringify(response?.data?.data, null, 2), '------------------ >>>>> recommended artist response ')
        setIsLoading(false)
        if (response != undefined) {
            setMyPlaylist(response?.data?.data?.tracks)
        }
    }


    const myplaylist = async () => {
        const url = `auth/playlist-detail/${playlistData?.id}`
        setIsLoading(true)
        const response = await Get(url, token)
        // return console.log('------------------ >>>>> album response ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> recommended artist response ')
        setIsLoading(false)
        if (response != undefined) {
            setPlaylistimage(response?.data?.playlist)
            if (!track) {
                setMyTrackList(response?.data?.playlist?.tracks)

            }
        }
    }


    const addTrackToPlaylist = async (item) => {
        const body = {
            track_id: item?.id || track?.id,
            playlist_id: playlistData?.id
        }
        // return console.log('------------------ >>>>> body', JSON.stringify(body, null, 2), '------------------ >>>>>body                                                                                                                                                                               ')
        const url = `auth/playlist/add-track`
        setIsLoading(true)
        const response = await Post(url, body, apiHeader(token))
        // return console.log('------------------ >>>>> add to play list response ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> recommended artist response ')
        setIsLoading(false)
        if (response?.data?.data) {
            myplaylist()
        }
    }
    useEffect(() => {
        myplaylist()
        getRecommendedArtist()
        if (track) {
            addTrackToPlaylist(track)
            setMyTrackList(prev => [...(prev || []), track])
        }
    }, [isfocused, track])

    console.log('============================================ >?>>>>>>>>>>>>>>>>> token ', `${baseUrl}/storage/${playlistimage?.photo}`)
    console.log('   `${baseUrl}/storage/${myTrackList[0]?.cover_image}`  `${baseUrl}/storage/${myTrackList[0]?.cover_image}`  `${baseUrl}/storage/${myTrackList[0]?.cover_image}`', `${baseUrl}/storage/${myTrackList[0]?.cover_image}`, myTrackList)

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
                    <View style={styles.imagePlaceholder}>
                        <CustomImage style={{
                            height: '100%',
                            width: '100%',
                        }} source={{ uri: playlistimage?.photo ? `${baseUrl}/storage/${playlistimage?.photo}` : `${baseUrl}/storage/${myTrackList[0]?.cover_image}` }} />
                    </View>

                    <View style={styles.infoContainer}>
                        <View style={styles.titleContainer}>

                            <CustomText style={styles.playlistTitle}>
                                {playlistData?.name || 'My Playlist'}
                            </CustomText>

                            <View style={styles.ownerRow}>
                                <View style={styles.ownerIcon}>
                                    <CustomText style={styles.ownerInitial}>{userData?.name?.charAt(0)}</CustomText>
                                </View>
                                <CustomText style={styles.ownerName}>
                                    {userData?.name || 'User'}
                                </CustomText>
                            </View>
                        </View>
                        <CustomButton
                            text={'change'}
                            width={windowWidth * 0.25}
                            height={verticalScale(30)}
                            fontSize={moderateScale(12)}
                            borderRadius={moderateScale(20)}
                            marginVertical={moderateScale(20)}
                            bgColor={Color.white}
                            onPress={() => {
                                rbRef.current.open();
                                // props.navigation.navigate('Setting')
                            }}


                        />
                    </View>
                    {/* {myTrackList?.tracks?.length > 0 && */}
                    <View style={{ height: verticalScale(24), marginTop: moderateScale(10, .6), flexDirection: 'row', justifyContent: 'flex-start', width: windowWidth * 0.88 }}>
                        {myTrackList?.length > 0 && <TouchableOpacity onPress={() => {

                            navigationService.navigate('PlaylistTrack', { from: 'edit', data: playlistData });
                        }} style={styles.editButton}>
                            <Icon as={Ionicons} name='pencil' size={moderateScale(12)} color={Color.black} />
                            <CustomText style={styles.edit_text}>
                                edit </CustomText>
                        </TouchableOpacity >}
                        {/* <View style={styles.editButton}>
                            <Icon as={Ionicons} name='add' size={moderateScale(14)} color={Color.black} />
                            <CustomText style={styles.edit_text}>
                                add </CustomText>
                        </View> */}

                    </View>
                    {/* } */}

                    <PlayList title={''} trackData={myTrackList} from={'home'} addable={false} />


                    {myTrackList?.length == 0 && <View style={styles.buildingSection}>
                        <CustomText style={styles.buildingTitle}>
                            Let's start building your playlist
                        </CustomText>

                        <CustomButton
                            text="Add to this playlist"
                            textColor={Color.white}
                            // bgColor={Color.white}
                            width={windowWidth * 0.5}
                            height={verticalScale(38)}
                            borderRadius={moderateScale(25)}
                            marginTop={moderateScale(-5)}
                            fontSize={moderateScale(14)}
                            onPress={() => {
                                navigationService.navigate('PlaylistTrack', { data: playlistData });
                            }}
                        />
                    </View>}

                    {
                        isLoading ? <Loader animation={true} /> :
                            <View style={styles.recommendedSection}>
                                <CustomText style={styles.recommendedTitle}>
                                    Recommended songs
                                </CustomText>
                                <CustomText style={styles.recommendedDesc}>
                                    based on the songs in this playlist.
                                </CustomText>


                                <FlatList
                                    style={{
                                        paddingTop: moderateScale(10, .6)
                                    }}
                                    data={myPlaylist}
                                    keyExtractor={(item) => item?.id.toString()}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity style={styles.card_con}>
                                            <View style={styles.image_con}>
                                                <CustomImage source={item?.cover_image ? { uri: `${baseUrl}/storage/${item?.cover_image}` } : require('../Assets/Images/R&b.jpg')} style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    borderRadius: moderateScale(10),
                                                }} />
                                            </View>

                                            <View style={{
                                                width: windowWidth * 0.7,
                                            }}>
                                                <CustomText style={styles.titleText}>{item?.title}</CustomText>
                                                <CustomText style={styles.artistText}>{item?.artist?.name}</CustomText>

                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    addTrackToPlaylist(item)
                                                    setMyPlaylist(myPlaylist?.filter((i) => i?.id !== item?.id))
                                                    setMyTrackList(prev => [...(prev || []), item])
                                                }}
                                                style={styles.plus_btn}>
                                                <Icon as={Entypo} name='plus' size={moderateScale(13)} color={Color.white} />
                                            </TouchableOpacity>

                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                    }
                    <UpdatePlaylist
                        rbRef={rbRef}
                        playlistData={playlistData}

                    />
                </ScrollView>
            </ImageBackground>
        </>
    );
};

export default CreatePlaylistScreen;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    scrollContent: {
        paddingBottom: moderateScale(100),
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        backgroundColor: '#282C30',
        marginTop: verticalScale(20),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 13,
        elevation: 20, borderRadius: 20,
        overflow: 'hidden'
    },
    infoContainer: {
        width: windowWidth,
        paddingHorizontal: scale(20),
        flexDirection: 'row',
        marginTop: verticalScale(20),
    },
    playlistTitle: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        color: Color.white,
    },
    ownerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(10),
    },
    ownerIcon: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(10),
        backgroundColor: '#E67E22',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(8),
    },
    ownerInitial: {
        fontSize: moderateScale(10),
        color: Color.white,
        fontWeight: 'bold',
    },
    ownerName: {
        fontSize: moderateScale(14),
        color: Color.white,
        fontWeight: '500',
    },

    buildingSection: {
        width: windowWidth,
        alignItems: 'center',
        marginTop: verticalScale(25),
        paddingHorizontal: scale(20),
    },
    buildingTitle: {
        fontSize: moderateScale(14, .6),
        color: Color.white,
        textAlign: 'center',
    },
    recommendedSection: {
        width: windowWidth,
        marginTop: verticalScale(15),

        paddingHorizontal: scale(10),
    },
    recommendedTitle: {
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        color: Color.white,
    },
    recommendedDesc: {
        fontSize: moderateScale(12),
        color: Color.themeLightGray,
        lineHeight: verticalScale(18),
    },
    titleContainer: {
        width: windowWidth * 0.65,
    },
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
        marginRight: moderateScale(5, .6),
        borderRadius: moderateScale(20, .6), backgroundColor: Color.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
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

        height: windowHeight * 0.022,
        width: windowHeight * 0.022,
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
    },
    edit_text: {
        color: Color.black,
        fontSize: moderateScale(14),
        marginLeft: moderateScale(5)
    },

});