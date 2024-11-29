import React, {useState, useRef} from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

const CustomAudioPlayer = ({audioSrc}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Play or pause the audio
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update current time as the audio plays
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Update duration once audio is loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Seek to a specific time in the audio
  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  // Format time in mm:ss
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
      <div className="w-full max-w-[300px] flex items-center justify-between gap-2 mb-4 bg-[#2f2f2f] p-4 rounded-full ml-auto">
        <button
          onClick={togglePlay}
          className=""
        >
          {isPlaying ? <Icon icon="ic:round-pause" /> : <Icon icon="solar:play-bold" />}
        </button>
        <input
        type="range"
        className="w-full custom-range-slider"
        min="0"
        max="100"
        value={(currentTime / duration) * 100 || 0}
        onChange={handleSeek}
        />
        <span className="text-white text-sm whitespace-nowrap">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </>
  )
}

export default CustomAudioPlayer
