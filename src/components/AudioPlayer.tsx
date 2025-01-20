import React, { useState, useRef, useEffect } from 'react';

interface AudioTrack {
  id: string;
  name: string;
  url: string;
}

interface Props {
  track: AudioTrack;
  onPrev: () => void;
  onNext: () => void;
}

const AudioPlayer: React.FC<Props> = ({ track, onPrev, onNext }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      const handleLoadedMetadata = () => {
        setDuration(audioRef.current!.duration);
      };
      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current!.currentTime);
      };
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioRef.current?.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current?.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [track]);

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

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4">
      <audio ref={audioRef} src={track.url} />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg truncate">{track.name}</h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          Prev
        </button>
        <button onClick={togglePlay} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={onNext} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          Next
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span>{formatTime(currentTime)}</span>
        <div className="w-full bg-gray-600 rounded h-2 mx-2">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{
              width: `${(currentTime / duration) * 100}%`
            }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full mx-2"
        />
      </div>
    </div>
  );
};


export default AudioPlayer;