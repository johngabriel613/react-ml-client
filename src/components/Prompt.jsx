import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { api } from '../config/axios';

const Prompt = () => {
  const { setResults, audioFile, setAudioFile, audioSrc, setAudioSrc, setCurrentStep, isLoading, setIsLoading } = useGlobalContext()
  const [selectedFile, setSelectedFile] = useState()
  const browseFileRef = useRef(null)
  const navigate = useNavigate()

  const fileUpload = async(acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setSelectedFile(selectedFile)
  }

  const steps = [
    { name: 'Extracting features...', endpoint: '/visualization' },
    { name: 'Experimenting Spectrogram + CNN (Binary)...', endpoint: '/exp1' },
    { name: 'Experimenting Spectrogram + CNN (Categorical)...', endpoint: '/exp2' },
    { name: 'Experimenting Spectrogram + CNN-LSTM (Categorical)...', endpoint: '/exp3' },
    { name: 'Experimenting MFCC + CNN (Categorical)...', endpoint: '/exp4' },
    { name: 'Experimenting MFCC + CNN-LSTM (Categorical)...', endpoint: '/exp5' },
  ];


  const processAudioFile = async (audioFile) => {
    setResults()
    setIsLoading(true); 
    setAudioFile(audioFile)

    if (audioFile) {
      const audioUrl = URL.createObjectURL(audioFile);
      setAudioSrc(audioUrl);
      setSelectedFile()
    }

    const formData = new FormData();
    formData.append('audio_file', audioFile);
  
    const results = {};
    try {
      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        setCurrentStep(step.name);
  
        // Use a promise to ensure each step takes at least 1 second
        await new Promise(async (resolve) => {
          const startTime = Date.now();
  
          // Perform the API request
          const response = await api.post(step.endpoint, formData);
          results[step.endpoint] = response;
  
          // Calculate the time elapsed since the start of the request
          const elapsedTime = Date.now() - startTime;
  
          // Ensure a 1-second delay before resolving
          const remainingTime = Math.max(2000 - elapsedTime, 0);
          setTimeout(() => {
            resolve();
          }, remainingTime);
        })
      }
  
      const data = {
        visualization: results['/visualization'],
        models: [
          results['/exp1'],
          results['/exp2'],
          results['/exp3'],
          results['/exp4'],
          results['/exp5'],
        ],
      };
  
      setResults(data);
    } catch (error) {
      console.error('Error processing audio file:', error);
    } finally {
      setIsLoading(false); // Close the progress modal
    }
  };


  return (
    <div className='container mb-9'>
      <Dropzone onDrop={fileUpload}>
      {({getRootProps, getInputProps, isDragActive}) => (
            <section>
              <div {...getRootProps({ onClick: (event) => event.stopPropagation() })} className={` flex flex-col gap-2 p-4 bg-[#2f2f2f] dragzone rounded-3xl`}>
                <input {...getInputProps()} ref={browseFileRef}/>
                { selectedFile && 
                  <div className="relative w-fit flex items-center gap-2 bg-[#212121] py-2 pl-2 pr-8 rounded-lg">
                    <div className="bg-red-500 p-2 rounded-md">
                      <Icon icon="iconamoon:file-audio" width={24}/>
                    </div>
                    <div>
                      <p className='text-sm'>{selectedFile.name}</p>
                      <span className='text-xs text-[#808080]'>Audio File</span>
                    </div>
                    <button className='absolute -top-2 -right-2 bg-[#2f2f2f] p-[.15rem] rounded-full' onClick={() => setSelectedFile()}>
                      <Icon icon="carbon:close-filled" width={18}/>
                    </button>
                  </div>
                }
                <div className="flex justify-between items-center">
                  <button className='flex items-center gap-1' onClick={() => browseFileRef.current.click()}>
                    <Icon icon="majesticons:attachment-line" width={22}/>
                    <p>Upload an audio file...</p>
                  </button>
                  {isLoading ? 
                    <Icon icon="line-md:loading-loop" width={38} />
                    :
                      <button className={`bg-white p-2 rounded-full ${selectedFile ? 'opacity-1' : 'opacity-30'}`} disabled={!selectedFile} onClick={() => processAudioFile(selectedFile)}>
                        <Icon icon="ion:arrow-up-outline" width={22} className='text-[#121212]'/>
                      </button>
                  }
                </div>
              </div>
            </section>
          )}
      </Dropzone>
    </div>
  )
}

export default Prompt
