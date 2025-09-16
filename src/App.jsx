import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import HomePage from './components/pages/HomePage';
import SearchPage from './components/pages/SearchPage';
import LibraryPage from './components/pages/LibraryPage';
import PlaylistPage from './components/pages/PlaylistPage';
import LikedPage from './components/pages/LikedPage';
import { mockPlaylists } from './data/mockData';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [player, setPlayer] = useState(null);
  const playerRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [playlist, setPlaylist] = useState([]);
  const [originalPlaylist, setOriginalPlaylist] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one

  const [likedSongs, setLikedSongs] = useState(() => {
    const saved = localStorage.getItem('likedSongs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
  }, [likedSongs]);

  // YouTube IFrame API setup
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      onYouTubeIframeAPIReady();
    }

    function onYouTubeIframeAPIReady() {
      if (!playerRef.current) {
        const ytPlayer = new window.YT.Player('youtube-player-element', {
          height: '0',
          width: '0',
          playerVars: { 'playsinline': 1, 'controls': 0, 'disablekb': 1, 'modestbranding': 1 },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
          }
        });
        playerRef.current = ytPlayer;
      }
    }

    function onPlayerReady(event) {
      setPlayer(event.target);
      event.target.setVolume(volume);
    }

    function onPlayerStateChange(event) {
      if (event.data === window.YT.PlayerState.PLAYING) {
        setIsPlaying(true);
        setDuration(event.target.getDuration());
      } else {
        setIsPlaying(false);
      }
      if (event.data === window.YT.PlayerState.ENDED) {
        handleNext();
      }
    }
    
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function' && isPlaying) {
        setProgress(playerRef.current.getCurrentTime());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };

  }, [isPlaying]);
  
  const handlePlay = (track, playlistId = null) => {
    let newPlaylist = [];
    let trackIndex = 0;

    if(playlistId) {
      const foundPlaylist = mockPlaylists.find(p => p.id === playlistId);
      if(foundPlaylist) newPlaylist = foundPlaylist.tracks;
    } else {
      newPlaylist = [track];
    }
    
    trackIndex = newPlaylist.findIndex(t => t.id === track.id);
    
    setPlaylist(newPlaylist);
    setOriginalPlaylist(newPlaylist);
    setCurrentTrackIndex(trackIndex);
    setCurrentTrack(track);

    if (player) {
      player.loadVideoById(track.id);
      player.playVideo();
    }
  };

  const handlePlayPause = () => {
    if (!player || !currentTrack) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };
  
  const handleNext = () => {
    if (playlist.length === 0) return;

    if (repeatMode === 2) {
      player.seekTo(0);
      player.playVideo();
      return;
    }

    let nextIndex = currentTrackIndex + 1;
    if (nextIndex >= playlist.length) {
      if (repeatMode === 1) {
        nextIndex = 0;
      } else {
        setIsPlaying(false);
        return;
      }
    }
    
    const nextTrack = playlist[nextIndex];
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(nextTrack);
    player.loadVideoById(nextTrack.id);
    player.playVideo();
  };

  const handlePrev = () => {
    if (playlist.length === 0) return;
    
    if (progress > 3) {
      player.seekTo(0);
      return;
    }

    let prevIndex = currentTrackIndex - 1;
    if (prevIndex < 0) {
      if (repeatMode === 1) {
        prevIndex = playlist.length - 1;
      } else {
        player.seekTo(0);
        return;
      }
    }

    const prevTrack = playlist[prevIndex];
    setCurrentTrackIndex(prevIndex);
    setCurrentTrack(prevTrack);
    player.loadVideoById(prevTrack.id);
    player.playVideo();
  };

  const handleSeek = (percent) => {
    if (player && duration > 0) {
      const newTime = duration * percent;
      player.seekTo(newTime, true);
      setProgress(newTime);
    }
  };

  const handleVolumeChange = (percent) => {
    if(player) {
      const newVolume = Math.round(percent * 100);
      setVolume(newVolume);
      player.setVolume(newVolume);
    }
  };

  const isLiked = (trackId) => likedSongs.some(t => t.id === trackId);

  const handleToggleLike = (track) => {
    if (isLiked(track.id)) {
      setLikedSongs(likedSongs.filter(t => t.id !== track.id));
    } else {
      setLikedSongs([track, ...likedSongs]);
    }
  };

  const handleToggleShuffle = () => {
    const newShuffleState = !isShuffled;
    setIsShuffled(newShuffleState);

    if(newShuffleState && currentTrack) {
      const current = playlist[currentTrackIndex];
      const rest = playlist.filter((_, i) => i !== currentTrackIndex);
      const shuffled = rest.sort(() => Math.random() - 0.5);
      const newPlaylist = [current, ...shuffled];
      setPlaylist(newPlaylist);
      setCurrentTrackIndex(0);
    } else if (currentTrack) {
      setPlaylist(originalPlaylist);
      const originalIndex = originalPlaylist.findIndex(t => t.id === currentTrack.id);
      setCurrentTrackIndex(originalIndex);
    }
  };

  const handleToggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setActivePlaylist(null);
  };

  const handlePlaylistClick = (playlistId) => {
    const playlist = mockPlaylists.find(p => p.id === playlistId);
    setActivePlaylist(playlist);
    setActivePage('playlist');
  };
  
  const renderPage = () => {
    switch (activePage) {
      case 'search':
        return <SearchPage onPlay={handlePlay} currentTrack={currentTrack} />;
      case 'library':
        return <LibraryPage onPlaylistClick={handlePlaylistClick} />;
      case 'playlist':
        return <PlaylistPage playlist={activePlaylist} onPlay={handlePlay} currentTrack={currentTrack} />;
      case 'liked':
        return <LikedPage likedSongs={likedSongs} onPlay={handlePlay} currentTrack={currentTrack} />;
      case 'home':
      default:
        return <HomePage onPlay={handlePlay} currentTrack={currentTrack} />;
    }
  };

  return (
    <div className="bg-spotify-bg text-spotify-text-primary grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] h-screen overflow-hidden font-sans">
      <div id="youtube-player-container" className="hidden">
        <div id="youtube-player-element"></div>
      </div>
      
      <Sidebar onNavClick={handleNavClick} activePage={activePage} onPlaylistClick={handlePlaylistClick} />
      
      <main className="overflow-y-auto">
        {renderPage()}
      </main>
      
      <Player 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrev={handlePrev}
        progress={progress}
        duration={duration}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        isLiked={isLiked}
        onToggleLike={handleToggleLike}
        isShuffled={isShuffled}
        onToggleShuffle={handleToggleShuffle}
        repeatMode={repeatMode}
        onToggleRepeat={handleToggleRepeat}
      />
    </div>
  );
}