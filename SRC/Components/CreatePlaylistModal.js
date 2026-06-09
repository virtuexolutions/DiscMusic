import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { Activity, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';

const CreatePlaylistModal = ({
    item,
    isVisiable,
    setIsVisiable,
    track,
    isSelected,
    setIsSelected,
}) => {
    console.log("🚀 ~ CreatePlaylistModal ~ CreatePlaylistModal ~ CreatePlaylistModal ~ CreatePlaylistModal ~ item:", item)
    // const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    // const navigation = useNavigation();
    const [playlistName, setPlaylistName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const createPlaylist = async () => {

        const url = 'auth/playlist/create'
        setIsLoading(true)
        const response = await Post(url, { name: playlistName }, apiHeader(token))
        console.log("🚀 ~ createPlaylist ~ response:", response?.data)
        setIsLoading(false)
        if (response != undefined) {

            navigationService.navigate('CreatePlaylistScreen', { playlistData: response?.data?.playlist, track: item })
            setIsVisiable(false)
            setPlaylistName('')
            // addTrackToPlaylist(response?.data?.playlist?.id)

        }

    }


    // const addTrackToPlaylist = async (playlistId) => {
    //     const body = {
    //         track_id: item?.id,
    //         playlist_id: playlistId
    //     }
    //     // return console.log('------------------ >>>>> body', JSON.stringify(body, null, 2), '------------------ >>>>>body                                                                                                                                                                               ')
    //     const url = `auth/playlist/add-track`
    //     setIsLoading(true)
    //     const response = await Post(url, body, apiHeader(token))
    //     // return console.log('------------------ >>>>> add to play list response ', JSON.stringify(response?.data, null, 2), '------------------ >>>>> recommended artist response ')
    //     setIsLoading(false)
    //     if (response?.data?.data) {
    //         myplaylist()
    //     }
    // }
    return (
        <Modal
            hasBackdrop={true}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            isVisible={isVisiable}
            onBackdropPress={() => {
                // setIsVisiable(false);
            }}>
            <View style={styles.main}>
                <TouchableOpacity
                    onPress={() => {
                        setIsVisiable(false);
                    }} style={{
                        position: 'absolute',
                        top: verticalScale(25),
                        right: moderateScale(10, .6),
                    }}>
                    <Icon name='x' as={Feather} size={moderateScale(25, .6)} color={Color.white} />
                </TouchableOpacity>
                <CustomText
                    style={{
                        color: Color.white,
                        fontSize: moderateScale(15, 0.6),
                    }}
                >
                    give your playlist a name
                </CustomText>


                <TextInputWithTitle
                    textAlign
                    fontSize={moderateScale(25, .6)}
                    color={Color.white}
                    titleText={'First Name'}
                    placeholder={''}
                    setText={setPlaylistName}
                    value={playlistName}
                    borderBottomWidth={1}
                    borderBottomColor={Color.white}
                    viewHeight={0.07}
                    viewWidth={0.9}
                    inputWidth={0.86}
                    // borderColor={'#ffffff'}
                    marginTop={moderateScale(10, 0.3)}
                    placeholderColor={Color.lightGrey}
                    borderRadius={moderateScale(25, 0.3)}
                />

                <CustomButton
                    marginTop={moderateScale(20, .6)}
                    textColor={Color.white}
                    borderRadius={50}
                    text={isLoading ? <ActivityIndicator color={Color.white} size={moderateScale(20, .6)} /> : 'create'}
                    onPress={() => {
                        createPlaylist()
                    }}
                    width={windowWidth * 0.4}
                    bgColor={Color.themeSkyBlue}
                    height={windowHeight * 0.07}
                />
            </View>
        </Modal>
    );
};

export default CreatePlaylistModal;

const styles = StyleSheet.create({
    main: {
        // backgroundColor: 'red',
        backgroundColor: '#282C30',
        width: windowWidth,
        height: windowHeight,
        borderRadius: moderateScale(20, 0.3),
        overflow: 'hidden',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: windowHeight * 0.25,
    },


});
