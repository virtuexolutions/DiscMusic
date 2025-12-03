import { Icon, ScrollView, View } from 'native-base';
import React from 'react';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import { ImageBackground, TouchableOpacity } from 'react-native';
import CustomHeader from '../Components/CustomHeader';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import TrendingView from '../Components/TrendingView';
const HomeScreen = () => {
    return (
        <>
            <CustomStatusBar
                backgroundColor={
                    Color.black
                }
                barStyle={'light-content'}
            />
            <ImageBackground source={require('../Assets/Images/bg.png')} style={styles.bg_container} imageStyle={styles.image}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                    contentContainerStyle={{
                        alignSelf: 'center',
                        alignItems: 'center',
                    }}
                    style={{
                        width: '100%',
                        flexGrow: 0,
                    }}>
                    <CustomHeader leftIcon RightIcon />
                    <View style={styles.container}>
                        <TrendingView />
                    </View>
                </ScrollView>
            </ImageBackground>
        </>
    );
};


const styles = ScaledSheet.create({
    bottomImage: {
        width: windowWidth * 0.4,
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.6),
        width: '100%',
    },
    line: {
        width: windowWidth * 0.25,
        height: moderateScale(2, 0.6),
        backgroundColor: Color.veryLightGray
    },
    textContainer: {
        marginTop: moderateScale(20, 0.3),
    },
    bg_container: {
        width: windowWidth,
        height: windowHeight,
    },
    text_view: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(20, 0.6)
    },

    Heading: {
        fontSize: moderateScale(24, 0.3),
        color: '#ffffff',
    },

    txt3: {
        fontSize: moderateScale(14, 0.6),
        alignSelf: 'center',
        color: Color.lightGrey,
        textAlign: 'center',
        marginTop: moderateScale(10, 0.6)
    },
    container: {
        width: windowWidth,
        height: windowHeight,
        paddingHorizontal: moderateScale(20, 0.6)
    },
    image: {
        width: '100%',
        height: '100%',
    },
    container2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt4: {
        color: Color.veryLightGray,
        fontSize: moderateScale(12, 0.6),
        marginTop: moderateScale(8, 0.3),
        width: '100%',
        textAlign: 'right',
        marginTop: moderateScale(10, 0.6),
    },
    txt5: {
        color: Color.white,
        marginTop: moderateScale(10, 0.3),
        fontSize: moderateScale(15, 0.6),
    },
    dropDown: {
        backgroundColor: Color.red,
    },
    text_1: {
        width: '40%',
        marginTop: 0,
        textAlign: 'center',
        color: Color.white,
        fontSize: moderateScale(14, 0.6),
        fontWeight: '700'
    },
    btn_txt: {
        fontSize: moderateScale(14, 0.6),
        color: Color.white,
        marginLeft: moderateScale(6, 0.6)
    }
});

export default HomeScreen;
