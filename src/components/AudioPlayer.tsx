import React, { useState, useRef, useEffect } from 'react';

interface AudioTrack {
    id: string;
    name: string;
    url: string;
}

interface Props {
    track: AudioTrack;
}

const AudioPlayer: React.FC<Props> = ({ track }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <audio ref={audioRef} src={track.url} />
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg truncate">{track.name}</h2>
            <button
              onClick={togglePlay}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
          <div className="w-full bg-gray-600 rounded h-2">
            <div
                className="bg-blue-500 h-2 rounded"
                style={{
                    width: `${(audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1) * 100}%`
                }}
                />
            </div>
        </div>
      );

};

export default AudioPlayer;