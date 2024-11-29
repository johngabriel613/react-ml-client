import React from 'react';
import Prompt from '../components/Prompt';
import Result from '../components/Result';
import { useGlobalContext } from '../hooks/useGlobalContext';

const Predict = () => {
  const {audioSrc} = useGlobalContext()
  return (
    <div className='min-h-dvh relative overflow-scroll '>
      
      <div className='container'>
        <div className={`container min-h-dvh flex flex-col fixed ${audioSrc ? 'min-h-fit block bottom-0' : 'justify-center'}`}>
          {!audioSrc && (
            <div className="mb-4">
              <h1 className='text-3xl text-center font-semibold mb-2'>Enhancing Detection of Abnormal Heartbeat using Audio Spectrogram and Hybrid CNN-LSTM Model</h1>
              <p className='flex gap-4 justify-center text-sm text-center text-[#808080]'> 
                <span className='underline'>Bernal, Kyla Marie</span>  
                <span className='underline'>Fabregas, Mike Angelo</span>   
                <span className='underline'>Paderog, John Gabriel</span>  
                <span className='underline'>Quilatan, Denzel</span> 
              </p>
            </div>
          )}
          <Prompt/>
        </div>
        <Result/>
        <div className="container fixed bottom-0 py-2 bg-[#212121]">
          <p className='text-sm text-center text-[#808080]'>This web application is for academic and research purposes only.</p>
        </div>
      </div>
    </div>
  )
}

export default Predict
