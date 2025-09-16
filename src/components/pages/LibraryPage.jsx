import React from 'react';
import { mockPlaylists } from '../../data/mockData';

export default function LibraryPage({ onPlaylistClick }) {
  return (
    <div className="p-6 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {mockPlaylists.map(playlist => (
          <div key={playlist.id} onClick={() => onPlaylistClick(playlist.id)} className="bg-spotify-card p-4 rounded-md transition-colors cursor-pointer hover:bg-spotify-hover card">
            <img src={`https://i.ytimg.com/vi/${playlist.tracks[0].id}/mqdefault.jpg`} alt={playlist.name} className="rounded w-full aspect-square object-cover mb-4"/>
            <h3 className="font-semibold truncate">{playlist.name}</h3>
            <p className="text-sm text-spotify-text-secondary">{playlist.tracks.length} songs</p>
          </div>
        ))}
      </div>
    </div>
  );
}