import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../Assets/Utilities/Color';
const CircularMenu = ({containerStyle,}) => {
  return (
    <View style={[{backgroundColor: '#f3f3f3'}, containerStyle]}>
    <ActionButton 
    buttonColor={Color.darkGray} 
    
    >
      <ActionButton.Item buttonColor={Color.darkGray} title="New Task" onPress={() => console.log("notes tapped!")}>
        <Icon name="home" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={Color.darkGray} title="Notifications" onPress={() => {}}>
        <Icon name="menu" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={Color.darkGray} title="All Tasks" onPress={() => {}}>
        <Icon name="flame" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={Color.darkGray} title="All Tasks" onPress={() => {}}>
        <Icon name="musical-notes-sharp" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
  )
}

export default CircularMenu

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
      },
    
})