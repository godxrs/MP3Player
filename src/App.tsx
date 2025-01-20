import React, { useState, useEffect } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Playlist from './components/Playlist';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
}

const App: React.FC = () => {
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);

  useEffect(() => {
    // Load tracks and current track from local storage on component mount
    const storedTracks = localStorage.getItem('tracks');
    const storedCurrentTrackId = localStorage.getItem('currentTrackId');
    
    if (storedTracks) {
      const parsedTracks: AudioTrack[] = JSON.parse(storedTracks);
      setTracks(parsedTracks);
      
      if (storedCurrentTrackId) {
        const savedTrack = parsedTracks.find(track => track.id === storedCurrentTrackId);
        if (savedTrack) {
          setCurrentTrack(savedTrack);
        }
      } else if (parsedTracks.length > 0) {
        setCurrentTrack(parsedTracks[0]);
      }
    }
  }, []);

  useEffect(() => {
    // Save tracks to local storage whenever it changes
    localStorage.setItem('tracks', JSON.stringify(tracks));
  }, [tracks]);

  useEffect(() => {
    // Save current track ID to local storage whenever it changes
    if (currentTrack) {
      localStorage.setItem('currentTrackId', currentTrack.id);
    }
  }, [currentTrack]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newTracks: AudioTrack[] = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setTracks(prev => [...prev, ...newTracks]);
      if (!currentTrack) setCurrentTrack(newTracks[0]);
    }
  };

  const handlePrev = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
      setCurrentTrack(tracks[prevIndex]);
    }
  };

  const handleNext = () => {
    if (currentTrack) {
      const currentIndex = tracks.findIndex(track => track.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % tracks.length;
      setCurrentTrack(tracks[nextIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-xs md:max-w-md lg:max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">MP3 Player</h1>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileUpload}
          className="mb-4 p-2 w-full bg-gray-700 rounded"
        />
        {currentTrack && (
          <AudioPlayer 
            track={currentTrack} 
            onPrev={handlePrev} 
            onNext={handleNext} 
          />
        )}
        <Playlist 
          tracks={tracks} 
          currentTrack={currentTrack} 
          onTrackSelect={setCurrentTrack}
        />
      </div>
    </div>
  );
};

export default App;