import React from 'react';

export default function TrackCard({ track, onPlay, isPlayingNow }) {
  return (
    <div 
      className={`bg-spotify-card p-4 rounded-md transition-colors cursor-pointer hover:bg-spotify-hover card ${isPlayingNow ? 'now-playing' : ''}`}
      onClick={() => onPlay(track)}
    >
      <div className="relative mb-4">
        <img src={track.thumbnail || `https://i.ytimg.com/vi/${track.id}/mqdefault.jpg`} alt={track.title} className="rounded w-full aspect-square object-cover" />
        <div 
          className="play-button absolute bottom-2 right-2 bg-spotify-accent w-10 h-10 rounded-full flex items-center justify-center opacity-0 shadow-md"
          onClick={(e) => { e.stopPropagation(); onPlay(track); }}
        >
          <i className={`fas ${isPlayingNow ? 'fa-pause' : 'fa-play'} text-black`}></i>
        </div>
      </div>
      <h3 className="font-semibold mb-2 truncate">{track.title}</h3>
      <p className="text-spotify-text-secondary text-sm line-clamp-2">{track.artist}</p>
    </div>
  );
}