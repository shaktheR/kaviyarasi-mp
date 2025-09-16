import React from 'react';
import TrackCard from '../TrackCard';

export default function PlaylistPage({ playlist, onPlay, currentTrack }) {
  if (!playlist) return <div className="p-6">Playlist not found.</div>;
  return (
    <div className="p-6 overflow-y-auto">
      <div className="flex gap-6 items-end mb-6">
        <img src={`https://i.ytimg.com/vi/${playlist.tracks[0].id}/mqdefault.jpg`} alt={playlist.name} className="w-48 h-48 object-cover rounded shadow-lg"/>
        <div>
          <h2 className="text-xs font-bold uppercase">Playlist</h2>
          <h1 className="text-5xl font-bold mb-2">{playlist.name}</h1>
          <p className="text-spotify-text-secondary">{playlist.tracks.length} songs</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {playlist.tracks.map(track => <TrackCard key={track.id} track={track} onPlay={(track) => onPlay(track, playlist.id)} isPlayingNow={currentTrack?.id === track.id}/>)}
      </div>
    </div>
  );
}