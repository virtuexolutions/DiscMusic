// // import TrackPlayer, {
// Capability,
//   AppKilledPlaybackBehavior,
//   RepeatMode,
//   State
// } from 'react-native-track-player';
// import { baseUrl, getArtistName } from '../Config';
// import { setAtiveSong } from '../Store/slices/common';
// import { useDispatch } from 'react-redux';
// import RNFS from 'react-native-fs';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { store } from '../Store';

// export const getArtistNameFromTrack = (track) => {
//   if (!track) return 'Unknown Artist';
//   if (typeof track.artist === 'string') return track.artist;
//   if (typeof track.artist === 'object' && track.artist !== null) {
//     if (typeof track.artist.user === 'object' && track.artist.user !== null) {
//       return track.artist.user.name || track.artist.user.first_name || 'Unknown Artist';
//     }
//     return track.artist.name || 'Unknown Artist';
//   }
//   if (typeof track.user === 'object' && track.user !== null) {
//     return track.user.name || track.user.first_name || 'Unknown Artist';
//   }
//   return track.description || 'Unknown Artist';
// };

// /**
//  * Helper to format dynamic track data for TrackPlayer
//  */
// export const formatTrack = (track) => {
//   if (!track) return null;

//   let trackUrl = track.url || track.audio_file_path || track.audio_file;
//   let trackArtwork = track.artwork || track.cover_image_path || track.cover_image;

//   if (trackUrl && !trackUrl.startsWith('http') && !trackUrl.startsWith('file://')) {
//     trackUrl = `${baseUrl}/storage/${trackUrl}`;
//   }

//   if (trackArtwork && !trackArtwork.startsWith('http') && !trackArtwork.startsWith('file://')) {
//     trackArtwork = `${baseUrl}/storage/${trackArtwork}`;
//   }

//   return {
//     ...track,
//     id: track.id ? track.id.toString() : Date.now().toString(),
//     url: trackUrl,
//     title: track.title || 'Unknown Title',
//     artist: getArtistNameFromTrack(track),
//     is_liked: track?.is_liked,
//     artwork: trackArtwork,
//   };
// };

// /**
//  * 1. Initialize the Player
//  * Configures background capabilities and notification controls.
//  */
// export const setupPlayer = async () => {
//   try {
//     // 1. Try to setup the player with increased buffers for Android Emulators
//     await TrackPlayer.setupPlayer({
//       minBuffer: 15,
//       maxBuffer: 50,
//       playBuffer: 5,
//       backBuffer: 3,
//       waitForBuffer: true,
//     });

//     // 2. Configure options IMMEDIATELY after setup
//     await TrackPlayer.updateOptions({
//       android: {
//         appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
//       },
//       capabilities: [
//         Capability.Play,
//         Capability.Pause,
//         Capability.SkipToNext,
//         Capability.SeekTo,
//       ],
//       compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
//     });

//     console.log("Track Player Setup Successful");
//     return true;
//   } catch (error) {
//     // If it's already initialized, this catch block handles it
//     if (error.message.includes('The player has already been initialized')) {
//       return true;
//     }
//     console.error("Setup Error:", error);
//     return false;
//   }
// };

// /**
//  * 2. Play a Single Track
//  * Resets the queue and plays one specific item.
//  */


// export const playSingleTrack = async (track) => {
//   console.log('🚀 Playing Single Track (Input)======================= >>>>>>>>>>>>>>>:', track);
//   try {
//     // Map dynamic data to TrackPlayer format
//     const formattedTrack = formatTrack(track);
//     if (!formattedTrack) return;

//     console.log('📦 Formatted Track for Player:', formattedTrack);

//     const playbackState = await TrackPlayer.getPlaybackState();
//     const currentTrack = await TrackPlayer.getActiveTrack();

//     // Check if the track is already the active one
//     if (currentTrack && currentTrack.id === formattedTrack.id) {
//       if (playbackState.state !== State.Playing) {
//         await TrackPlayer.play();
//         console.log('▶️ Resuming Current Track');
//       }
//       return;
//     }

//     // Check if the track is in the queue
//     const queue = await TrackPlayer.getQueue();
//     const trackIndexInQueue = queue.findIndex(t => t.id === formattedTrack.id);

