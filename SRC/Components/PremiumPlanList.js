import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import CustomText from './CustomText';
import TitleWithDescription from './TitleWithDescription';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import { useNavigation } from '@react-navigation/native';

const PremiumPlanList = () => {
  const subscriptionPlans = [
    {
      id: 'mini',
      title: 'Mini',
      description:
        '1 day and weekly plans. Ad-free music on mobile. Download 30 songs on 1 mobile device.',
      price: 'From $7',
      duration: 'For 1 Day',
      cta: 'View Plans',
      isFree: false,
      note: `Prices vary according to duration of plan`
    },
    {
      id: 'individual',
      title: 'Premium Individual',
      description:
        'Ad-free music on mobile. Download to listen offline. Cancel anytime.',
      price: 'From $0',
      duration: 'For 3 Months',
      cta: 'View Plans',
      isFree: false,
      note: "Individual plan only. $11.0/month after. terms and conditions apply. open only to users who haven’t already tried premium. offer ends 5/16/23."
    },
    {
      id: 'duo',
      title: 'Premium Duo',
      description:
        '2 Premium accounts for couples living together. Ad-free music. Download offline on 2 devices.',
      price: 'Free',
      duration: 'For 1 Month',
      cta: 'View Plans',
      isFree: true,
      note: `Only for users who are new to premium`,
    },
    {
      id: 'family',
      title: 'Premium Family',
      description:
        'Ad-free music. Up to 6 Premium accounts for family members living together.',
      price: 'Free',
      duration: 'For 1 Month',
      cta: 'View Plans',
      isFree: true,
      note: 'Only for users who are new to premium',
    },
    {
      id: 'student',
      title: 'Premium Student',
      description:
        'Ad-free music on mobile. Download to listen offline.',
      price: 'Free',
      duration: 'For 1 Month',
      cta: 'View Plans',
      isFree: true,
      note: 'Available only to students at accredited institutions',
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {subscriptionPlans?.map((item, index) => {
        return (
          <PremiumCard
            item={item}
          />
        );
      })}
    </View>
  )
}

export default PremiumPlanList;

const PremiumCard = ({ item }) => {
  const naviagtion = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <CustomText
          children={item.title}
          style={styles.type}
        />
      </View>
      <CustomText
        children={item.description}
        style={styles.description}
      />
      <View style={styles.innerContainer}>
        <TitleWithDescription
          style={styles.textContainer}
          title={item.price}
          description={item.duration}
          titleStyle={styles.text1}
          descriptionStyle={styles.text2}
        />
        <CustomButton
          isGradient
          text={'View Plans'}
          textColor={Color.white}
          gradientColors={Color.themeGradient2}
          width={windowWidth * 0.35}
          onPress={() => {
            naviagtion.navigate("ReviewYourPlan")
          }}
          shadowColor={Color.black}
          height={windowHeight * 0.056}
          borderRadius={windowWidth / 2}
          fontSize={moderateScale(16, 0.3)}
        />
      </View>
      <CustomText style={styles.text3}>
        {item.note}

        {item.id !== "individual" && <CustomText isBold
          style={{ color: Color.white }}
          children={"Terms And Conditions  "}
        />
        }{item.id !== "individual" && "apply"}

      </CustomText>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    container: {
      width: windowWidth * 0.9,
      padding: 0,
      gap: verticalScale(20),
      marginTop: verticalScale(10),
      backgroundColor: "#282C30",
      borderTopColor: "#3B4047",
      borderTopWidth: 1,
      alignItems: "center",
      paddingBottom: verticalScale(20),
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
    label: {
      margin: 0,
      top: verticalScale(-4),
      backgroundColor: "rgba(0,0,0,0.3)",
      paddingVertical: verticalScale(10),
      paddingHorizontal: scale(20),
      borderBottomLeftRadius: moderateScale(20),
      borderBottomRightRadius: moderateScale(20),
    },
    type: {
      fontSize: moderateScale(20, 0.2),
      color: Color.white
    },
    innerContainer: {
      backgroundColor: "rgba(0,0,0,0.3)",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: moderateScale(30, 0.2),
      paddingVertical: verticalScale(20),
      paddingHorizontal: scale(20)
    },
    textContainer: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      // justifyContent:"flex-start",
      // backgroundColor:"red",
      width: windowWidth * 0.35,
      // alignItems:"center",
    },
    description: {
      color: "#7F8489",
      width: windowWidth * 0.78,
      textAlign: "center",
    },
    text1: {
      fontSize: moderateScale(20, 0.2),
      color: Color.white
    },
    text2: {
      fontSize: moderateScale(14, 0.2),
    },
    text3: {
      color: "#7F8489",
      textAlign: 'center',
      lineHeight: 16,
      fontSize: moderateScale(12, 0.2),
      width: windowWidth * 0.78
    }
  })