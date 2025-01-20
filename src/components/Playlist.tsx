import React from 'react';

interface AudioTrack {
    id: string;
    name: string;
    url: string;
  }
  
  interface Props {
    tracks: AudioTrack[];
    currentTrack: AudioTrack | null;
    onTrackSelect: (track: AudioTrack) => void;
  }
  
  const Playlist: React.FC<Props> = ({ tracks, currentTrack, onTrackSelect }) => {
    return (
      <div className="bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl mb-4">Playlist</h2>
        <div className="space-y-2">
          {tracks.map(track => (
            <div
              key={track.id}
              className={`p-2 rounded cursor-pointer ${
                currentTrack?.id === track.id
                  ? 'bg-blue-500'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
              onClick={() => onTrackSelect(track)}
            >
              {track.name}
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Playlist;