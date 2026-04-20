import React from 'react';
import ThemeIconButton from './ThemeIconButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { useLikeTrack } from '../Hooks/useLikeTrack';

const LikeButton = ({ track, style }) => {
    const { isLiked, toggleLike } = useLikeTrack(track);
    // console.log('track==================== >>>>>>>>>>>>>>>>>>>>>>>> from like button', isLiked)

    return (
        <ThemeIconButton
            onPress={toggleLike}
            style={style}
            iconType={AntDesign}
            iconName={isLiked ? "heart" : "hearto"}
            iconSize={moderateScale(21, 0.2)}

            // iconColor={}
            iconColor={isLiked ? Color.red : Color.white} // or Color.themeDarkGray based on the intended theme, let's use red when liked.
        />
    );
};

export default LikeButton;
