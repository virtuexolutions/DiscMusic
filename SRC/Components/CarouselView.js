import { StyleSheet, View, Animated } from 'react-native';
import React from 'react';
import Carousel from "react-native-reanimated-carousel";
import { windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';

const ITEM_SIZE = 140;
const SIDE_SIZE = 90;
const CarouselView = ({ data }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Carousel
                width={windowWidth}
                height={180}
                data={data}
                mode="parallax"
                loop
                scrollAnimationDuration={900}

                modeConfig={{
                    parallaxScrollingScale: 1.25,
                    parallaxScrollingOffset: 60,
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
                                source={item.image}
                                style={{ width: "100%", height: "100%", borderRadius: size / 2 }}
                            />
                        </View>
                    );
                }}
            />
        </View>
    );
};

export default CarouselView;

const styles = StyleSheet.create({
    circleContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: "#222",
        elevation: 5,
    }
});
