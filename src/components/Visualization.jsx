import React, { useState } from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { Icon } from '@iconify/react/dist/iconify.js';

const Visualization = () => {
  const { results } = useGlobalContext();
  const [selectedImage, setSelectedImage] = useState(null);

  const base64Image = (base64String, label) => {
    const src = `data:image/png;base64,${base64String}`;

    return (
      <div
        key={label}
        className="cursor-pointer w-full"
        onClick={() => setSelectedImage(src)} // Set selected image on click
      >
        <img src={src} alt={label} width="100%" className='h-full'/>
      </div>
    );
  };

  // Optional: Handle closing the expanded image view
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-1">Feature Extraction</h2>
        <p className="text-[#d3d3d3]">
          ( Waveform &rarr; Spectrum &rarr; Spectrogram &rarr; MFCC ( Mel-Frequency Cepstral Coefficients ) )
        </p>
      </div>
      <div className="flex gap-1">
        {base64Image(results.visualization.waveform, 'Waveform')}
        {base64Image(results.visualization.spectrum, 'Spectrum')}
        {base64Image(results.visualization.spectrogram, 'Spectrogram')}
        {base64Image(results.visualization.mfcc, 'MFCC')}
      </div>

      {/* Display the selected image in full-screen view if selected */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={closeImage} // Close on click outside the image
        >
          <img
            src={selectedImage}
            alt="Expanded View"
            className="max-w-full max-h-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image itself
          />
        </div>
      )}
    </div>
  );
};

export default Visualization;
