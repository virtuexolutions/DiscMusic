import TrackPlayer, { Event } from 'react-native-track-player';


export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemoteNext, () => {
    TrackPlayer.skipToNext();
  });
  TrackPlayer.addEventListener(Event.RemotePrevious, () => {
    TrackPlayer.skipToPrevious();
  });
  TrackPlayer.addEventListener('remote-seek', async ({ position }) => {
    await TrackPlayer.seekTo(position);
  });
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.destroy());
}