import React from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Icon } from '@iconify/react/dist/iconify.js';

const Visualization = () => {
  const {results} = useGlobalContext()

  const base64Image = (base64String, label) => {
    const src = `data:image/png;base64,${base64String}`;

    return (
      <img src={src} width={'100%'}/>
    );
  }
  return (
    <div className='bg-stone-900 p-8 rounded-md my-2'>
      <h2 className='text-2xl font-semibold mb-4'>Feature Extraction</h2>
      <div className="flex bg-stone-900 p-4 rounded">
        {base64Image(results.visualization.waveform, 'Waveform')}
        <Icon icon="foundation:arrow-right" width={200} className='text-red-500'/>
        {base64Image(results.visualization.spectrum, 'Spectrum')}
        <Icon icon="foundation:arrow-right" width={200} className='text-red-500'/>
        {base64Image(results.visualization.spectrogram, 'Spectrogram')}
        <Icon icon="foundation:arrow-right" width={200} className='text-red-500'/>
        {base64Image(results.visualization.mfcc, 'MFCC')}
      </div>
    </div>
  )
}

export default Visualization
