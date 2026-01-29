import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomImage from './CustomImage';
import TitleWithDescription from './TitleWithDescription';
import { Icon } from 'native-base';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import SongListTile from './SongListTile';

const PopularReleases = ({ data }) => {
    const songsList = [
        {
            id: '1',
            image: require("../Assets/Images/recent4.png"),
            title: 'hum to deewane huye(lo-fi remix)"',
            type: "song | conan gray",
        },
        {
            id: '2',
            image: require("../Assets/Images/release2.png"),
            title: 'main khiladi (from “selfiee”)',
            type: "song | calvin harris",
        },
        {
            id: '3',
            image: require("../Assets/Images/release3.png"),
            title: 'sensational duets (abhijeet & alka y..',
            type: "playlist | playlistm7",
        },
        {
            id: '4',
            image: require("../Assets/Images/release4.png"),
            title: 'tere binA',
            type: "song | conan gray",
        },
    ];


    return (

        <FlatList
            data={songsList}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={<CustomText
                style={styles.heading}
                children={"Popular Releases"}
            />}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
                return (
                    <SongListTile
                        image={item?.image}
                        title={item?.title}
                        subtitle={item?.type}
                        showMoreOption={false}
                    />
                );
            }}
        />
    )
}

export default PopularReleases;

const styles = StyleSheet.create({
    contentContainer: {
        width: windowWidth,
        backgroundColor: "#282C30",
        borderRadius: moderateScale(30, 0.2),
        marginTop: verticalScale(30),
        paddingHorizontal: scale(15),
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(15),
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 40,
        },
        shadowOpacity: 0.45,
        shadowRadius: 40,
        elevation: 10,
    },

    heading: {
        fontSize: moderateScale(14, 0.2),
        color: Color.white,
        paddingVertical: verticalScale(10)
    },

})