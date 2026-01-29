import { StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import ThemeIconButton from './ThemeIconButton';
import Feather from 'react-native-vector-icons/Feather';
const BackButton = () => {
    const navigation = useNavigation();
    return (
        <ThemeIconButton
            onPress={() => {
                navigation.goBack();
            }}
            isGradient={true}
            gradientColors={Color.themeBgColor}
            iconName={"arrow-left"}
            iconType={Feather}
            // iconSource={user ? require("../Assets/Images/user.png") : nulll}
        />
    )
}

export default BackButton;