import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'native-base'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import { moderateScale, scale } from 'react-native-size-matters';
import { windowWidth } from '../Utillity/utils';
const InfoText = ({text="", containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Icon
      name="information-outline"
      as={MaterialCommunityIcons}
      size={moderateScale(20)}
      color={Color.themeLightGray}
      />
      <CustomText
      style={styles.text}
      children={text}
      />
    </View>
  )
}

export default InfoText

const styles = StyleSheet.create({
    container:{
     width:windowWidth * 0.75,
     flexDirection:"row",
     alignItems:"center",
     gap:scale(5)
    },
    
    text:{
        width:"90%",      // width: 
        color:Color.themeLightGray,
        fontSize:moderateScale(9,0.2)
    }
})