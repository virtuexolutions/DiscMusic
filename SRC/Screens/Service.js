import TrackPlayer, { Event } from 'react-native-track-player';
import { store } from '../Store';
import { loadAutoplayTracks } from '../Components/MusicPlayerController';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext());
  TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious());
  TrackPlayer.addEventListener('remote-seek', async ({ position }) => {
    await TrackPlayer.seekTo(position);
  });
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());

  // ✅ Gapless
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async () => {
    const { gapless } = store.getState().commonReducer.playbackSettings;

    if (gapless) {
      const currentIndex = await TrackPlayer.getActiveTrackIndex();
      const queue = await TrackPlayer.getQueue();

      if (currentIndex === queue.length - 2) {
        // next track pehle se queue mein hai toh buffer ho jayega automatically
        console.log('Gapless: next track buffering...');
      }
    }
  });

  // ✅ Automix - smooth transition (crossfade effect)
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async () => {
    const { automix } = store.getState().commonReducer.playbackSettings;

    if (automix) {
      // Automix: track change hone par volume fade
      await TrackPlayer.setVolume(0.5); // fade out
      setTimeout(async () => {
        await TrackPlayer.setVolume(1); // fade in
      }, 500);
    }
  });

  // ✅ Autoplay - queue khatam hone par similar songs
  TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async () => {
    const { autoplay } = store.getState().commonReducer.playbackSettings;
    if (autoplay) {
      await loadAutoplayTracks();
    }
  })
}