//     if (trackIndexInQueue !== -1) {
//       console.log('⏭️ Skipping to track already in queue:', formattedTrack.title);
//       await TrackPlayer.skip(trackIndexInQueue);
//       await TrackPlayer.play();
//     } else {
//       console.log('➕ Adding New Track to Queue:', formattedTrack.title);
//       await TrackPlayer.add([formattedTrack]);
//       const newQueue = await TrackPlayer.getQueue();
//       await TrackPlayer.skip(newQueue.length - 1);
//       await TrackPlayer.play();
//     }

//   } catch (error) {
//     console.error('Error in playSingleTrack logic:', error);
//   }
// };

// /**
//  * 3. Play a Playlist
//  * Adds multiple tracks and starts from the first one.
//  */
// export const playPlaylist = async (tracks) => {
//   const dispatch = useDispatch();
//   console.log('🎵 Playing Playlist (Count):', tracks?.length);
//   try {
//     if (!tracks) return;
//     const trackArray = Array.isArray(tracks) ? tracks : [tracks];

//     // Format all tracks before adding to queue
//     const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);
//     console.log('formattedTracks====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', formattedTracks)
//     await TrackPlayer.reset();
//     await TrackPlayer.add(formattedTracks);
//     await TrackPlayer.play();
//     console.log('✅ Playlist Added and Playing');
//     dispatch(setAtiveSong(formattedTracks[0]));
//     // dispatch(setNowPlayingList(formattedTracks));
//   } catch (error) {
//     console.error('Error playing playlist:', error);
//   }
// };

// /**
//  * 4. Play from a specific track in a list
//  * Adds the entire list to the queue but starts playback at the specified track.
//  */
// export const playPlaylistFromTrack = async (tracks, startTrack) => {
//   try {
//     if (!tracks || !startTrack) return;
//     const trackArray = Array.isArray(tracks) ? tracks : [tracks];

//     // Format all tracks
//     const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);
//     console.log('formattedTracks====================== >>>>>>>>>>>>>> hereeeeeeeeeeeeesssssssssssssss', formattedTracks)

//     // Find the index of the start track
//     const startIndex = formattedTracks.findIndex(t => t.id === startTrack.id.toString());

//     await TrackPlayer.reset();
//     await TrackPlayer.add(formattedTracks);

//     if (startIndex !== -1) {
//       await TrackPlayer.skip(startIndex);
//     }
//     await TrackPlayer.play();
//     console.log(`✅ Playlist Added, Skipping to #${startIndex + 1}: ${startTrack.title}`);
//   } catch (error) {
//     console.error('Error in playPlaylistFromTrack:', error);
//   }
// };
// export const playNext = async () => {
//   try {
//     const queue = await TrackPlayer.getQueue();
//     const currentIndex = await TrackPlayer.getActiveTrackIndex();

//     // Check if we are at the last track
//     // Loop back to the start if we are at the last track
//     if (currentIndex === queue.length - 1) {
//       console.log('🏁 End of queue reached, looping to start');
//       await TrackPlayer.skip(0);
//       await TrackPlayer.play();
//       return;
//     }

//     await TrackPlayer.skipToNext();
//     await TrackPlayer.play();
//   } catch (error) {
//     console.error('Error skipping to next:', error);
//   }
// };

// /**
//  * 2. Skip to Previous Track
//  * If the song is more than 3 seconds in,  usually 
//  * restarts the current song instead of skipping back.
//  */
// export const playPrevious = async () => {
//   try {
//     const position = await TrackPlayer.getPosition();

//     // If played for more than 3 seconds, just restart the track
//     if (position > 3) {
//       await TrackPlayer.seekTo(0);
//     } else {
//       await TrackPlayer.skipToPrevious();
//     }

//     await TrackPlayer.play();
//   } catch (error) {
//     console.warn('No previous track available');
//   }
// };



// const TRACK_MAP_KEY = '@offline_tracks_map';

// export const OfflineManager = {
//   // 1. Download and Save
//   downloadTrack: async (track, onProgress) => {
//     const fileName = `${track.id}.mp3`;
//     const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

//     const downloadOptions = {
//       fromUrl: track.url,
//       toFile: localPath,
//       begin: () => console.log('Download Started'),
//       progress: (res) => {
//         const percent = (res.bytesWritten / res.contentLength) * 100;
//         if (onProgress) onProgress(percent);
//         console.log("ressssssssssssssssssssssssssssssssss", res, percent);
//       },
//     };

//     try {
//       await RNFS.downloadFile(downloadOptions).promise;

//       // Save mapping in AsyncStorage
//       const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
//       const map = storedMap ? JSON.parse(storedMap) : {};
//       console.log("🚀 ~OfflineManager ~ downloadTrack ~ map:", map)

