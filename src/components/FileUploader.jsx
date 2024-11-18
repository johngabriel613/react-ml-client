import React from 'react';
import Dropzone from 'react-dropzone';
import { useState, useRef } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { api } from '../config/axios';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useNavigate } from 'react-router-dom';

const FileUploader = () => {
  const { setResults, audioFile, setAudioFile } = useGlobalContext()
  const [ progress, setProgress ] = useState(1) 
  const [ currentStep, setCurrentStep ] = useState('') 
  const [ isModalOpen, setIsModalOpen ] = useState(false) 
  const browseFileRef = useRef(null)
  const navigate = useNavigate()

  const fileUpload = async(acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    setAudioFile(selectedFile);
  }

  const steps = [
    { name: 'Extracting features...', endpoint: '/visualization' },
    { name: 'Running experiment 1...', endpoint: '/exp1' },
    { name: 'Running experiment 2...', endpoint: '/exp2' },
    { name: 'Running experiment 3...', endpoint: '/exp3' },
    { name: 'Running experiment 4...', endpoint: '/exp4' },
    { name: 'Finalizing experiment 5...', endpoint: '/exp5' },
  ];

  const processAudioFile = async (audioFile) => {
    setIsModalOpen(true); 
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
          const remainingTime = Math.max(1000 - elapsedTime, 0);
          setTimeout(() => {
            resolve();
          }, remainingTime);
        });
  
        // Update progress dynamically
        const progressPercentage = ((i + 1) / steps.length) * 100;
        setProgress(progressPercentage);
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
      navigate('/summary');
    } catch (error) {
      console.error('Error processing audio file:', error);
    } finally {
      setIsModalOpen(false); // Close the progress modal
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <Dropzone onDrop={fileUpload}>
      {({getRootProps, getInputProps, isDragActive}) => (
            <section>
              <div {...getRootProps({ onClick: (event) => event.stopPropagation() })} className={`aspect-[2/1] w-[500px] flex flex-col items-center justify-center gap-2 p-4 bg-stone-900 dragzone rounded`}>
                <input {...getInputProps()} ref={browseFileRef}/>
                <Icon icon="material-symbols-light:audio-file-rounded" width={44} className='text-red-500'/>
                {
                  isDragActive ? 
                      <p className='text-3xl font-bold'>Drop it here!</p>
                    :
                    <>
                      <p className='font-bold text-xl text-center'><span className='text-primary'>Drag & drop</span> your audio files here</p>
                      <div className='text-[#808080]'>or, <button className='underline' onClick={() => browseFileRef.current.click()}>browse audio files</button></div> 
                    </>
                }
              </div>
              
            </section>
          )}
      </Dropzone>
      {audioFile && 
        <div className='w-full h-11 px-4 flex items-center justify-between bg-stone-900 rounded'>
          <div className='flex gap-2'>
            <Icon icon="ic:round-audiotrack" width={24}/>
            <p>{audioFile.name}</p>
          </div>
          <button onClick={() => setAudioFile()}>
            <Icon icon="ic:round-close" width={22}/>
          </button>
        </div>
      }
      <button className={`w-full h-11 flex items-center justify-center gap-2 bg-red-600 rounded ${audioFile ? "opacity-1" : "opacity-[0.5]"}`} disabled={!audioFile} onClick={() => processAudioFile(audioFile)}>
        <p className='font-medium'>Upload & process</p>
        <Icon icon="formkit:arrowright" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <div className="bg-stone-900 p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Processing Audio File</h2>
            <div className="flex items-center gap-2 mb-4">
              <div>
                {/* Loading Spinner */}
                <div className="w-5 h-5 border-2 border-white/20 border-t-red-500 rounded-full animate-spin"></div>
              </div>
              <p className='text-gray-300'>{currentStep}</p>
            </div>
            <div className="relative w-full h-2 bg-gray-300 rounded">
              <div
                className="absolute top-0 left-0 h-2 bg-red-600 rounded transition-all ease-linear duration-700"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-right mt-2">{Math.round(progress)}%</p>
          </div>
        </div>
      )}

    </div>
  )
}

export default FileUploader
