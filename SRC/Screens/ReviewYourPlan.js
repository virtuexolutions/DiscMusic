import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import CustomButton from '../Components/CustomButton'
import TitleWithDescription from '../Components/TitleWithDescription'
import IconWithText from '../Components/IconWithText'
import CustomText from '../Components/CustomText'
import AppliedPlanCard from '../Components/AppliedPlanCard'

const ReviewYourPlan = () => {
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.statusColor}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>
        <CustomHeader text={"Premium"}
          leftIcon={true}
          showBack={true}
          RightIcon={true}
          rightIconComponent={
            <CustomButton
              isGradient
              text={'Change Plan'}
              textColor={Color.white}
              width={windowWidth * 0.35}
              height={windowHeight * 0.04}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(12, 0.3)}
            />
          }
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

          <AppliedPlanCard />
          <TitleWithDescription
            style={styles.container}
            title={"Choose how to pay"}
            description={'You can pay for your premium plan directly through music or using your google play account.'}
            descriptionStyle={styles.description}
            titleStyle={styles.title}
          />
          <View style={styles.actions}>

            <CustomButton
              isGradient
              iconIsImage={true}
              iconSource={require('../Assets/Images/shapes3.png')}
              iconSize={scale(16)}
              text={'Change Plan'}
              style={{ gap: scale(10) }}
              textColor={Color.white}
              width={windowWidth * 0.35}
              height={windowHeight * 0.04}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(12, 0.3)}
            />
            <CustomButton
              isGradient
              iconIsImage={true}
              iconSource={require('../Assets/Images/gplay.png')}
              iconSize={scale(16)}
              text={'Google Play'}
              style={{ gap: scale(10) }}
              textColor={Color.white}
              width={windowWidth * 0.35}
              height={windowHeight * 0.04}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(12, 0.3)}
            />
          </View>
          <CustomText
            style={styles.text1}
            children={"You’ll go to google play to fifish purchasing your premium plan. the music offer terms and privacy policy apply. google play may also require you to agree to additional terms. questions about your purchase should be directed to google play."}
          />
          <View style={styles.card}>
            <CustomText
              style={styles.text3}
              children={"Pay for premium through your google play account and earn play points."}
            />
            <View style={styles.container2}>
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <View
                    style={styles.circle}
                  />
                )
              })}
            </View>

            <CustomButton
              isGradient
              gradientColors={Color.themeGradient2}
              text={'Continue With Google Play'}
              //   style={{gap:scale(10)}}
              isBold={true}
              textColor={Color.white}
              width={windowWidth * 0.56}
              height={windowHeight * 0.055}
              borderRadius={windowWidth / 2}
              fontSize={moderateScale(14, 0.3)}
            />
          </View>

          <View style={styles.footer}>
            <CustomText
              style={styles.text2}
              children={"India"}
            />
            <CustomText
              style={styles.text2}
              children={"Change Country"}
            />

          </View>

        </ScrollView>
      </ImageBackground>
    </>
  )
}

export default ReviewYourPlan

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    // gap: scale(18)
  },
  image: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: windowWidth * 0.9,
    paddingVertical: 0,
    paddingHorizontal: 0,
    gap: verticalScale(5)
  },
  title: {
    fontSize: moderateScale(14)
  },
  description: {
    fontSize: moderateScale(12)
  },
  actions: {
    flexDirection: "row",
    gap: scale(20),
  },
  text1: {
    fontSize: moderateScale(12, 0.2),
    color: "#7F8489",
    width: windowWidth * 0.85,
    textAlign: "center",
    lineHeight: 15
  },
  text2: {
    fontSize: moderateScale(12, 0.2),
    color: Color.white,
    lineHeight: 15
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: scale(15),
    alignItems: "center",
    width: windowWidth
  },
  card: {
    width: windowWidth * 0.9,
    padding: 0,
    gap: verticalScale(20),
    marginTop: verticalScale(10),
    backgroundColor: "#282C30",
    borderTopColor: "#3B4047",
    borderTopWidth: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    // paddingBottom:verticalScale(20),
    paddingVertical: verticalScale(20),
    borderRadius: moderateScale(30, 0.2),
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
  text3: {
    fontSize: moderateScale(12, 0.2),
    color: "#7F8489",
    // width:windowWidth * 0.85,
    textAlign: "center",
    lineHeight: 15
  },
  circle: {
    width: scale(20),
    height: scale(20),
    overflow: "hidden",
    borderRadius: scale(20),
    backgroundColor: "rgba(0,0,0,0.25)"
  },
  container2: {
    flexDirection: "row",
    gap: scale(10)
  }

})