//       const trackDataToSave = { ...track, url: `file://${localPath}` };
//       if (trackDataToSave.artwork) {
//         trackDataToSave.cover_image = trackDataToSave.artwork;
//         delete trackDataToSave.artwork;
//       }

//       map[track.id] = trackDataToSave;
//       await AsyncStorage.setItem(TRACK_MAP_KEY, JSON.stringify(map));

//       return `file://${localPath}`;
//     } catch (error) {
//       console.error("Download Failed", error);
//       return null;
//     }
//   },

//   // 2. Check if track is offline
//   getLocalUri: async (trackId) => {
//     const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
//     const map = storedMap ? JSON.parse(storedMap) : {};
//     const trackData = map[trackId];
//     return trackData ? (typeof trackData === 'string' ? trackData : trackData.url) : null;
//   },

//   // 3. Delete Track
//   // Updated deleteTrack for safety
//   deleteTrack: async (trackId) => {
//     const localPath = `${RNFS.DocumentDirectoryPath}/${trackId}.mp3`;
//     try {
//       // File delete karein
//       if (await RNFS.exists(localPath)) {
//         await RNFS.unlink(localPath);
//       }

//       // Map update karein
//       const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
//       if (storedMap) {
//         const map = JSON.parse(storedMap);
//         if (map[trackId]) {
//           delete map[trackId];
//           await AsyncStorage.setItem(TRACK_MAP_KEY, JSON.stringify(map));
//         }
//       }
//     } catch (e) {
//       console.log("Delete error", e);
//     }
//   },
//   deleteAllTracks: async () => {
//     try {
//       const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
//       if (!storedMap) return;

//       const map = JSON.parse(storedMap);
//       const trackIds = Object.keys(map);
//       const deletePromises = trackIds.map(async (id) => {
//         const localPath = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;
//         if (await RNFS.exists(localPath)) {
//           await RNFS.unlink(localPath);
//         }
//       });

//       await Promise.all(deletePromises);
//       await AsyncStorage.removeItem(TRACK_MAP_KEY);

//       console.log("All downloads removed successfully");
//     } catch (e) {
//       console.error("Delete all error", e);
//     }
//   }
// };

// export const loadAutoplayTracks = async () => {
//   try {
//     const token = store.getState().auth.token; // apna token path match karo
//     console.log("🚀 ~aaaaaaaaaaaaaaaaaaaaaaaaa loadAutoplayTracks ~ token:", token)
//     const response = await Get('auth/recommendations/recommended-tracks', token);

//     if (response != undefined) {
//       const tracks = response?.data?.data?.tracks;

//       if (tracks && tracks.length > 0) {
//         const formattedTracks = tracks.map(t => formatTrack(t)).filter(t => t !== null);
//         await TrackPlayer.add(formattedTracks);
//         await TrackPlayer.play();
//         console.log('✅ Autoplay tracks loaded!');
//       }
//     }
//   } catch (error) {
//     console.error('Autoplay error:', error);
//   }
// };

import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  RepeatMode,
  State
} from 'react-native-track-player';
import { baseUrl, getArtistName } from '../Config';
import { setAtiveSong } from '../Store/slices/common';
import { useDispatch } from 'react-redux';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../Store';
import { Post, Get } from '../Axios/AxiosInterceptorFunction'; // Added Get just in case
import { apiHeader } from '../Utillity/utils';

// Global variables to maintain shuffle states across playlist plays
export const SHUFFLE_MODES = {
  OFF: 'OFF',
  SHUFFLE: 'SHUFFLE',
  SMART_SHUFFLE: 'SMART_SHUFFLE'
};

let currentShuffleMode = SHUFFLE_MODES.OFF;
let originalQueueBackup = []; // Holds the unmodified list of formatted tracks

export const getArtistNameFromTrack = (track) => {
  if (!track) return 'Unknown Artist';
  if (typeof track.artist === 'string') return track.artist;
  if (typeof track.artist === 'object' && track.artist !== null) {
    if (typeof track.artist.user === 'object' && track.artist.user !== null) {
      return track.artist.user.name || track.artist.user.first_name || 'Unknown Artist';
    }
    return track.artist.name || 'Unknown Artist';
  }
  if (typeof track.user === 'object' && track.user !== null) {
    return track.user.name || track.user.first_name || 'Unknown Artist';
  }
  return track.description || 'Unknown Artist';
};

/**
 * Helper to format dynamic track data for TrackPlayer
 */
