import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Avatar } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useActiveTrack } from 'react-native-track-player'
import Feather from 'react-native-vector-icons/Feather'
import { useDispatch, useSelector } from 'react-redux'
import Color from '../Assets/Utilities/Color'
import { Get } from '../Axios/AxiosInterceptorFunction'
import CustomButton from '../Components/CustomButton'
import CustomHeader from '../Components/CustomHeader'
import CustomImage from '../Components/CustomImage'
import CustomStatusBar from '../Components/CustomStatusBar'
import CustomText from '../Components/CustomText'
import IconWithText from '../Components/IconWithText'
import MinimisedPlayer from '../Components/MinimisedPlayer'
import ThemeIconButton from '../Components/ThemeIconButton'
import { baseUrl } from '../Config'
import navigationService from '../navigationService'
import { windowHeight, windowWidth } from '../Utillity/utils'
import PlaylistBottomSheet from '../Components/PlaylistBottomSheet'
import { setPlaylistTrack } from '../Store/slices/common'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PlayList from '../Components/PlayList'

const TermsAndCondition = () => {
    const token = useSelector(state => state.authReducer.token
    )
    const activeSong = useSelector(state => state.commonReducer.activeSong)
    // const isFoucs 
    const modalRef = useRef(null);
    const isFoucs = useIsFocused()
    const activeTrack = useActiveTrack()
    const navigation = useNavigation();
    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [artistList, setArtistList] = useState([]);
    const [playlistList, setPlaylistList] = useState([]);



    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.statusColor}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                <CustomHeader text={"Terms & Conditions"}

                    leftIcon={true}
                    showBack={true}
                />
                <ScrollView contentContainerStyle={{
                    paddingBottom: moderateScale(65, 0.2)
                }}>

                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                    <CustomText style={styles.txt}>{`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}</CustomText>
                </ScrollView>

            </ImageBackground>


        </>
    )
}



export default TermsAndCondition

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
    },
    txt: {
        fontSize: moderateScale(13, 0.2),
        padding: moderateScale(10, 0.2),
        color: Color.white,
    }

})