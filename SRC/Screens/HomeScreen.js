import { ScrollView, View } from 'native-base';
import React from 'react';
import { FlatList, ImageBackground } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import TrendingView from '../Components/TrendingView';
import { windowHeight, windowWidth } from '../Utillity/utils';
import EventCard from '../Components/EventCard';
import CarouselView from '../Components/CarouselView';


const HomeScreen = () => {
    const events = [
        {
            id: 1,
            name: 'Miss You',
            text: 'oliver tree, robin schulz',
            image: require('../Assets/Images/event_1.png'),
        },
        {
            id: 2,
            name: 'Miss You',
            text: 'oliver tree, robin schulz',
            image: require('../Assets/Images/event_2.png'),
        }, {
            id: 3,
            name: 'Miss You',
            text: 'oliver tree, robin schulz',
            image: require('../Assets/Images/event_3.png'),
        },
    ]

    const musicCategories = [
        "Classic",
        "Pop",
        "Jazz",
        "Hip-Hop",
        "R&B",
        "Rock",
        "Anime",
        "K-pop",
        "Indie",
        "Instrumental",
        "Dance",
    ];

    const artist = [
        {
            id: 1,
            image: require('../Assets/Images/event_1.png'),
        },
        {
            id: 2,
            image: require('../Assets/Images/event_2.png'),
        }, {
            id: 3,
            image: require('../Assets/Images/event_3.png'),
        },
    ]

    return (
        <>
            <CustomStatusBar
                backgroundColor={
                    Color.black
                }
                barStyle={'light-content'}
            />
            <ImageBackground source={require('../Assets/Images/bg.png')} style={styles.bg_container} imageStyle={styles.image}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                    style={{
                        width: '100%',
                        flexGrow: 0,
                    }}>
                    <CustomHeader leftIcon RightIcon />
                    <View style={styles.container}>
                        <TrendingView />
                        <View style={styles.main_view}>
                            <CustomText style={styles.heading}>Events</CustomText>
                            <FlatList
                                horizontal
                                data={events}
                                renderItem={(({ item, index }) => {
                                    return (
                                        <EventCard data={item} />
                                    )
                                })}
                            />
                            <CustomText style={styles.heading}>Genre</CustomText>
                            <FlatList
                                numColumns={4}
                                data={musicCategories}
                                renderItem={(({ item, index }) => {
                                    return (
                                        <View style={styles.category_view}>
                                            <CustomText numberOfLines={1} style={styles.category_text}>{item}</CustomText>
                                        </View>
                                    )
                                })}
                            />
                            <CustomText style={[styles.heading, { width: windowWidth * 0.8, textAlign: 'center' }]}>Artist</CustomText>
                            <CarouselView data={artist} />
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};


const styles = ScaledSheet.create({
    bottomImage: {
        width: windowWidth * 0.4,
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.6),
        width: '100%',
    },
    line: {
        width: windowWidth * 0.25,
        height: moderateScale(2, 0.6),
        backgroundColor: Color.veryLightGray
    },
    textContainer: {
        marginTop: moderateScale(20, 0.3),
    },
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    text_view: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.6)
    },

    Heading: {
        fontSize: moderateScale(24, 0.3),
        color: '#ffffff',
    },

    txt3: {
        fontSize: moderateScale(14, 0.6),
        alignSelf: 'center',
        color: Color.lightGrey,
        textAlign: 'center',
        marginTop: moderateScale(10, 0.6)
    },
    container: {
        width: windowWidth,
        height: windowHeight,
        paddingHorizontal: moderateScale(20, 0.6)
    },
    image: {
        width: '100%',
        height: '100%',
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt4: {
        color: Color.veryLightGray,
        fontSize: moderateScale(12, 0.6),
        marginTop: moderateScale(8, 0.3),
        width: '100%',
        textAlign: 'right',
        marginTop: moderateScale(10, 0.6),
    },
    txt5: {
        color: Color.white,
        marginTop: moderateScale(10, 0.3),
        fontSize: moderateScale(15, 0.6),
    },
    dropDown: {
        backgroundColor: Color.red,
    },
    text_1: {
        width: '40%',
        marginTop: 0,
        textAlign: 'center',
        color: Color.white,
        fontSize: moderateScale(14, 0.6),
        fontWeight: '700'
    },
    btn_txt: {
        fontSize: moderateScale(14, 0.6),
        color: Color.white,
        marginLeft: moderateScale(6, 0.6)
    },
    main_view: {
        marginVertical: moderateScale(40, 0.6)
    },
    heading: {
        fontSize: moderateScale(16, 0.6),
        color: Color.white,
        paddingVertical: moderateScale(10, 0.6)
    },
    category_view: {
        width: windowWidth * 0.2,
        padding: moderateScale(10, 0.6),
        borderWidth: 1,
        borderColor: Color.veryLightGray,
        marginRight: moderateScale(10, 0.6),
        marginBottom: moderateScale(10, 0.6),
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    category_text: {
        fontSize: moderateScale(11, 0.6),
        color: Color.veryLightGray,
    }
});

export default HomeScreen;