export const formatTrack = (track) => {
  if (!track) return null;

  const token = store.getState().authReducer.token;

  let trackUrl = track.url || track.audio_file_path || track.audio_file;
  let trackArtwork = track.artwork || track.cover_image_path || track.cover_image;

  if (trackUrl && !trackUrl.startsWith('http') && !trackUrl.startsWith('file://')) {
    // Ensure no double slashes except after protocol
    const cleanPath = trackUrl.startsWith('/') ? trackUrl.substring(1) : trackUrl;
    trackUrl = `${baseUrl}/storage/${cleanPath}`;
  }

  if (trackArtwork && !trackArtwork.startsWith('http') && !trackArtwork.startsWith('file://')) {
    const cleanArtworkPath = trackArtwork.startsWith('/') ? trackArtwork.substring(1) : trackArtwork;
    trackArtwork = `${baseUrl}/storage/${cleanArtworkPath}`;
  }

  // Encode spaces and special characters in URL
  if (trackUrl && trackUrl.startsWith('http')) {
    trackUrl = encodeURI(trackUrl).replace(/#/g, '%23'); // encodeURI doesn't encode #
  }

  console.log('🎵 Formatting Track URL:', trackUrl);
  console.log('🎵 Final Track URL:', trackUrl);
  console.log('🎵 Token exists:', !!store.getState().authReducer.token);

  return {
    ...track,
    id: track.id ? track.id.toString() : Date.now().toString(),
    url: trackUrl,
    title: track.title || 'Unknown Title',
    artist: getArtistNameFromTrack(track),
    is_liked: track?.is_liked,
    artwork: trackArtwork,
    isRecommended: track.isRecommended || false,
    // headers: token ? {
    //   Authorization: `Bearer ${token}`,
    // } : {},
  };
};

/**
 * Hit track play API — POST /track/{trackId}/play
 */
export const trackPlayApi = async (trackId) => {
  try {
    const token = store.getState().authReducer.token;
    if (!token || !trackId) return;
    const url = `auth/track/${trackId}/play`;
    const response = await Post(url, {}, apiHeader(token));
    console.log('🎵 Track Play API hit:', trackId, response?.data);
  } catch (error) {
    console.log('Track Play API error:', error?.message);
  }
};

/**
 * Helper to shuffle an array using Fisher-Yates algorithm
 */
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Fetch Smart Shuffle Recommendations using your API structure
 */
const fetchSmartRecommendations = async () => {
  try {
    const token = store.getState().authReducer.token; // Using authReducer from your store state
    if (!token) return [];

    // Calling your recommended tracks endpoint
    const response = await Post('auth/recommendations/recommended-tracks', {}, apiHeader(token), false);

    if (response && response.data?.data?.tracks) {
      return response.data.data.tracks.map(t => ({
        ...formatTrack(t),
        isRecommended: true // Attach marker for UI styling/sparkles
      })).filter(t => t !== null);
    }
    return [];
  } catch (error) {
    console.error('Error fetching smart shuffle tracks:', error);
    return [];
  }
};

/**
 * 1. Initialize the Player
 */
export const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      minBuffer: 15,
      maxBuffer: 50,
      playBuffer: 5,
      backBuffer: 3,
      waitForBuffer: true,
    });

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious, // Added missing capability for playPrevious function
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
    });

    console.log("Track Player Setup Successful");
    return true;
  } catch (error) {
    if (error.message.includes('The player has already been initialized')) {
      return true;
    }
    console.error("Setup Error:", error);
    return false;
  }
};

/**
 * Main Toggle Shuffle Function for UI Button click
 * It manages cycling between OFF -> SHUFFLE -> SMART_SHUFFLE
 */
