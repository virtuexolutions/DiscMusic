import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import CustomImage from './CustomImage'
import CustomText from './CustomText'
import Slider from '@react-native-community/slider';
import AudioSlider from './AudioSlider'
import { Icon } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

const TrendingView = () => {
    const play_list = [
        require('../Assets/Images/playlist_1.png'),
        require('../Assets/Images/playlist_2.png'),
        require('../Assets/Images/playlist_3.png'),
        require('../Assets/Images/playlist_4.png'),
    ]

    return (
        <View style={styles.container}>
            <View style={styles.main_view_1}>
                <View style={styles.sub_view_1}>
                    <FlatList
                        data={play_list}
                        horizontal
                        scrollEnabled={false}
                        renderItem={({ item }) => {
                            console.log('itemmmmmm', item)
                            return (
                                <View style={styles.inner_view}>
                                    <CustomImage source={item} style={styles.image} />
                                </View>
                            )
                        }}
                    />
                    <CustomText isBold style={styles.heading}>Trending</CustomText>
                    <CustomText style={styles.text}>384 songs</CustomText>
                    <AudioSlider />
                </View>
                <View style={styles.sub_view_2}>
                    <View style={styles.row_view}>
                        <View style={styles.icon_View} >
                            <Icon name='replay' as={MaterialIcons} size={moderateScale(25, 0.6)} color={Color.white} />
                        </View>
                        <View style={styles.icon_View} >
                            <Icon name='pause' as={MaterialIcons} size={moderateScale(25, 0.6)} color={Color.white} />
                        </View>
                    </View>
                    <View style={[styles.row_view, { marginTop: moderateScale(5, 0.6) }]}>
                        <View style={styles.icon_View} >
                            <Icon name='step-backward' as={AntDesign} size={moderateScale(25, 0.6)} color={Color.white} />
                        </View>
                        <View style={styles.icon_View} >
                            <Icon name='controller-next' as={Entypo} size={moderateScale(25, 0.6)} color={Color.white} />
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.row_view, {
                paddingHorizontal: moderateScale(10, 0.6), paddingVertical: moderateScale(10, 0.6
                )
            }]}>
                <View style={styles.image_view_1}>
                    <CustomImage source={require('../Assets/Images/weather.png')} style={styles.image} />
                </View>
                <View style={styles.image_view_2}>
                    <CustomImage source={require('../Assets/Images/trending.png')} style={styles.image} />
                </View>
            </View>
        </View>
    )
}

export default TrendingView

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.65,
    },
    main_view_1: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.4,
        backgroundColor: Color.black,
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(6, 0.6)
    },
    sub_view_1: {
        width: windowWidth * 0.58,
        height: '95%',
        backgroundColor: Color.themeBlack,
        borderRadius: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(6, 0.6),
        paddingVertical: moderateScale(6, 0.6)
    },
    sub_view_2: {
        width: windowWidth * 0.25,
        height: '95%',
        borderRadius: moderateScale(10, 0.6)
    },
    inner_view: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: moderateScale(8, 0.6),
        marginRight: moderateScale(3, 0.6),
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(8, 0.6),
    },
    heading: {
        fontSize: moderateScale(13, 0.6),
        color: Color.white
    },
    text: {
        fontSize: moderateScale(11, 0.6),
        color: Color.veryLightGray
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    icon_View: {
        width: windowWidth * 0.12,
        height: windowWidth * 0.17,
        backgroundColor: Color.themeBlack,
        borderRadius: moderateScale(10, 0.6),
        justifyContent: 'center',
        alignItems: 'center'
    },
    image_view_1: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.3,
        backgroundColor: "red",
        borderRadius: moderateScale(10, 0.6)
    },
    image_view_2: {
        width: windowWidth * 0.5,
        height: windowWidth * 0.3,
        backgroundColor: "red",
        borderRadius: moderateScale(10, 0.6)
    }
})