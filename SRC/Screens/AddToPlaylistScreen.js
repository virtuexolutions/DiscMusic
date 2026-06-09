import { useIsFocused, useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { Alert, FlatList, ImageBackground, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get, Post } from '../Axios/AxiosInterceptorFunction'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomText from '../Components/CustomText'
import Loader from '../Components/Loader'
import PlaylistBottomSheet from '../Components/PlaylistBottomSheet'
import SearchContainer from '../Components/SearchContainer'
import ThemeIconButton from '../Components/ThemeIconButton'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import { Platform } from 'react-native'
import navigationService from '../navigationService'
import { baseUrl } from '../Config'
import BackButton from '../Components/BackButton'

const AddToPlaylistScreen = (props) => {
    const { track } = props?.route?.params || {}
    const token = useSelector(state => state.authReducer.token)
    const activeSong = useSelector(state => state.commonReducer.activeSong)
    const modalRef = useRef(null);
    const isFoucs = useIsFocused()
    const navigation = useNavigation()

    const [isLoading, setIsLoading] = useState(false)
    const [playlistList, setPlaylistList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')

    // ✅ FIX: Single selected playlist state — stores the whole playlist object
    const [isSelectedPlaylist, setIsSelectedPlaylist] = useState(null);

    const playlists = async () => {
        const url = 'auth/playlist/list'
        setIsLoading(true)
        const response = await Get(url, token)
        // return console.log("🚀 ~ playlists ~ response:", response?.data)
        setIsLoading(false)
        if (response != undefined) {
            setPlaylistList(response?.data?.playlist)
        }
    }

    useEffect(() => {
        playlists()
    }, [isFoucs])

    const addTrackToPlaylist = async () => {
        // if (!isSelectedPlaylist || !track?.id) return;

        // const selectedPlaylist = playlistList?.find(
        //     item => item?.id === isSelectedPlaylist?.id
        // );

        // const isTrackAlreadyAdded = selectedPlaylist?.tracks?.some(
        //     item => item?.id === track?.id
        // );

        // if (isTrackAlreadyAdded) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show(
        //             `Already added to ${isSelectedPlaylist?.name}`,
        //             ToastAndroid.SHORT
        //         )
        //         : Alert.alert(
        //             `Already added to ${isSelectedPlaylist?.name}`
        //         );
        // }

        const body = {
            track_id: track?.id,
            playlist_id: isSelectedPlaylist?.id,
        };

        const url = 'auth/playlist/add-track';

        const response = await Post(
            url,
            body,
            apiHeader(token)
        );

        if (response != undefined) {
            Platform.OS === 'android'
                ? ToastAndroid.show(
                    `Added to ${response?.data?.playlist?.name}`,
                    ToastAndroid.SHORT
                )
                : Alert.alert(
                    `Added to ${response?.data?.playlist?.name}`
                );

            navigation.goBack();
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
                <View style={styles.text_con}>
                    <BackButton />
                    <CustomText
                        onPress={() => {
                            addTrackToPlaylist()
                        }}
                        isBold style={{

                            color: Color.themeSkyBlue,
                            fontSize: moderateScale(14, .6),
                        }}> save in </CustomText>
                </View>

                {/* {showSearch && ( */}
                <View style={{ marginTop: moderateScale(10, 0.3) }}>
                    <SearchContainer
                        input={true}
                        data={searchQuery}
                        IsSelected={setSearchQuery}
                        placeholder="Find playlist"
                        width={windowWidth * 0.9}
                        inputStyle={{
                            color: Color.white,
                        }}
                    />
                </View>
                {/* )} */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: moderateScale(130, .6) }}
                >
                    {isLoading ? (
                        <Loader animation={true} />
                    ) : (
                        <FlatList
                            style={{ paddingVertical: moderateScale(10, 0.6) }}
                            // ✅ FIX: Use filteredList instead of playlistList
                            data={playlistList}
                            keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item }) => {
                                return (
                                    <ArtistCard
                                        from={'playlist'}
                                        // ✅ FIX: Pass item directly — no nesting
                                        item={item}
                                        track={track}
                                        // isTrackAlreadyAdded={isTrackAlreadyAdded}
                                        setIsSelectedPlaylist={setIsSelectedPlaylist}
                                        isSelectedPlaylist={isSelectedPlaylist}
                                    />
                                );
                            }}
                        />
                    )}

                    {/* Create new playlist card */}
                    <ArtistCard
                        item={{
                            id: "add",
                            title: "create new playlist",
                            onPress: () => {
                                modalRef.current.open()
                            },
                        }}
                    // isSelectedPlaylist={isSelectedPlaylist}
                    // setIsSelectedPlaylist={setIsSelectedPlaylist}
                    />
                </ScrollView>
            </ImageBackground >

            <PlaylistBottomSheet
                track={track}
                rbRef={modalRef}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    )
}