export const toggleShuffleMode = async () => {
  try {
    const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();
    const activeTrack = currentTrackIndex !== undefined ? await TrackPlayer.getTrack(currentTrackIndex) : null;

    if (currentShuffleMode === SHUFFLE_MODES.OFF) {
      // 1. Switch to REGULAR SHUFFLE
      currentShuffleMode = SHUFFLE_MODES.SHUFFLE;
      console.log('🔀 Mode Changed: REGULAR SHUFFLE');

      let shuffledList = shuffleArray(originalQueueBackup);
      if (activeTrack) {
        // Current running track ko start mai rakhein taake loop break na ho
        shuffledList = [activeTrack, ...shuffledList.filter(t => t.id !== activeTrack.id)];
      }

      await TrackPlayer.setQueue(shuffledList);
      return currentShuffleMode;

    } else if (currentShuffleMode === SHUFFLE_MODES.SHUFFLE) {
      // 2. Switch to SMART SHUFFLE
      currentShuffleMode = SHUFFLE_MODES.SMART_SHUFFLE;
      console.log('✨ Mode Changed: SMART SHUFFLE');

      const recommendations = await fetchSmartRecommendations();
      let smartList = [...originalQueueBackup];

      // Insert recommended songs dynamically after every 2 tracks
      recommendations.forEach((recTrack, index) => {
        const insertIndex = (index + 1) * 2;
        if (insertIndex < smartList.length) {
          smartList.splice(insertIndex, 0, recTrack);
        } else {
          smartList.push(recTrack);
        }
      });

      if (activeTrack) {
        smartList = [activeTrack, ...smartList.filter(t => t.id !== activeTrack.id)];
      }

      await TrackPlayer.setQueue(smartList);
      return currentShuffleMode;

    } else {
      // 3. Switch Shuffle OFF (Back to original list structure)
      currentShuffleMode = SHUFFLE_MODES.OFF;
      console.log('➡️ Mode Changed: SHUFFLE OFF');

      await TrackPlayer.setQueue(originalQueueBackup);

      if (activeTrack) {
        const indexInOriginal = originalQueueBackup.findIndex(t => t.id === activeTrack.id);
        if (indexInOriginal !== -1) {
          await TrackPlayer.skip(indexInOriginal);
        }
      }
      return currentShuffleMode;
    }
  } catch (error) {
    console.error('Error toggling shuffle mode:', error);
    return currentShuffleMode;
  }
};

/**
 * Getter to expose current shuffle state to UI components
 */
export const getCurrentShuffleMode = () => currentShuffleMode;

/**
 * 2. Play a Single Track
 */
export const playSingleTrack = async (track) => {
  console.log('🚀 Playing Single Track:', track);
  try {
    const formattedTrack = formatTrack(track);
    if (!formattedTrack) return;

    // Reset shuffle state when manually starting a single track
    currentShuffleMode = SHUFFLE_MODES.OFF;
    originalQueueBackup = [formattedTrack];

    const playbackState = await TrackPlayer.getPlaybackState();
    const currentTrack = await TrackPlayer.getActiveTrack();

    if (currentTrack && currentTrack.id === formattedTrack.id) {
      if (playbackState.state !== State.Playing) {
        await TrackPlayer.play();
      }
      return;
    }

    const queue = await TrackPlayer.getQueue();
    const trackIndexInQueue = queue.findIndex(t => t.id === formattedTrack.id);

    if (trackIndexInQueue !== -1) {
      await TrackPlayer.skip(trackIndexInQueue);
      await TrackPlayer.play();
      trackPlayApi(formattedTrack.id);
    } else {
      await TrackPlayer.add([formattedTrack]);
      const newQueue = await TrackPlayer.getQueue();
      await TrackPlayer.skip(newQueue.length - 1);
      await TrackPlayer.play();
      trackPlayApi(formattedTrack.id);
    }

  } catch (error) {
    console.error('Error in playSingleTrack logic:', error);
  }
};

/**
 * 3. Play a Playlist
 */
export const playPlaylist = async (tracks) => {
  console.log('🎵 Playing Playlist (Count):', tracks?.length);
  try {
    if (!tracks) return;
    const trackArray = Array.isArray(tracks) ? tracks : [tracks];
    const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);

    // Save backup of original playlist state
    currentShuffleMode = SHUFFLE_MODES.OFF;
    originalQueueBackup = [...formattedTracks];

    await TrackPlayer.reset();
    await TrackPlayer.add(formattedTracks);
    await TrackPlayer.play();

    console.log('✅ Playlist Added and Playing');
    trackPlayApi(formattedTracks[0]?.id);
  } catch (error) {
    console.error('Error playing playlist:', error);
  }
};

/**
 * 4. Play from a specific track in a list
 */
export const playPlaylistFromTrack = async (tracks, startTrack) => {
  try {
    if (!tracks || !startTrack) return;
    const trackArray = Array.isArray(tracks) ? tracks : [tracks];
    const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);

    // Save backup of original list order
    currentShuffleMode = SHUFFLE_MODES.OFF;
    originalQueueBackup = [...formattedTracks];

    const startIndex = formattedTracks.findIndex(t => t.id === startTrack.id.toString());

    await TrackPlayer.reset();
    await TrackPlayer.add(formattedTracks);

    if (startIndex !== -1) {
      await TrackPlayer.skip(startIndex);
    }
    await TrackPlayer.play();
    trackPlayApi(formatTrack(startTrack)?.id);
  } catch (error) {
    console.error('Error in playPlaylistFromTrack:', error);
  }
};

