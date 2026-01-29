import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomImage from './CustomImage';
import TitleWithDescription from './TitleWithDescription';
import { Icon } from 'native-base';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import SongListTile from './SongListTile';
import SearchContainer from './SearchContainer';

const PlayList = ({ data }) => {
    const [search, setSearch] = useState("");
    const songsList = [
        {
            id: '1',
            image: require("../Assets/Images/bottom.png"),
            title: 'Someone to Be Around',
            type: 'song | Six60',
        },
        {
            id: '2',
            image: require("../Assets/Images/recent1.png"),
            title: 'Miss You',
            type: 'song | Oliver Tree',
        },
        {
            id: '3',
            image: require("../Assets/Images/artist1.png"),
            title: "Don't remind me i'm minding me",
            type: 'playlist | PlaylistM7',
        },
        {
            id: '4',
            image: require("../Assets/Images/recent2.png"),
            title: 'Mega Hit Mix',
            type: 'playlist | Spotify',
        },
        {
            id: '5',
            image: require("../Assets/Images/recent3.png"),
            title: 'One Kiss (With Dua Lipa)',
            type: 'song | Calvin Harris',
        },
        {
            id: '6',
            image: require("../Assets/Images/recent4.png"),
            title: 'Heather',
            type: 'song | Conan Gray',
        },
        {
            id: '7',
            image: require("../Assets/Images/release2.png"),
            title: 'Catching Feelings',
            type: 'song | Calvin Harris',
        },
        {
            id: '8',
            image: require("../Assets/Images/release3.png"),
            title: "Don't Forget Your Roots - 2021",
            type: 'playlist | PlaylistM7',
        },
        {
            id: '9',
            image: require("../Assets/Images/release4.png"),
            title: 'Before You Leave',
            type: 'song | Conan Gray',
        },
    ];
    return (
     <View style={styles.container}>
<SearchContainer
placeholder={"Find in Playlist"}
          data={search}
          setData={setSearch}
          input/>
        <FlatList
            data={songsList}
            contentContainerStyle={styles.contentContainer}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => {
                return (
                    <SongListTile
                    image={item?.image}
                    title={item?.title}
                    subtitle={item?.type}
                    showMoreOption={true}
                    />
                );
            }}
            />
            </View>
    )
}

export default PlayList;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        backgroundColor: "#282C30",
        alignItems:"center",
        gap:verticalScale(20),
        borderRadius: moderateScale(30, 0.2),
        marginTop: verticalScale(10),
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
   contentContainer:{
    paddingBottom:scale(20),
   },
    heading: {
        fontSize: moderateScale(14, 0.2),
        color: Color.white,
        paddingVertical: verticalScale(10)
    },

})