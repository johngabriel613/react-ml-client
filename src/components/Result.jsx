import React, {useState, useEffect, useRef} from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Icon } from '@iconify/react/dist/iconify.js';
import CustomAudioPlayer from './CustomAudioPlayer';
import Visualization from './Visualization';
import Table from './Table';
import Charts from './Charts';

const Result = () => {
  const {audioFile, audioSrc, currentStep, isLoading, results} = useGlobalContext();
  const [visibleComponent, setVisibleComponent] = useState(0);

  useEffect(() => {
    if(results){
      const interval = setInterval(() => {
        setVisibleComponent((prev) => prev + 1);
      }, 500); // 300ms interval
  
      console.log(visibleComponent)
  
      return () => clearInterval(interval);
    } // Clean up the interval on component unmount
  }, [results]);
  
  return (
    <div className='min-h-dvh pt-24 pb-32'>
      {audioFile && (
        <div className="container flex justify-center items-center gap-2 fixed top-0 p-6 bg-gradient-to-b from-[#212121] via-[#212121] to-transparent">
          <div className="border-gray-50/20 border p-2 rounded-md">
            <Icon icon="iconamoon:file-audio" width={24}/>
          </div>
          <h1 className='underline'>{audioFile.name}</h1>
        </div>
      )}
      <div className='w-full h-fit flex flex-col gap-4'>
      {audioSrc && (
        <CustomAudioPlayer audioSrc={audioSrc}/>
      )}
      <div className='flex items-start gap-2'>
        {audioSrc && (
          <div className='w-fit border-gray-50/20 border p-2 rounded-full'>
            <Icon icon="mingcute:ai-fill" />
          </div>
        )}
        <div className='p-1'>
          {isLoading && <p className='animate-pulse'>{currentStep}</p>}
          {results && (
            <div className="flex flex-col gap-2">
              {visibleComponent > 0 && <Visualization />}
              {visibleComponent > 1 && <Table />}
              {visibleComponent > 2 && <Charts />}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default Result
