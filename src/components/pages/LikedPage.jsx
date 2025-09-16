import React from 'react';
import TrackCard from '../TrackCard';

export default function LikedPage({ likedSongs, onPlay, currentTrack }) {
  return (
    <div className="p-6 overflow-y-auto">
      <div className="flex gap-6 items-end mb-6">
        <div className="bg-gradient-to-br from-purple-900 to-blue-500 w-48 h-48 flex items-center justify-center rounded shadow-lg">
          <i className="fas fa-heart text-white text-6xl"></i>
        </div>
        <div>
          <h2 className="text-xs font-bold uppercase">Playlist</h2>
          <h1 className="text-5xl font-bold mb-2">Liked Songs</h1>
          <p className="text-spotify-text-secondary">{likedSongs.length} liked songs</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {likedSongs.length > 0 ? (
          likedSongs.map(track => <TrackCard key={track.id} track={track} onPlay={onPlay} isPlayingNow={currentTrack?.id === track.id} />)
        ) : (
          <p className="col-span-full">You haven't liked any songs yet.</p>
        )}
      </div>
    </div>
  );
}