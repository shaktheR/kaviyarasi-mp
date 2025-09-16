import React, { useState } from 'react';
import TrackCard from '../TrackCard';
import { YOUTUBE_API_KEY } from '../../data/constants';

export default function SearchPage({ onPlay, currentTrack }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('Search for your favorite music!');

  const performSearch = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setResults([]);
      setMessage('Please enter at least 3 characters to search.');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${YOUTUBE_API_KEY}&type=video&maxResults=18`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Failed to fetch from YouTube API.');
      }
      const data = await response.json();
      
      const searchResults = data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        artist: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));

      setResults(searchResults);
      if (searchResults.length === 0) {
        setMessage('No results found. Try a different search.');
      }
    } catch (error) {
      console.error("YouTube API Error:", error);
      setMessage(`Error: ${error.message}. Your API key might be invalid or have restrictions.`);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(query);
  }

  return (
    <div className="p-6 overflow-y-auto">
      <form onSubmit={handleSearchSubmit} className="bg-spotify-card p-3 rounded flex items-center gap-3 mb-6 max-w-sm">
        <i className="fas fa-search text-spotify-text-secondary"></i>
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="bg-transparent border-none text-white w-full focus:outline-none"
          value={query}
          onChange={handleInputChange}
        />
      </form>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {isLoading && <div className="col-span-full text-center py-10">Searching...</div>}
        {!isLoading && results.length > 0 && (
          results.map(track => <TrackCard key={track.id} track={track} onPlay={onPlay} isPlayingNow={currentTrack?.id === track.id} />)
        )}
        {!isLoading && message && <div className="col-span-full text-center py-10">{message}</div>}
      </div>
    </div>
  );
}