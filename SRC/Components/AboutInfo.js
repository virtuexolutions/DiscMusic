import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Label from './Label'
import { launchCamera } from 'react-native-image-picker'
import { verticalScale } from 'react-native-size-matters'
import TitleWithDescription from './TitleWithDescription'

const AboutInfo = () => {
    const appInfoList = [
        {
          key: "version",
          title: "Version",
          description: "8.8.32.508",
          type: "text", // no action
        },
        {
          key: "third_party",
          title: "Third-party software",
          description: "Sweet software that helped us",
          type: "link",
        },
        {
          key: "terms",
          title: "Terms and conditions",
          description: "All the stuff you need to know.",
          type: "link",
        },
        {
          key: "privacy",
          title: "Privacy policy",
          description: "Important for both of us.",
          type: "link",
        },
        {
          key: "rules",
          title: "Platform rules",
          description: "Help keep spotify safe for all.",
          type: "link",
        },
        {
          key: "support",
          title: "Support",
          description: "Get help from us and the community",
          type: "link",
        },
      ];
      
  
    return (
    <View style={styles.container}>
        <Label
         text='About'
         style={styles.label}
        />
        {appInfoList.map((info, index)=> (
            <TitleWithDescription
            key={index}
            title={info.title}
            description={info.description}
            style={{paddingVertical:verticalScale(8)}}
            />
        ))}

    </View>
  )
}

export default AboutInfo

const styles = StyleSheet.create({
    container:{
        alignItems:"center",
    },
    label:{
        marginVertical:verticalScale(10)
    }
})