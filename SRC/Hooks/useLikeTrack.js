import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { apiHeader } from '../Utillity/utils';
import { toggleLikedSong, setLikedSongs } from '../Store/slices/common';

export const useLikeTrack = (track) => {
    const dispatch = useDispatch();
    // console.log('track==================== >>>>>>>>>>>>>>>>>>>>>>>>', track)
    const token = useSelector((state) => state.authReducer.token);
    const likedSongs = useSelector((state) => state.commonReducer.likedSongs);
    const [loading, setLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(track?.is_liked);

    // console.log('isLiked==================== >>>>>>>>>>>>>>>>>>>>>>>>', isLiked)

    const trackIdNumeric = track?.id ? Number(track.id) : null;

    // Synchronize initial prop track.is_liked with Redux if not already tracked
    useEffect(() => {
        if (trackIdNumeric && track?.is_liked && !likedSongs?.includes(trackIdNumeric)) {
            // Might be better handled through API list fetch, but optimizing here
            // to just ensure the UI reflects correctly if it comes pre-liked
            // dispatch(toggleLikedSong(trackIdNumeric));
        }
    }, [trackIdNumeric]);

    // const isLiked = trackIdNumeric ? (likedSongs || []).some(id => Number(id) === trackIdNumeric) : false;

    const toggleLike = async () => {

        // if (!trackIdNumeric) {
        //     console.error('Track ID is missing');
        //     return { success: false };
        // }



        const body = { track_id: trackIdNumeric?.toString() };
        const url = isLiked ? 'auth/liked-songs/remove' : 'auth/liked-songs/store';
        const response = await Post(url, body, apiHeader(token));
        // return { success: true, isLiked: !isLiked };

        // return console.log('response==================== >>>>>>>>>>>>>>>>>>>>>>>>', response?.data)
        if (response != undefined) {
            setIsLiked(prev => !prev)
            // dispatch(toggleLikedSong(trackIdNumeric));
            // return console.log('body==================== >>>>>>>>>>>>>>>>>>>>>>>>')
        }
        // Revert optimistic update
        return { success: false };

    }

    return { isLiked, toggleLike, loading };
};
