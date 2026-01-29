import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomStatusBar from '../Components/CustomStatusBar'
import Color from '../Assets/Utilities/Color'
import CustomHeader from '../Components/CustomHeader'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomButton from '../Components/CustomButton'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import IconWithText from '../Components/IconWithText'
import CustomImage from '../Components/CustomImage'
import CustomText from '../Components/CustomText'
import { Avatar } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient'
import ThemeIconButton from '../Components/ThemeIconButton'

const YourLibrary = () => {
  const array = [
    {
      id:1, title:"Abhijeet", type :"Artist", image:(require("../Assets/Images/artist7.png")),
    },
    {
      id:2, title:"A.R.Rahman", type :"Artist", image:(require("../Assets/Images/artist8.png")),
    },
    {
      id:3, title:"Sunidhi Chauhan", type :"Artist", image:(require("../Assets/Images/artist9.png")),
    },
  ];
  const actions= [{
    id:"add", title:"Add artist", onPress: () => {}, 
  },
  {
    id:"add", title:"Add podcasts & shows",onPress: () => {}, 
  },
];
  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.black}
        barStyle={'light-content'}
      />
      <ImageBackground
        source={require('../Assets/Images/bg.png')}
        style={styles.bg_container}>
        <CustomHeader text={"Your Library"}
          leftIcon={true}
          user={true}
          titlStyle={{
            width:windowWidth * 0.4
          }}
          RightIcon={true}
          search={true}
          add={true} />
<View style={styles.row}>
        <CustomButton
          isGradient
          text={'Artists'}
          textColor={Color.white}
          width={windowWidth * 0.4}
          height={windowHeight * 0.05}
          onPress={() => { }}
          marginTop={moderateScale(20, 0.3)}
          borderRadius={windowWidth / 2}
          fontSize={moderateScale(16, 0.3)}
          />
</View>
        <View style={styles.row}>
          <IconWithText
            iconSource={require("../Assets/Images/arrows.png")}
            text='Recents'
            textStyle={styles.text1}
          />
          <CustomImage
            source={require("../Assets/Images/category.png")}
            style={styles.icon}
            onPress={() => { }}
          />
        </View>
        <FlatList
        data={[...array, ...actions]}
        keyExtractor={item => item}
        contentContainerStyle={{
          marginTop:verticalScale(20),
          paddingBottom:scale(50),
          gap:verticalScale(10)
        }}
        renderItem={({item, index}) =>{
          return (
              <ArtistCard 
              item={item}
              />
          );
        }}
        />
      </ImageBackground>
    </>
  )
}

const ArtistCard = ({
  item
}) =>{
  const isCreate = ['add'].includes(item.id);
  return (
    <TouchableOpacity
    style={[styles.card, isCreate && {overflow:"visible"}]}
    onPress={isCreate ? item?.onPress : ()=>{}}
  >
{isCreate ? <ThemeIconButton
 isGradient={true}
 iconName={"plus"}
 iconType={Feather}
 iconSize={scale(14)}
 gradientColors={Color.themeGradient}
 style={styles.imageContainer}
 /> : <Avatar
// bgColor={[Color.black, "white"]}
width={windowWidth * 0.18}
height={windowWidth * 0.18}
source={item.image}
// shadow={"9"}
style={{elevation:16, shadowColor: Color.black, 
  shadowOpacity:0.87,
  shadowRadius:(windowWidth * 0.18) /2,
  shadowOffset : {height:15, width:10}}}

outlineColor={"red"}
outlineStyle={"dasheds"}

/>}

    {/* <View style={styles.imageContainer}>
      <CustomImage
        source={require("../Assets/Images/artist7.png")}
        style={styles.image}
      />
    </View> */}
    <View style={styles.info}>
      <CustomText
        children={item?.title}
        style={styles.title}
      />
     {!isCreate && <CustomText
        children={item.type}
        style={styles.desc}
      />}
    </View>

  </TouchableOpacity>
  );
}


export default YourLibrary

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    height: windowHeight,
    alignItems: "center",
    // paddingHorizontal:scale(5)
  },
  image: {
    width: "100%",
    height: "100%"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    width: windowWidth,
    paddingVertical: verticalScale(18)
  },
  text1: {
    fontSize: moderateScale(14, 0.2),
    fontWeight: "500"
  },
  icon: {
    width: scale(18),
    height: scale(18),
    tintColor: Color.white
  },
  card:{
    width: windowWidth * 0.9,
    flexDirection:"row",
    alignItems:"center",
    gap:scale(20),
    
    overflow:"hidden",
    backgroundColor:"#282C30",
    borderRadius:(windowWidth * 0.18) /2,
    elevation:16,
    shadowColor:Color.black,
    shadowRadius:(windowWidth * 0.2 ) /2,
    shadowOffset:{ width: 20, height:20},
    shadowOpacity:0.15,
  },
  imageContainer:{
    width:windowWidth * 0.18,
    height: windowWidth * 0.18,
    borderRadius:(windowWidth * 0.18) /2,
    overflow:'hidden',
    elevation:6,
    shadowColor:Color.white,
    shadowRadius:(windowWidth * 0.2 ) /2,
    shadowOffset:{ width: 10, height:10},
    shadowOpacity:0.4,
  },
  info:{
    gap:verticalScale(5)
  },
  title:{
    fontSize:moderateScale(12,0.2),
    fontWeight:"500",
    color:Color.white
  },
  desc:{
    fontSize:moderateScale(10,0.2),
    fontWeight:"500",
    color:Color.themeLightGray,
  }
})