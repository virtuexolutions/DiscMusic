import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ThemeIconButton from './ThemeIconButton'
import Color from '../Assets/Utilities/Color'
import { moderateScale, scale } from 'react-native-size-matters'
import Fontisto from 'react-native-vector-icons/Fontisto';
import { windowWidth } from '../Utillity/utils'
import AudioSlider from './AudioSlider'
const PlayerSliderWithActions = () => {
  return ( 
   <View style={styles.container}>
           <AudioSlider
           containerStyle={styles.sliderContainer}
           sliderTimerContainerStyle={styles.sliderTimerContainer}
           />
                        <View style={styles.actions}>

                        <ThemeIconButton
                            style={styles.iconButton}
                            iconType={Fontisto}
                            iconSize={moderateScale(14, 0.2)}
                            iconName={"step-backwrad"}
                            iconColor={Color.white}
                        />
                        <ThemeIconButton
                            style={styles.iconButton}
                            iconType={Fontisto}
                            iconSize={moderateScale(14, 0.2)}
                            iconName={"pause"}
                            iconColor={Color.white}
                        />
                        <ThemeIconButton
                            style={styles.iconButton}
                            iconType={Fontisto}
                            iconSize={moderateScale(14, 0.2)}
                            iconName={"step-forward"}
                            iconColor={Color.white}
                        />
                    </View>
   </View>
  )
}

export default PlayerSliderWithActions

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
    },
    sliderContainer:{
         paddingHorizontal:scale(10)
        },
        sliderTimerContainer:{
           marginTop:0, 
            paddingHorizontal:scale(10)
    },
    actions:{
        flexDirection:"row",
        justifyContent:"center",
        gap:scale(10)
    },
    iconButton:{
        elevation:0,
        shadowColor:"transparenet",
        borderColor:Color.themeLightGray,
        borderWidth:1,
        backgroundColor:"#4a4743"

    }
})