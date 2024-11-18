import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AudioVisualizer } from 'react-audio-visualize';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router-dom';

const Player = () => {
  const {audioFile} = useGlobalContext()
  const [audioSrc, setAudioSrc] = useState(null)


  useEffect(() => {
    if (audioFile) {
      const audioUrl = URL.createObjectURL(audioFile);
      setAudioSrc(audioUrl);

      // Cleanup the object URL to avoid memory leaks
      return () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  }, [audioFile]);
  
  return (
    <div className='flex flex-col bg-stone-900 pt-8 pb-4 px-8 rounded-md'>
      <h2 className='text-2xl font-semibold mb-4'>Sample Audio</h2>
      <div className='flex justify-between items-center gap-2 mb-2'>
        <div className='w-3/4 bg-[#fff]/10 py-2 px-4 rounded text-[#eeeeee]'>
          <h2>{audioFile.name}</h2>
        </div>
        <Link to='/' className='w-1/4 bg-primary py-2 px-4 rounded flex justify-center items-center gap-2 text-nowrap bg-red-500' >
          <Icon icon="oi:audio" />
          New Audio File
        </Link>
      </div>
      <AudioPlayer
        autoPlay={false}
        src={audioSrc}
        onPlay={e => console.log("onPlay")}
        className='player'
      />
    </div>
  )
};

export default Player