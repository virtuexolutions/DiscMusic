import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import CustomText from './CustomText';

import { Icon } from 'native-base';
import TrackPlayer, { State, useActiveTrack, usePlaybackState } from 'react-native-track-player';
import { baseUrl } from '../Config';

const TrackList = ({ items, setRef, rbRef, from }) => {
    const activeTrack = useActiveTrack()

    return (
        <RBSheet
            ref={ref => (rbRef.current = ref)}
            closeOnDragDown={true}
            height={450}
            dragFromTopOnly={true}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    height: windowHeight * 0.6,
                },
            }}>
            <View
                style={styles.mainView}>
                <View
                    style={styles.topView}>

                    <CustomText
                        style={styles.title}>
                        queue
                    </CustomText>
                    <CustomText
                        style={{
                            fontSize: moderateScale(12, .6),
                            color: Color.mediumGray
                        }}>
                        playing sufi acoustica
                    </CustomText>

                    <RenderTrack item={activeTrack} from={'top'} />

                    <CustomText
                        style={[styles.title, {
                            paddingBottom: moderateScale(10, 0.6),
                            // 
                        }]}>
                        shuffling from :
                    </CustomText>

                    <FlatList
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        showsVerticalScrollIndicator={false}
                        data={items}
                        style={{
                            height: windowHeight * 0.5
                        }}
                        contentContainerStyle={{
                            paddingBottom: moderateScale(30, 0.6),
                        }}
                        scrollEnabled={true}
                        renderItem={({ item, index }) => {
                            // console.log(item, "itemmmmmmmmmmmmmmmmmmmmm")
                            return <RenderTrack item={item} index={index} />
                        }}
                    />

                </View>

            </View>
        </RBSheet>
    );
};


const RenderTrack = ({ item, index, toggleLike, isLiked, handleTrackPress, activetrack, from }) => {

    console.log('hjkdhajksdhkjasdkjahskdhkasdjasd ========================= >>>>>>>>>>>>', item)
    const playbackState = usePlaybackState()
    const isPlaying = playbackState.state === State.Playing;
    return (

        < TouchableOpacity
            // disabled={from !== 'top'}
            onPress={async () => {
                if (from !== 'top') {
                    await TrackPlayer.skip(index);
                    TrackPlayer.play();
                } else {
                    if (isPlaying) {
                        TrackPlayer.pause();
                    } else {
                        TrackPlayer.play();
                    }
                }
            }}
            style={
                [styles.row_con, {
                    // backgroundColor: 'red',
                    marginVertical: from == 'top' ? moderateScale(15, 0.6) : moderateScale(4, 0.6),
                }]}
        // onPress={() => handleTrackPress(item.id)}
        >
            <View style={[styles.image_con, {
                // marginTop: moderateScale(5, .6)
            }]}>
                <CustomImage
                    source={{ uri: `${baseUrl}/storage/${item?.cover_image}    ` }}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                />
            </View>
            <View style={styles.text_con}>
                <CustomText
                    numberOfLines={1}
                    style={styles.text2}>
                    {item.title}
                    {/* agsdfh asdgfasghdf */}
                </CustomText>
                <CustomText
                    numberOfLines={1}
                    style={styles.text3}>
                    {item.artist?.name}
                    {/* JFHJKHDJKAHSDF */}
                </CustomText>
            </View>
            {
                from == 'top' &&
                <TouchableOpacity
                    style={styles.icon_circle}
                    onPress={() => {
                        if (isPlaying) {
                            TrackPlayer.pause();
                        } else {
                            TrackPlayer.play();
                        }
                    }}
                >
                    <Icon
                        name={isPlaying ? 'pause' : "controller-play"}
                        as={isPlaying ? MaterialIcons : Entypo}
                        size={moderateScale(24, 0.6)}
                        color={Color.white}
                    />
                </TouchableOpacity>
            }
        </TouchableOpacity >
    );
}

export default TrackList;

const styles = StyleSheet.create({

    image_con: {
        height: windowWidth * 0.12,
        width: windowWidth * 0.13,
        overflow: 'hidden', marginRight: moderateScale(8, .6)
        // marginTop: moderateScale(15, 0.6)
        // borderRadius: (windowWidth * 0.13) / 2,
    },

    icon_con: {
        height: windowHeight * 0.03,
        width: windowWidth * 0.07,
    },
    icon_circle: {
        height: windowWidth * 0.1,
        width: windowWidth * 0.1,
        borderRadius: (windowWidth * 0.1) / 2,
        backgroundColor: Color.themeSkyBlue,
        justifyContent: 'center',
        marginRight: moderateScale(5, .6),
        alignItems: 'center',
        shadowColor: '#707274ff',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10,
    },
    title: {
        color: Color.white,
        fontSize: moderateScale(16, 0.6),
    },
    row_con: {
        width: windowWidth * 0.9,
        flexDirection: 'row',
        alignItems: 'center',

    },
    mainView: {
        backgroundColor: '#282C30',
        height: '100%',
    },

    topView: {
        width: windowWidth,
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20, 0.6),
        marginTop: moderateScale(20, 0.6),
    },
    logo: {
        height: windowWidth * 0.13,
        width: windowWidth * 0.13,
    },
    text_con: {
        flex: 1,
        paddingTop: moderateScale(5, .6)
    },
    text2: {
        fontSize: moderateScale(14, .6),
        fontWeight: "500",
        color: Color.white
    },
    text3: {
        fontSize: moderateScale(12, .6),
        color: "#B7B7B7",
        // paddingBottom: moderateScale(10, .6),
    },

});
