import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'

const TrendingView = () => {
    return (
        <View style={styles.container}>
            <View style={styles.main_view_1}>
                <View style={styles.sub_view_1}>
                    <View>

                    </View>
                </View>
                <View style={styles.sub_view_2}>

                </View>
            </View>
            <Text>TrendingView</Text>
        </View>
    )
}

export default TrendingView

const styles = StyleSheet.create({
    container: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.65,
    },
    main_view_1: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.4,
        backgroundColor: Color.black,
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(6, 0.6)
    },
    sub_view_1: {
        width: windowWidth * 0.54,
        height: '95%',
        backgroundColor: Color.themeBlack,
        borderRadius: moderateScale(10, 0.6)
    },
    sub_view_2: {
        width: windowWidth * 0.28,
        height: '95%',
        backgroundColor: Color.themeBlack,
        borderRadius: moderateScale(10, 0.6)
    }
})