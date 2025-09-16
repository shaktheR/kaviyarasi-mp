import React from 'react';
import TrackCard from '../TrackCard';
import { recentlyPlayedTracks, recommendedTracks } from '../../data/mockData';

export default function HomePage({ onPlay, currentTrack }) {
  return (
    <div className="p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Good afternoon</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-4">Recently played</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {recentlyPlayedTracks.map(track => <TrackCard key={track.id} track={track} onPlay={onPlay} isPlayingNow={currentTrack?.id === track.id} />)}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-xl mb-4">Made for you</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {recommendedTracks.map(track => <TrackCard key={track.id} track={track} onPlay={onPlay} isPlayingNow={currentTrack?.id === track.id} />)}
        </div>
      </div>
    </div>
  );
}