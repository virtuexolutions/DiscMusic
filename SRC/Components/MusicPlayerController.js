import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
  RepeatMode,
  State
} from 'react-native-track-player';
import { baseUrl, getArtistName } from '../Config';
import { setAtiveSong } from '../Store/slices/common';
import { useDispatch } from 'react-redux';

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
  // console.log('track====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', track)
  if (!track) return null;
  // If it's already formatted, just return it
  if (track.url?.startsWith('http')) return track;
  // console.log('url====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', `${baseUrl}/storage/${JSON.stringify(track?.is_liked, null, 2)}`)
  return {
    id: track.id.toString(),
    // Important: Include /storage/ for the audio file path
    url: `${baseUrl}/storage/${track.audio_file_path || track.audio_file}`,
    title: track.title || 'Unknown Title',
    artist: getArtistNameFromTrack(track),
    is_liked: track?.is_liked,
    artwork: `${baseUrl}/storage/${track.cover_image_path || track.cover_image}`,
  };
};

/**
 * 1. Initialize the Player
 * Configures background capabilities and notification controls.
 */
export const setupPlayer = async () => {
  try {
    // 1. Try to setup the player with increased buffers for Android Emulators
    await TrackPlayer.setupPlayer({
      minBuffer: 15,
      maxBuffer: 50,
      playBuffer: 5,
      backBuffer: 3,
      waitForBuffer: true,
    });

    // 2. Configure options IMMEDIATELY after setup
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext],
    });

    console.log("Track Player Setup Successful");
    return true;
  } catch (error) {
    // If it's already initialized, this catch block handles it
    if (error.message.includes('The player has already been initialized')) {
      return true;
    }
    console.error("Setup Error:", error);
    return false;
  }
};

/**
 * 2. Play a Single Track
 * Resets the queue and plays one specific item.
 */


export const playSingleTrack = async (track) => {
  console.log('🚀 Playing Single Track (Input)======================= >>>>>>>>>>>>>>>:', track);
  try {
    // Map dynamic data to TrackPlayer format
    const formattedTrack = formatTrack(track);
    if (!formattedTrack) return;

    console.log('📦 Formatted Track for Player:', formattedTrack);

    const playbackState = await TrackPlayer.getPlaybackState();
    const currentTrack = await TrackPlayer.getActiveTrack();

    // Check if the track is already the active one
    if (currentTrack && currentTrack.id === formattedTrack.id) {
      if (playbackState.state !== State.Playing) {
        await TrackPlayer.play();
        console.log('▶️ Resuming Current Track');
      }
      return;
    }

    // Check if the track is in the queue
    const queue = await TrackPlayer.getQueue();
    const trackIndexInQueue = queue.findIndex(t => t.id === formattedTrack.id);

    if (trackIndexInQueue !== -1) {
      console.log('⏭️ Skipping to track already in queue:', formattedTrack.title);
      await TrackPlayer.skip(trackIndexInQueue);
      await TrackPlayer.play();
    } else {
      console.log('➕ Adding New Track to Queue:', formattedTrack.title);
      await TrackPlayer.add([formattedTrack]);
      const newQueue = await TrackPlayer.getQueue();
      await TrackPlayer.skip(newQueue.length - 1);
      await TrackPlayer.play();
    }

  } catch (error) {
    console.error('Error in playSingleTrack logic:', error);
  }
};

/**
 * 3. Play a Playlist
 * Adds multiple tracks and starts from the first one.
 */
export const playPlaylist = async (tracks) => {
  const dispatch = useDispatch();
  console.log('🎵 Playing Playlist (Count):', tracks?.length);
  try {
    if (!tracks) return;
    const trackArray = Array.isArray(tracks) ? tracks : [tracks];

    // Format all tracks before adding to queue
    const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);
    console.log('formattedTracks====================== >>>>>>>>>>>>>> hereeeeeeeeeeeee', formattedTracks)
    await TrackPlayer.reset();
    await TrackPlayer.add(formattedTracks);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    await TrackPlayer.play();
    console.log('✅ Playlist Added and Playing');
    dispatch(setAtiveSong(formattedTracks[0]));
    // dispatch(setNowPlayingList(formattedTracks));
  } catch (error) {
    console.error('Error playing playlist:', error);
  }
};

/**
 * 4. Play from a specific track in a list
 * Adds the entire list to the queue but starts playback at the specified track.
 */
export const playPlaylistFromTrack = async (tracks, startTrack) => {
  try {
    if (!tracks || !startTrack) return;
    const trackArray = Array.isArray(tracks) ? tracks : [tracks];

    // Format all tracks
    const formattedTracks = trackArray.map(t => formatTrack(t)).filter(t => t !== null);
    console.log('formattedTracks====================== >>>>>>>>>>>>>> hereeeeeeeeeeeeesssssssssssssss', formattedTracks)

    // Find the index of the start track
    const startIndex = formattedTracks.findIndex(t => t.id === startTrack.id.toString());

    await TrackPlayer.reset();
    await TrackPlayer.add(formattedTracks);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);

    if (startIndex !== -1) {
      await TrackPlayer.skip(startIndex);
    }
    await TrackPlayer.play();
    console.log(`✅ Playlist Added, Skipping to #${startIndex + 1}: ${startTrack.title}`);
  } catch (error) {
    console.error('Error in playPlaylistFromTrack:', error);
  }
};
export const playNext = async () => {
  try {
    const queue = await TrackPlayer.getQueue();
    const currentIndex = await TrackPlayer.getActiveTrackIndex();

    // Check if we are at the last track
    // Loop back to the start if we are at the last track
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

/**
 * 2. Skip to Previous Track
 * If the song is more than 3 seconds in,  usually 
 * restarts the current song instead of skipping back.
 */
export const playPrevious = async () => {
  try {
    const position = await TrackPlayer.getPosition();

    // If played for more than 3 seconds, just restart the track
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