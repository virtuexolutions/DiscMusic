import React, { useState } from 'react';
import { Alert, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import TextInputWithTitle from './TextInputWithTitle';
import { launchImageLibrary } from 'react-native-image-picker';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';
import navigationService from '../navigationService';
import { useNavigation } from '@react-navigation/native';
import { baseUrl } from '../Config';


const UpdatePlaylist = ({ playlistData, rbRef, onSave, onDelete }) => {
    console.log("🚀 ~ UpdatePlaylist ~ playlistData:", playlistData?.id)
    const token = useSelector((state) => state.authReducer.token);
    console.log('======================================== >>>>>>>>>>> yes bro', token)
    const navigation = useNavigation()
    const [playlistName, setPlaylistName] = useState(playlistData?.name || '');
    const [description, setDescription] = useState(playlistData?.description || '');
    const [image, setImage] = useState(null);
    console.log("🚀 ~ UpdatePlaylist ~ image:", image)

    const openGallery = () => {
        let options = {
            mediaType: 'photo',
            maxWidth: 500,
            maxHeight: 500,
            quailty: 0.9,
            saveToPhotos: true,
        };

        launchImageLibrary(options, response => {

            if (Platform.OS === 'ios') {
                setShow(false);
            }
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                Alert.alert(response.customButton);
            } else {

                setImage({
                    uri: response?.assets[0]?.uri,
                    type: response?.assets[0]?.type,
                    name: response?.assets[0]?.fileName,
                });


            }
        });

        // }
    };

    const handleSave = async () => {
        const formData = new FormData();
        const body = {
            playlist_id: playlistData?.id,
            name: playlistName,
            description: description,
        }
        for (let key in body) {

            formData.append(key, body[key]);
        }
        if (image && Object.keys(image).length > 0) {
            formData.append('photo', image




            );
        }

        // formData.append(body)
        console.log(formData, '======== token from update playlist =========')


        const url = 'auth/playlist/update'

        const response = await Post(url, formData, apiHeader(token, true))
        // return console.log(`${baseUrl}/storage/${response?.data?.playlist?.photo}`, '======== token from update playlist =========')

        if (response != undefined) {

            rbRef?.current?.close();
        }
    };

    const handleCancel = () => {
        rbRef?.current?.close();
    };

    const handleDelete = async () => {
        const body = {
            playlist_id: playlistData?.id
        }
        const url = "auth/playlist/delete"

        const response = await Post(url, body, apiHeader(token))
        if (response != undefined) {
            navigation.goBack()
            rbRef?.current?.close();

        }
    };



    return (
        <RBSheet
            ref={ref => (rbRef.current = ref)}
            closeOnDragDown={true}
            height={windowHeight * 0.33}
            dragFromTopOnly={true}
            openDuration={250}
            customStyles={{
                container: {
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                },
                draggableIcon: {
                    backgroundColor: '#555',
                    width: 40,
                },
            }}>
            <View style={styles.mainView}>

                {/* Header Row: Cancel | Title | Save */}
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={handleCancel}>
                        <CustomText style={styles.headerAction}>cancel</CustomText>
                    </TouchableOpacity>
                    <CustomText style={styles.headerTitle}>name & details</CustomText>
                    <TouchableOpacity onPress={handleSave}>
                        <CustomText style={[styles.headerAction, { color: Color.themeSkyBlue || '#1DB954' }]}>save</CustomText>
                    </TouchableOpacity>
                </View>

                {/* Content Row: Editable Image + Inputs */}
                <View style={styles.contentRow}>
                    {/* Editable Image */}
                    <TouchableOpacity style={styles.imageContainer} onPress={() => openGallery()} activeOpacity={0.7}>
                        {image ? (
                            <CustomImage
                                source={{ uri: image?.uri }}
                                style={styles.playlistImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <Feather name="music" size={scale(30)} color="#666" />
                            </View>
                        )}
                        {/* Edit overlay icon */}
                        <View style={styles.editOverlay}>
                            <Feather name="edit-2" size={scale(10)} color={Color.white} />
                        </View>
                    </TouchableOpacity>

                    {/* Input Fields */}
                    <View style={styles.inputsContainer}>
                        <TextInputWithTitle
                            color={Color.white}
                            placeholder={'Playlist name'}
                            setText={setPlaylistName}
                            value={playlistName}
                            borderBottomWidth={1}
                            borderBottomColor={Color.white}
                            viewHeight={0.06}
                            viewWidth={0.55}
                            inputWidth={0.50}
                            placeholderColor={'#666'}
                            backgroundColor={'transparent'}
                        />
                        <TextInputWithTitle
                            color={Color.white}
                            placeholder={'Add a description'}
                            setText={setDescription}
                            value={description}
                            borderBottomWidth={1}
                            borderBottomColor={Color.white}
                            viewHeight={0.05}
                            viewWidth={0.55}
                            inputWidth={0.50}
                            multiline={true}
                            numberOfLines={2}
                            marginTop={moderateScale(5, 0.3)}
                            placeholderColor={'#666'}
                            backgroundColor={'transparent'}
                        />
                    </View>
                </View>

                {/* Delete Playlist */}
                <TouchableOpacity style={styles.deleteRow} onPress={() => { handleDelete() }}>
                    <Feather name="trash-2" size={moderateScale(18, 0.6)} color={Color.lightGrey} />
                    <CustomText style={styles.deleteText}>Delete playlist</CustomText>
                </TouchableOpacity>

            </View>
        </RBSheet>
    );
};



export default UpdatePlaylist;

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#282C30',
        height: '100%',
        paddingHorizontal: moderateScale(20, 0.6),
        paddingTop: moderateScale(5, 0.6),
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingTop: moderateScale(10, .6),
        paddingBottom: moderateScale(15, 0.6),
        borderBottomWidth: 0.5,
        borderBottomColor: '#444',
    },
    headerAction: {
        color: Color.white,
        fontSize: moderateScale(13, 0.6),
        letterSpacing: 0.5,
    },
    headerTitle: {
        color: Color.white,
        fontSize: moderateScale(15, 0.6),
        fontWeight: 'bold',
        textTransform: 'capitalize',
        letterSpacing: 1,
    },
    contentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: moderateScale(20, 0.6),
        gap: scale(15),
    },
    imageContainer: {
        width: windowWidth * 0.25,
        height: windowWidth * 0.25,
        borderRadius: moderateScale(10, 0.3),
        overflow: 'hidden',
        backgroundColor: '#1E2226',
    },
    playlistImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E2226',
    },
    editOverlay: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        width: scale(22),
        height: scale(22),
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    deleteRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(30, 0.6),
        gap: scale(10),
        paddingVertical: moderateScale(17, 0.6),
        borderTopWidth: 0.5,
        borderTopColor: '#444',
    },
    deleteText: {
        color: Color.lightGrey,
        fontSize: moderateScale(14, 0.6),
        fontWeight: '500',
    },
});
