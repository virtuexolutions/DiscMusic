import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Animated,
    Pressable,
    ImageBackground,
    ScrollView
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomHeader from '../Components/CustomHeader';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import DetailedCard, { AnimatedCard } from '../Components/DetailedCard';
import { useSelector } from 'react-redux';
import { Get } from '../Axios/AxiosInterceptorFunction';
import Loader from '../Components/Loader';

// Sample dataset demonstrating 5 items
const DATA = [
    { id: '1', title: 'Trending Now' },
    { id: '2', title: 'Top Hits' },
    { id: '3', title: 'New Releases' },
    { id: '4', title: 'Discover' },
    { id: '5', title: 'Your Favorites' },
];




// Modularized Card Component with Animations

// Main Screen Component
const DetailScreen = ({ route }) => {
    const { item_id } = route.params;
    const token = useSelector(state => state.authReducer.token)
    const [isLoading, setIsLoading] = useState(false)
    const [genreList, setGenreList] = useState([]);
    const [page, setPage] = useState(2);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const getgenredetail = async (pageNumber = 1) => {
        if (!hasMore && pageNumber !== 1) return;

        const url = `auth/genres-detail/${item_id}?page=${pageNumber}`;

        console.log('url====================== >>>>>>> here from detail', url);
        if (pageNumber === 1) {
            setIsLoading(true);
        } else {
            setIsFetchingMore(true);
        }

        const response = await Get(url, token);
        console.log('response====================== >>>>>>> response from detail', JSON.stringify(response?.data, null, 2));

        if (pageNumber === 1) {
            setIsLoading(false);
        } else {
            setIsFetchingMore(false);
        }

        if (response != undefined && response?.data?.track_list) {
            const newData = response.data.track_list;
            if (newData.length > 0) {
                setGenreList(prev => pageNumber === 1 ? newData : [...prev, ...newData]);
                setPage(pageNumber);
            } else {
                setHasMore(false);
            }
        } else {
            setHasMore(false);
        }
    }

    const loadMoreData = () => {
        if (!isFetchingMore && hasMore && !isLoading) {
            getgenredetail(page + 1);
        }
    };

    useEffect(() => {
        getgenredetail(1)
    }, [])

    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.black}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                <CustomHeader
                    leftIcon
                    showBack={true}
                />
                <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(20, .6) }}>
                    {/* Header Component */}

                    {/* <DetailedCard
                        title={"Trending Now"}
                        DATA={DATA}
                    />
                    <DetailedCard
                        title={"Top Hits"}
                        DATA={DATA}
                    />
                    <DetailedCard
                        title={"New Releases"}
                        DATA={DATA}
                    />
                    <DetailedCard
                        title={"Discover"}
                        DATA={DATA}
                    />
                    <DetailedCard
                        title={"Your Favorites"}
                        DATA={DATA}
                    /> */}

                    {isLoading ? <Loader animation={true} /> : <FlatList
                        data={genreList}
                        numColumns={2}
                        keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContent}
                        renderItem={({ item }) => <AnimatedCard item={item} />}
                        onEndReached={loadMoreData}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={isFetchingMore ? <Loader indicator={true} size="small" /> : null}
                    />}

                </ScrollView>
            </ImageBackground>
        </>
    );
};

// Modern, subtle styling
const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    sectionHeader: {
        paddingHorizontal: moderateScale(20, 0.2),
        paddingVertical: verticalScale(10),
    },
    sectionTitle: {
        fontSize: moderateScale(20, 0.2),
        fontWeight: 'bold',
        color: Color.white,
    },
    listContainer: {
        paddingVertical: verticalScale(10),
    },
    flatListContent: {
        paddingVertical: moderateScale(20, .6),
        paddingHorizontal: moderateScale(10, 0.2),
    },
    card: {
        backgroundColor: '#282C30',
        borderRadius: moderateScale(16, 0.2),
        padding: moderateScale(24, 0.2),
        marginHorizontal: moderateScale(10, 0.2),
        width: windowWidth * 0.37,
        height: windowHeight * 0.13,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#424750',
        borderWidth: 0.5,

        // Shadow properties for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 40,

        // Elevation for Android
        elevation: 10,
    },
    cardTitle: {
        fontSize: moderateScale(16, 0.2),
        fontWeight: '700',
        color: Color.white,
        textAlign: 'center',
    },
});

export default DetailScreen;
