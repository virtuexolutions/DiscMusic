import { Icon } from 'native-base';
import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo'
import Color from '../Assets/Utilities/Color';
const Checkbox = ({ checked, onChange, size = 24 }) => {
    return (
        <TouchableOpacity
            onPress={() => onChange(!checked)}
            activeOpacity={0.8}
            style={[styles.container, { width: size, height: size, borderRadius: size / 6, backgroundColor: checked ? Color.veryLightGray : 'transparent', borderColor: checked ? Color.veryLightGray : '#fff', }]}
        >
            {checked && <Icon as={Entypo} name='check' size={moderateScale(20, 0.6)} color={Color.white} />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        backgroundColor: '#fff',
    }
});

export default Checkbox;
