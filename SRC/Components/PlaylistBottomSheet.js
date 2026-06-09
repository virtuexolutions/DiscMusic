import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CreatePlaylistModal from './CreatePlaylistModal';
// import Feather from 'react-native-vector-icons/Feather'


const PlaylistBottomSheet = ({ track, setRef, rbRef, from, setIsModalVisible, isModalVisible }) => {
    console.log("🚀 ~ PlaylistBottomSheet ~ track:", track)



    return (
        <>
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
                        height: windowHeight * 0.15,
                    },
                }}>
                <View
                    style={styles.mainView}>
                    <View
                        style={styles.topView}>
                        <CustomText
                            //  isBold={true}
                            style={[styles.title, { letterSpacing: 1.8, fontSize: moderateScale(14, .6), color: Color.white, marginBottom: moderateScale(15, .6) }]}>
                            Create
                        </CustomText>
                        <TouchableOpacity
                            onPress={() => {
                                setIsModalVisible(true);
                                rbRef.current.close();
                            }}
                            style={styles.music_icon}>

                            <Feather style={styles.logo}
                                name={'music'}
                                size={moderateScale(22, .6)}
                                color={Color.white}
                            />

                            <View style={{ paddingHorizontal: moderateScale(10, .6) }}>

                                <CustomText
                                    style={[styles.title, { fontSize: moderateScale(15, .6), color: Color.white }]}>
                                    playlist
                                </CustomText>
                                <CustomText
                                    style={[styles.title, { fontSize: moderateScale(12, .6) }]}>
                                    build a playlist with songs you love.
                                </CustomText>
                            </View>
                        </TouchableOpacity>

                    </View>

                </View>
            </RBSheet>
            <CreatePlaylistModal
                item={track}
                isVisiable={isModalVisible}
                setIsVisiable={setIsModalVisible}
            />
        </>
    );
};

export default PlaylistBottomSheet;

const styles = StyleSheet.create({

    mainView: {
        backgroundColor: '#282C30',
        height: '100%',
        alignItems: 'center',
    }, topView: {
        width: windowWidth,
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(20, 0.6),
        marginTop: moderateScale(20, 0.6),
        alignItems: 'center',

    }, title: {
        color: Color.white,
        fontSize: moderateScale(14, 0.6),
    },
    logo: {
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    music_icon: { width: windowWidth * 0.8, flexDirection: 'row', alignItems: 'center', gap: moderateScale(10, .6), }
});
