import { StyleSheet, Text, TextComponent, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
import TitleWithDescription from './TitleWithDescription'
import navigationService from '../navigationService'
import { baseUrl, imageUrl } from '../Config'

const ArtistAboutInfo = ({ data }) => {
    return (
        <View style={styles.mainContainer}>
            <CustomText
                style={styles.heading}
                children={"About"}
            />
            <ArtistInfoCard data={data} />
        </View>
    )
}

export default ArtistAboutInfo;

function ArtistInfoCard({ data }) {
console.log("🚀 ~ ArtistInfoCard ~ data:", data)

    const tempData = {
        bio: data?.bio,
        name: data?.user?.name,
        profile_image: data?.user?.profile_image
    }
    // console.log("🚀 ~ ViewArtistLibrary ~ tempData:", tempData)
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <CustomImage
                    source={data?.user?.profile_image ? { uri: `${baseUrl}/storage/${data?.user?.profile_image}` } : require("../Assets/Images/artist10.png")}
                    style={styles.image}
                />
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.verificationContainer}>
                    <CustomImage
                        source={require("../Assets/Images/verify.png")}
                        style={styles.badge}
                    />
                    <CustomText
                        children={"Verified Artist"}
                        style={styles.text1}
                    />
                </View>
                <View style={styles.info}>
                    <TitleWithDescription
                        style={styles.textContainer}
                        title={data?.statistics?.total_followers}
                        titleStyle={styles.text2}
                        descriptionStyle={styles.text3}
                        description={(typeof data?.bio === 'object' ? data?.bio?.bio : data?.bio) || 'No Bio'}
                        numberOfLines={2}
                    />
                    <CustomImage
                        onPress={() => {
                            navigationService.navigate('AboutArtist', { data: tempData })
                        }}
                        source={require("../Assets/Images/arrow-circle-right.png")}
                        style={styles.badge}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        gap: verticalScale(20),
        marginVertical: verticalScale(20),
        // backgroundColor: 'red'
    },
    heading: {
        fontSize: moderateScale(1, 0.2),
        color: Color.white,
        marginLeft: scale(20),
        lineHeight: moderateScale(10)
    },
    card: {
        width: windowWidth,
        flexDirection: 'row',
        backgroundColor: "#282C30",
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(10),
        borderTopWidth: 1,
        borderTopColor: "#3B4047",
        gap: verticalScale(15),
        shadowColor: '#000',
        borderRadius: moderateScale(20, 0.2),
        alignItems: 'center',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    imageContainer: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
        overflow: "hidden",
        borderRadius: scale(20),
    },
    image: {
        width: "100%",
        height: "100%",
    },
    badge: {
        width: scale(25),
        height: scale(25),
    },
    info: {
        flexDirection: "row",
        alignItems: "center",
        gap: scale(20)
    },
    textContainer: {
        width: windowWidth * 0.4,
        paddingHorizontal: 0,
    },
    infoContainer: {
        top: verticalScale(10),
        // backgroundColor:Color.red,
        alignItems: "flex-start"
    },
    verificationContainer: {
        gap: scale(3)
    },
    text1: {
        fontSize: moderateScale(12, 0.2),
        color: Color.white
    },
    text2: {
        fontSize: moderateScale(16, 0.2),
    },
    text3: {
        fontSize: moderateScale(14, 0.2),
    }
})