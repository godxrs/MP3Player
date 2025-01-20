import React, { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">MP3 Player</h1>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileUpload}
          className="mb-4 p-2 w-full bg-gray-800 rounded"
        />
        {currentTrack && <AudioPlayer track={currentTrack} />}
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