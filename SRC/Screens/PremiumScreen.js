import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../Components/CustomStatusBar';
import Color from '../Assets/Utilities/Color';
import CustomHeader from '../Components/CustomHeader';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import TitleWithDescription from '../Components/TitleWithDescription';
import CustomButton from '../Components/CustomButton';
import OfferDescriptions from '../Components/OfferDescriptions';
import OfferCard from '../Components/OfferCard';
import PremiumPlanList from '../Components/PremiumPlanList';
import MinimisedPlayer from '../Components/MinimisedPlayer';

const PremiumScreen = () => {
    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.black}
                barStyle={'light-content'}
            />
            <ImageBackground
                source={require('../Assets/Images/bg.png')}
                style={styles.bg_container}>
                <CustomHeader text={"Premium"}
                    leftIcon={true}
                    premium={true}
                    style={styles.header}
                />
                <ScrollView
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: scale(20),
                        paddingBottom: verticalScale(70),
                    }}>
                    <OfferCard />
                    <CustomButton
                        isGradient
                        text={'Get 3 Months Free'}
                        textColor={Color.white}
                        gradientColors={Color.themeGradient2}
                        width={windowWidth * 0.5}
                        height={windowHeight * 0.056}
                        // onPress={() => { setIsVisible(false) }}
                        //   onPress={() => navigationService.navigate('TabNavigation')}
                        marginTop={moderateScale(20, 0.3)}
                        borderRadius={windowWidth / 2}
                        fontSize={moderateScale(16, 0.3)}
                    />
                    <CustomText
                        style={styles.text}
                        children={"Individual plan only. $11.0/month after. terms and conditions apply. open only to users who haven’t already tried premium. offer ends 5/16/23."}
                    />
                    <OfferDescriptions />
                    <TitleWithDescription
                        title='Music Free'
                        titleStyle={styles.text1}
                        description='Current Plan'
                        descriptionStyle={styles.text2}

                        style={styles.container2}
                    />
                    <PremiumPlanList />
                </ScrollView>
                <MinimisedPlayer style={{ bottom: 0, height: windowHeight * 0.25 }} />
            </ImageBackground>
        </>
    )
}

export default PremiumScreen;

const styles = StyleSheet.create({
    bg_container: {
        width: windowWidth,
        height: windowHeight,
        alignItems: "center",
    },
    header: {
        justifyContent: "flex-start",
        gap: scale(18)
    },
    image: {
        width: "100%",
        height: "100%"
    },
    text: {
        fontSize: moderateScale(10, 0.2),
        color: "#7F8489",
        textAlign: "center",
        marginTop: verticalScale(10),
        lineHeight: moderateScale(16, 0.2),
        width: windowWidth * 0.9,
        paddingHorizontal: scale(10)
    },
    container2: {
        marginTop: verticalScale(10),
        width: windowWidth * 0.9,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#282C30",
        borderTopColor: "#3B4047",
        borderTopWidth: 1,
        paddingVertical: verticalScale(15),
        paddingHorizontal: scale(18),
        borderRadius: moderateScale(40),
        shadowColor: '#000',
        shadowOffset: {
            width: 10,
            height: 40,
        },
        shadowOpacity: 0.45,
        shadowRadius: 40,
        elevation: 18,
    },

    text1: {
        fontWeight: "bold",
        fontSize: moderateScale(14, 0.2),
        color: Color.white,
        textTransform: "capitalize",
        // width:windowWidth * 0.35
    },
    text2: {
        // fontWeight:"bold",
        fontSize: moderateScale(12, 0.2),
        color: "#7E8388",
        textTransform: "capitalize",
        // width:windowWidth * 0.35
    }

})      