// ✅ FIX: ArtistCard — item is now a flat object, no more item.item nesting
const ArtistCard = ({
    from,
    item,
    isSelectedPlaylist,
    setIsSelectedPlaylist,
    track
}) => {

    const isCreate = item?.id === "add";

    const isSelected = !isCreate && isSelectedPlaylist?.id === item?.id;

    const isTrackAlreadyAdded = item?.tracks?.some(t => t?.id === track?.id);
    return (
        <TouchableOpacity
            style={[
                styles.card,
                {

                    borderWidth: isCreate ? 0 : isTrackAlreadyAdded || isSelected ? 1 : 0,
                    borderColor: isTrackAlreadyAdded || isSelected ? Color.themeSkyBlue : "transparent",
                },
                isSelected && {
                    shadowColor: Color.lightGrey,
                    elevation: 16,
                    shadowRadius: (windowWidth * 0.2) / 2,
                    shadowOffset: { width: 20, height: 20 },
                    shadowOpacity: 0.15,
                },
                isCreate && { overflow: "visible" }
            ]}
            onPress={
                item?.onPress
                    ? item.onPress
                    : () => {
                        // ✅ FIX: Set the selected playlist — one item at a time
                        setIsSelectedPlaylist(item)
                    }
            }
        >
            {isCreate ? (
                <ThemeIconButton
                    onPress={() => { }}
                    isGradient={true}
                    iconName={"plus"}
                    iconType={Feather}
                    iconSize={scale(14)}
                    gradientColors={Color.themeGradient}
                    style={styles.imageContainer}
                />
            ) : (
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <CustomImage
                            source={item?.photo ? { uri: `${baseUrl}/storage/${item?.photo}` } : item?.track?.length >
                                0 ? { uri: `${baseUrl}/storage/${item?.track[0]?.cover_image} ` }
                                : require('../Assets/Images/musical-note.png')}
                            style={styles.icon}
                            onPress={() => { }}
                        />
                    </View>
                </View>
            )}

            <View style={styles.info}>
                <CustomText
                    // ✅ FIX: item is flat now — item.name directly
                    children={item?.title || item?.name || item?.user?.name}
                    style={[
                        styles.title,
                        {
                            fontSize: item?.title || item?.name
                                ? moderateScale(12, 0.2)
                                : moderateScale(14, 0.2),
                        }
                    ]}
                />
                {item?.description && <CustomText
                    // ✅ FIX: item.description directly
                    children={item?.description}
                    style={styles.desc}
                />}
                <CustomText
                    // ✅ FIX: item.description directly
                    children={item?.tracks?.length > 0 ? item?.tracks?.length : ''}
                    style={[styles.desc, {

                        fontWeight: "700",
                        fontSize: moderateScale(12, 0.2),
                    }]}
                />
            </View>
        </TouchableOpacity>
    );
}

export default AddToPlaylistScreen

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        paddingHorizontal: scale(20),
        width: windowWidth,
    },
    icon: {
        width: '100%',
        height: '100%',
        // tintColor: Color.white
    },
    card: {
        width: windowWidth * 0.9,
        flexDirection: "row",
        alignItems: "center",
        gap: scale(20),
        marginTop: moderateScale(10, .6),
        overflow: "hidden",
        backgroundColor: "#282C30",
        borderRadius: (windowWidth * 0.18) / 2,

    },
    imageContainer: {
        width: windowWidth * 0.18,
        height: windowWidth * 0.18,
        borderRadius: (windowWidth * 0.18) / 2,
        overflow: 'hidden',
        elevation: 6,
        shadowColor: Color.white,
        shadowRadius: (windowWidth * 0.2) / 2,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.4,
    },
    info: {
        gap: verticalScale(5)
    },
    title: {
        fontWeight: "500",
        color: Color.white
    },
    desc: {
        fontSize: moderateScale(10, 0.2),
        fontWeight: "500",
        color: Color.themeLightGray,
    },
    container: {
        width: windowWidth * 0.18,
        height: windowWidth * 0.18,
        borderRadius: windowWidth * 0.18 / 2,
        elevation: 16,
        shadowColor: Color.lightGrey,
        shadowOpacity: 0.87,
        backgroundColor: "#282C30",
        shadowOffset: { height: 15, width: 10 }
    },
    iconContainer: {
        borderRadius: windowWidth * 0.18 / 2,
        width: windowWidth * 0.18,
        height: windowWidth * 0.18,
        overflow: 'hidden'
    },
    avtar_con: {
        elevation: 16,
        shadowColor: Color.black,
        shadowOpacity: 0.87,
        shadowRadius: (windowWidth * 0.18) / 2,
        shadowOffset: { height: 15, width: 10 }
    }, text_con: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: moderateScale(15, .6),
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: moderateScale(15, .6)
    }
})
