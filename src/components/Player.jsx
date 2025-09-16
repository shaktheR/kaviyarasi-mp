import React, { useRef } from 'react';
import { formatTime } from '../utils/helpers';

export default function Player({ 
  currentTrack, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrev, 
  progress, 
  duration, 
  onSeek,
  volume,
  onVolumeChange,
  isLiked,
  onToggleLike,
  isShuffled,
  onToggleShuffle,
  repeatMode,
  onToggleRepeat
}) {
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const handleSeek = (e) => {
    const progressContainer = progressRef.current;
    if (progressContainer) {
      const rect = progressContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      onSeek(percent);
    }
  };

  const handleVolume = (e) => {
    const volumeContainer = volumeRef.current;
    if(volumeContainer) {
      const rect = volumeContainer.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      onVolumeChange(percent);
    }
  }

  if (!currentTrack) {
    return (
      <footer className="bg-spotify-player h-20 grid grid-cols-3 px-4 items-center col-span-2">
        <div className="flex items-center gap-4"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <i className="fas fa-random text-spotify-text-secondary"></i>
            <i className="fas fa-step-backward text-spotify-text-secondary"></i>
            <div className="bg-spotify-text-secondary text-black w-8 h-8 rounded-full flex items-center justify-center">
              <i className="fas fa-play"></i>
            </div>
            <i className="fas fa-step-forward text-spotify-text-secondary"></i>
            <i className="fas fa-redo text-spotify-text-secondary"></i>
          </div>
        </div>
        <div className="flex items-center gap-2 justify-end"></div>
      </footer>
    );
  }

  return (
    <footer className="bg-spotify-player h-20 grid grid-cols-3 px-4 items-center col-span-2">
      <div className="flex items-center gap-4">
        <img src={currentTrack.thumbnail || `https://i.ytimg.com/vi/${currentTrack.id}/default.jpg`} alt={currentTrack.title} className="w-14 h-14 rounded"/>
        <div>
          <div className="font-semibold text-sm truncate w-48">{currentTrack.title}</div>
          <div className="text-spotify-text-secondary text-xs truncate w-48">{currentTrack.artist}</div>
        </div>
        <i 
          className={`fas fa-heart cursor-pointer transition-colors ${isLiked(currentTrack.id) ? 'text-spotify-accent' : 'text-spotify-text-secondary hover:text-white'}`}
          onClick={() => onToggleLike(currentTrack)}
        ></i>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-6">
          <i 
            className={`fas fa-random cursor-pointer transition-colors ${isShuffled ? 'text-spotify-accent' : 'text-spotify-text-secondary hover:text-white'}`}
            onClick={onToggleShuffle}
          ></i>
          <i className="fas fa-step-backward text-spotify-text-secondary hover:text-white cursor-pointer" onClick={onPrev}></i>
          <div className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" onClick={onPlayPause}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </div>
          <i className="fas fa-step-forward text-spotify-text-secondary hover:text-white cursor-pointer" onClick={onNext}></i>
          <i 
            className={`fas fa-redo cursor-pointer transition-colors relative ${repeatMode !== 0 ? 'text-spotify-accent' : 'text-spotify-text-secondary hover:text-white'}`}
            onClick={onToggleRepeat}
          >
            {repeatMode === 2 && <span className="absolute text-xs -bottom-1 -right-1 bg-spotify-accent text-black rounded-full w-3 h-3 flex items-center justify-center font-bold">1</span>}
          </i>
        </div>
        <div className="w-full flex items-center gap-2">
          <div className="text-spotify-text-secondary text-xs w-10 text-right">{formatTime(progress)}</div>
          <div ref={progressRef} onClick={handleSeek} className="progress-container h-1 bg-gray-700 rounded flex-grow cursor-pointer">
            <div className="progress h-full bg-white rounded" style={{ width: `${(progress / duration) * 100}%` }}></div>
          </div>
          <div className="text-spotify-text-secondary text-xs w-10">{formatTime(duration)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-end">
        <i className="fas fa-volume-up text-spotify-text-secondary"></i>
        <div ref={volumeRef} onClick={handleVolume} className="volume-container w-24 h-1 bg-gray-700 rounded cursor-pointer">
          <div className="volume-level h-full bg-white rounded" style={{ width: `${volume}%` }}></div>
        </div>
      </div>
    </footer>
  );
}