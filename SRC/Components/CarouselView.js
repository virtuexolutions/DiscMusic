import { StyleSheet, View, Animated, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Carousel from "react-native-reanimated-carousel";
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { moderateScale, scale } from 'react-native-size-matters';
import navigationService from '../navigationService';

const ITEM_SIZE = 140;
const SIDE_SIZE = 90;
const CarouselView = ({ data=[
    require("../Assets/Images/event_1.png"),
    require("../Assets/Images/event_2.png"),
    require("../Assets/Images/event_2.png"),
] }) => {
    return (
        <GestureHandlerRootView>

        {/* <View style={{ alignItems: "center" }}>
            <Carousel
                width={windowWidth}
                height={windowHeight * 0.2}
                data={data}
                mode="parallax"
                loop
                scrollAnimationDuration={900}
                
                modeConfig={{
                    parallaxScrollingScale: 1.25,
                    parallaxScrollingOffset: 100,
                    parallaxAdjacentItemScale:10
                }}
                
                renderItem={({ index, item, animationValue }) => {
                    
                    const scale = animationValue.value;
                    
                    const size = scale > 0.8 ? ITEM_SIZE : SIDE_SIZE;
                    
                    return (
                        <View
                        style={
                            styles.circleContainer
                        }
                        >
                            <CustomImage
                                source={item}
                                style={{
                                    width:"100%",
                                    height:"100%"
                                }}
                                // style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
                                />
                     </View>
                    );
                }}
                /> */}
                <FlatList
                horizontal

                data={data}
                contentContainerStyle={{gap:scale(30)}}
                renderItem={({ index, item,}) => {
                    return (
                        <TouchableOpacity
                        onPress={()=>{
                            navigationService.navigate("MusicPlayerScreen");
                        }}
                        style={
                            styles.circleContainer
                        }
                        >
                            <CustomImage
                                source={item}
                                style={{
                                    width:"100%",
                                    height:"100%"
                                }}
                                // style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
                                />
                     </TouchableOpacity>
                    );
                }}
                />
        {/* </View> */}
</GestureHandlerRootView>
    );
};

export default CarouselView;

const styles = StyleSheet.create({
    circleContainer: {
            width:windowWidth * 0.3,
        height:windowWidth * 0.3,
        overflow: "hidden",
        borderRadius:(windowWidth * 0.3) /2,
        // backgroundColor: "#222",
        elevation: 5,
    }
});