export const playNext = async () => {
  try {
    const queue = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getActiveTrackIndex();

    if (currentIndex === queue.length - 1) {
      console.log('🏁 End of queue reached, looping to start');
      await TrackPlayer.skip(0);
      await TrackPlayer.play();
      return;
    }

    await TrackPlayer.skipToNext();
    await TrackPlayer.play();
  } catch (error) {
    console.error('Error skipping to next:', error);
  }
};

export const playPrevious = async () => {
  try {
    const position = await TrackPlayer.getPosition();

    if (position > 3) {
      await TrackPlayer.seekTo(0);
    } else {
      await TrackPlayer.skipToPrevious();
    }

    await TrackPlayer.play();
  } catch (error) {
    console.warn('No previous track available');
  }
};

// --- Offline Manager Block (Kept untouched as per your structure) ---
const TRACK_MAP_KEY = '@offline_tracks_map';
export const OfflineManager = {
  downloadTrack: async (track, onProgress) => {
    console.log('============================= >>>>>>>>>first', track)
    const fileName = `${track.id}.mp3`;
    const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const downloadOptions = {
      fromUrl: track.url,
      toFile: localPath,
      begin: () => console.log('Download Started'),
      progress: (res) => {
        const percent = (res.bytesWritten / res.contentLength) * 100;
        // console.log("🚀 ~ percent:", percent)
        if (onProgress) onProgress(percent);
      },
    };

    try {
      await RNFS.downloadFile(downloadOptions).promise;
      const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
      const map = storedMap ? JSON.parse(storedMap) : {};
      const trackDataToSave = { ...track, url: `file://${localPath}` };
      if (trackDataToSave.artwork) {
        trackDataToSave.cover_image = trackDataToSave.artwork;
        delete trackDataToSave.artwork;
      }
      map[track.id] = trackDataToSave;
      await AsyncStorage.setItem(TRACK_MAP_KEY, JSON.stringify(map));
      return `file://${localPath}`;
    } catch (error) {
      console.error("Download Failed", error);
      return null;
    }
  },
  getLocalUri: async (trackId) => {
    const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
    const map = storedMap ? JSON.parse(storedMap) : {};
    const trackData = map[trackId];
    return trackData ? (typeof trackData === 'string' ? trackData : trackData.url) : null;
  },
  deleteTrack: async (trackId) => {
    const localPath = `${RNFS.DocumentDirectoryPath}/${trackId}.mp3`;
    try {
      if (await RNFS.exists(localPath)) {
        await RNFS.unlink(localPath);
      }
      const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
      if (storedMap) {
        const map = JSON.parse(storedMap);
        if (map[trackId]) {
          delete map[trackId];
          await AsyncStorage.setItem(TRACK_MAP_KEY, JSON.stringify(map));
        }
      }
    } catch (e) {
      console.log("Delete error", e);
    }
  },
  deleteAllTracks: async () => {
    try {
      const storedMap = await AsyncStorage.getItem(TRACK_MAP_KEY);
      if (!storedMap) return;
      const map = JSON.parse(storedMap);
      const trackIds = Object.keys(map);
      const deletePromises = trackIds.map(async (id) => {
        const localPath = `${RNFS.DocumentDirectoryPath}/${id}.mp3`;
        if (await RNFS.exists(localPath)) {
          await RNFS.unlink(localPath);
        }
      });
      await Promise.all(deletePromises);
      await AsyncStorage.removeItem(TRACK_MAP_KEY);
      console.log("All downloads removed successfully");
    } catch (e) {
      console.error("Delete all error", e);
    }
  }
};

export const loadAutoplayTracks = async () => {
  try {
    const token = store.getState().authReducer.token;
    console.log("🚀 loadAutoplayTracks ~ token:", token);
    const response = await Post('auth/recommendations/recommended-tracks', {}, apiHeader(token), false);

    if (response != undefined) {
      const tracks = response?.data?.data?.tracks;
      if (tracks && tracks.length > 0) {
        const formattedTracks = tracks.map(t => formatTrack(t)).filter(t => t !== null);
        await TrackPlayer.add(formattedTracks);
        await TrackPlayer.play();
        console.log('✅ Autoplay tracks loaded!');
      }
    }
  } catch (error) {
    console.error('Autoplay error:', error);
  }
};