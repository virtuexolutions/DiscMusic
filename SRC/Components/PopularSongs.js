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

const PopularSongs = ({ data }) => {
    const songsList = [
        {
            id: '1',
            image: require("../Assets/Images/bottom.png"),
            title: 'Main Khiladi - From "Selfiee"',
            plays: 22836690,
        },
        {
            id: '2',
            image: require("../Assets/Images/recent1.png"),
            title: 'Jhanjharia - Mala Version',
            plays: 13226572,
        },
        {
            id: '3',
            image: require("../Assets/Images/artist1.png"),
            title: 'Tumhe Jo Maine Dekha',
            plays: 19506427,
        },
        {
            id: '4',
            image: require("../Assets/Images/recent2.png"),
            title: 'Chunnari Chunnari',
            plays: 14006854,
        },
        {
            id: '5',
            image: require("../Assets/Images/recent3.png"),
            title: 'Main Koi Aisa Geet Gaoon (From...)',
            plays: 30412561,
        },
    ];


    return (

        <FlatList
            data={songsList}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={<CustomText
                style={styles.heading}
                children={"Popular"}
            />}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
                return (
                    <SongListTile
                    image={item?.image}
                    title={item?.title}
                    subtitle={item?.plays}
                    showMoreOption={true}
                    />
                );
            }}
        />
    )
}

export default PopularSongs

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