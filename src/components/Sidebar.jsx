import React from 'react';
import { mockPlaylists } from '../data/mockData';

export default function Sidebar({ onNavClick, activePage, onPlaylistClick }) {
  return (
    <aside className="bg-spotify-sidebar w-60 p-6 flex flex-col gap-6 overflow-y-auto">
      <div className="text-2xl font-bold mb-5">
        <i className="fab fa-youtube text-red-500 mr-2.5"></i>
        <span>YouTube Music</span>
      </div>

      <nav className="flex flex-col gap-4">
        <a href="#" onClick={() => onNavClick('home')} className={`nav-item flex items-center gap-4 text-spotify-text-secondary hover:text-spotify-text-primary font-semibold transition-colors ${activePage === 'home' ? 'active-nav' : ''}`}>
          <i className="fas fa-home text-xl w-6"></i>
          <span>Home</span>
        </a>
        <a href="#" onClick={() => onNavClick('search')} className={`nav-item flex items-center gap-4 text-spotify-text-secondary hover:text-spotify-text-primary font-semibold transition-colors ${activePage === 'search' ? 'active-nav' : ''}`}>
          <i className="fas fa-search text-xl w-6"></i>
          <span>Search</span>
        </a>
        <a href="#" onClick={() => onNavClick('library')} className={`nav-item flex items-center gap-4 text-spotify-text-secondary hover:text-spotify-text-primary font-semibold transition-colors ${activePage === 'library' ? 'active-nav' : ''}`}>
          <i className="fas fa-book text-xl w-6"></i>
          <span>Your Library</span>
        </a>
      </nav>

      <div className="flex flex-col gap-4 mt-4">
        <a href="#" className="flex items-center gap-4 text-spotify-text-secondary hover:text-spotify-text-primary font-semibold transition-colors">
          <i className="fas fa-plus-square text-xl w-6"></i>
          <span>Create Playlist</span>
        </a>
        <a href="#" onClick={() => onNavClick('liked')} className="flex items-center gap-4 text-spotify-text-secondary hover:text-spotify-text-primary font-semibold transition-colors">
          <i className="fas fa-heart text-xl w-6"></i>
          <span>Liked Songs</span>
        </a>
      </div>

      <div className="mt-6 flex-grow overflow-y-auto">
        {mockPlaylists.map(playlist => (
          <div key={playlist.id} onClick={() => onPlaylistClick(playlist.id)} className="text-spotify-text-secondary mb-4 cursor-pointer hover:text-spotify-text-primary transition-colors">
            {playlist.name}
          </div>
        ))}
      </div>
    </aside>
  );
}