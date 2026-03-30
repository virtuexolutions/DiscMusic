import {
    ActivityIndicator,
    Alert,
    FlatList,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import SearchContainer from '../Components/SearchContainer';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import MinimisedPlayer from '../Components/MinimisedPlayer';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { baseUrl } from '../Config';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import { setFavArtist } from '../Store/slices/common';
import { position } from 'native-base/lib/typescript/theme/styled-system';

const SearchArtist = (props) => {
    const { from } = '' || props?.route?.params
    console.log('from====================== >>>>>>> here from search artist', from);
    // props?.route?.params
    //  props?.route?.params
    const dispatch = useDispatch()
    const token = useSelector(state => state.authReducer.token)
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    console.log('======================= isLoading', isLoading)
    const [artistList, setArtistList] = useState([]);
    const [isSelected, setIsSelected] = useState([])
    console.log('======================= isSelected', isSelected?.length)
    const [loading, setLoading] = useState(false)

    const getArtist = async () => {
        const url = 'auth/artists-list'
        setIsLoading(true)
        const response = await Get(url, token)
        console.log('response====================== >>>>>>> here from genre', JSON.stringify(response?.data, null, 2));
        setIsLoading(false)
        if (response != undefined) {
            setArtistList(response?.data?.data?.artists)
        }
    }

    useEffect(() => {
        getArtist()
    }, [])


    const addArtist = async () => {
        const formatData = new FormData()
        isSelected?.forEach((item, index) => {
            formatData.append(`artist_id[${index}]`, item?.id)
        })
        // return console.log('response====================== >>>>>>> here from add artist  { artist_id: isSelected?.map(item => item.id) }', formatData);
        const url = 'auth/liked-artist/store'
        setLoading(true)
        const response = await Post(url, formatData, apiHeader(token, true))
        // return console.log('response====================== >>>>>>> here from add artist', JSON.stringify(response?.data, null, 2));
        setLoading(false)
        if (response != undefined) {
            dispatch(setFavArtist(response?.data?.already_liked))
            // navigationService.navigate('TabNavigation')
        }
    }




    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.black}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                {/* {from == 'library' &&
                    <CustomHeader showBack={true} RightIcon={true} camera={true} />} */}

                <CustomText style={[styles.text, {
                    marginTop: moderateScale(25, 0.2),
                    fontSize: from != 'library' ? moderateScale(28, 0.2) : moderateScale(23, 0.2),
                }]} children={from != 'library' ? 'choose three or more Artists' : 'choose more artist you like '} />
                <SearchContainer
                    placeholder={'Search Artist'}
                    data={search}
                    placeholderTextColor={Color.white}
                    setData={setSearch}
                    input
                    style={{
                        width: windowWidth * 0.9
                    }}
                />
                {
                    isLoading ? (
                        <Loader animation={true} />
                    ) : (
                        <>
                            <FlatList
                                style={{
                                    marginTop: moderateScale(20, 0.6),
                                }}
                                showsVerticalScrollIndicator={false}
                                data={search ? artistList.filter(item => item?.name?.toLowerCase().includes(search.toLowerCase())) : artistList}
                                numColumns={4}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={{ paddingBottom: verticalScale(80) }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <ArtistComponent
                                            item={item}
                                            isLoading={isLoading}
                                            isSelected={isSelected}
                                            setIsSelected={setIsSelected}
                                        />
                                    );
                                }}
                            />

                            {(
                                (from === 'library' && isSelected.length >= 1) ||
                                (from !== 'library' && isSelected.length >= 3)
                            ) && (
                                    <CustomButton
                                        text={
                                            loading ? (
                                                <ActivityIndicator size="small" color={Color.black} />
                                            ) : (
                                                'done'
                                            )
                                        }
                                        textColor={Color.black}
                                        width={windowWidth * 0.3}
                                        height={windowHeight * 0.05}
                                        marginBottom={moderateScale(15, 0.6)}
                                        onPress={addArtist}
                                        bgColor={Color.white}
                                        // marginTop={moderateScale(20, 0.3)}
                                        borderRadius={windowWidth / 2}
                                        fontSize={moderateScale(16, 0.3)}
                                        style={{
                                            position: 'absolute',
                                            bottom: 35,
                                            alignSelf: 'center',
                                        }}
                                    />
                                )}
                        </>
                    )
                }
                {/* <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.18 }} /> */}
            </ImageBackground>
        </>
    );
};
function ArtistComponent({ item, isLoading, isSelected, setIsSelected }) {
    console.log('item====================== >>>>>>> here from artist', JSON.stringify(item, null, 2));
    const navigation = useNavigation();

    const handleSelect = () => {
        setIsSelected(prev => {
            const currentSelected = Array.isArray(prev) ? prev : [];
            const exists = currentSelected.some(val => val?.id === item?.id);
            if (exists) {
                return currentSelected.filter(val => val?.id !== item?.id);
            } else {
                return [...currentSelected, item];
            }
        });
    };

    const isItemChecked = Array.isArray(isSelected) && isSelected.some(val => val?.id === item?.id);

    return (
        <TouchableOpacity
            style={styles.category}
            onPress={handleSelect}>
            <View style={styles.imageContainer}>
                {!isLoading && <CustomImage
                    onPress={handleSelect}
                    source={item?.profile_image ? { uri: `${baseUrl}/storage/${item?.profile_image}` } : require('../Assets/Images/artist7.png')}
                    style={[styles.image, { resizeMode: 'cover' }]}
                />}
            </View>{
                isItemChecked &&
                <View style={{
                    position: 'absolute', top: 5, right: 5, zIndex: 1, width: windowWidth * 0.04, height: windowHeight * 0.018,

                }}>
                    <CustomImage
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        source={require('../Assets/Images/tick-icon.png')}

                    />
                </View>}
            {/* // <FontAwesome6 */}
            {/* //     style={{ position: 'absolute', top: 0, right: -3, zIndex: 1, backgroundColor: 'red' }} name='check-circle' size={moderateScale(18, 0.6)} color={Color.green} />} */}
            {!isLoading && <CustomText style={styles.categoryTitle} children={item?.name || 'artist'} />}
        </TouchableOpacity >
    );
}

export default SearchArtist;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        // paddingHorizontal:scale(5)
    },
    image: {
        width: '100%',
        height: '100%',
    },
    category: {
        gap: scale(5),
        paddingHorizontal: 5,
        marginHorizontal: moderateScale(10, .6),
        marginVertical: moderateScale(10, .6),
        overflow: 'hidden',
        alignItems: 'center',
        shadowColor: '#888888ff',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: windowWidth * 0.2,

        elevation: 13,
    },
    text: {
        width: windowWidth * 0.9,
        color: Color.white,
        paddingVertical: verticalScale(20),
        letterSpacing: 1.3,
        fontWeight: '700',

    },
    imageContainer: {
        width: windowWidth * 0.17,
        height: windowWidth * 0.17,
        borderRadius: (windowWidth * 0.17) / 2,
        overflow: 'hidden',
    },
    categoryTitle: {
        fontSize: moderateScale(12, 0.2),
        color: Color.white,
    },
});
