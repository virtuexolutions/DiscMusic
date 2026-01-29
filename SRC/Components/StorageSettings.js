import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from './Label'
import TitleWithDescription from './TitleWithDescription'
import ToggleSwitchWithInfo from './ToggleSwitchWithInfo'
import CustomText from './CustomText'
import IconWithText from './IconWithText'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import { windowWidth } from '../Utillity/utils'

const StorageSettings = () => {
  return (
    <View style={styles.container}>
         <Label
            style={styles.label} 
            text={"Storage"}
            />
           <View style={styles.container2}>
            <View style={styles.row}>
            <IconWithText
             iconSource={require("../Assets/Images/category.png")}
             text='Other apps'
             />
            <CustomText
            style={styles.text}
            children={"51.6 GB"}
            />
            </View>
            <View style={styles.row}>
            <IconWithText
             iconSource={require("../Assets/Images/trash.png")}
             text='Cache'
             />
            <CustomText
            style={styles.text}
            children={"49.0 GB"}
            />
            </View>
            <View style={styles.row}>
            <IconWithText
             iconSource={require("../Assets/Images/folder-open.png")}
             text='Free'
             />
            <CustomText
            style={styles.text}
            children={"824.0 GB"}
            />
            </View>
           </View>
            <ToggleSwitchWithInfo
            title='Remove all downloads'
            description='Remove all of the spotify content you have downloaded for offline use.'
            on={false}
            onToggle={()=>{
              // setAudioQuality(prev => !prev)
            }}
            />
            <ToggleSwitchWithInfo
            title='Clear cache'
            description='You can free up storage by clearing your cache. your downloads won’t be removed.'
            on={false}
            onToggle={()=>{
              // setAudioQuality(prev => !prev)
            }}
            />
    </View>
  )
}

export default StorageSettings

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
        // backgroundColor:Color.red,
        marginTop:verticalScale(8)
    },
    
    container2:{
        backgroundColor:'rgba(0,0,0,0.25)',
        borderRadius:moderateScale(25,0.2),
        paddingHorizontal:scale(20),
        width: windowWidth * 0.7,
        paddingVertical:verticalScale(10),
    },
    label:{
        marginVertical:verticalScale(8),
    },
    row:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:verticalScale(8)
    },
    text:{
        fontSize:moderateScale(10,0.2),
        lineHeight:moderateScale(18,0.2),
        color:Color.white
    }
})