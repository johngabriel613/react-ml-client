import React from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';
import { DecimalToPercentage } from '../utils/helper';

const Table = () => {
  const { results } = useGlobalContext();

  const category = {
    "Normal": ['normal', 'extrahls'],
    "Abnormal": [ 'abnormal', 'murmur', 'extrastole']
  };
  function classifyResult(result) {
    for (let [categoryName, conditions] of Object.entries(category)) {
      if (conditions.includes(result)) {
        return categoryName;
      }
    }
    return "No Heart Sound";  
  }

  return (
    <>
      <div className='mb-4'>
        <h2 className="text-xl font-medium mb-2 text-white">Model Prediction</h2>
        <p className='text-[#d3d3d3]'>The table showcases the outcomes of evaluating the input data using five different models. This provides a comparative view of the models' performance in processing and interpreting the input data.</p>
      </div>
      <div className="rounded-lg border border-[#383838] overflow-hidden mb-2">
        <table className="table-auto w-full border-separate text-sm rounded-lg" style={{ borderSpacing: '0' }}>
          <thead className="bg-[#383838] text-gray-300">
            <tr>
              <th className="border border-[#565656] px-4 py-2 text-left first:rounded-tl-lg last:rounded-tr-lg">
                Models
              </th>
              {["Spectrogram + CNN (Binary)", "Spectrogram + CNN (Categorical)", "Spectrogram + CNN-LSTM (Categorical)", "MFCC + CNN (Categorical)", "MFCC + CNN-LSTM (Categorical)"].map((exp, index) => (
                <th
                  key={index}
                  className="border border-[#565656] px-4 py-2 font-semibold text-xs"
                >
                   {exp}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Classification Row */}
            <tr className="text-white ">
              <td className="bg-[#383838] border border-[#565656] px-4 py-2 font-bold">
                Classification
              </td>
              {results.models.map((model, index) => (
                <td
                  key={index}
                  className="border border-[#383838] px-4 py-2 font-medium"
                >
                  {model.classification}
                </td>
              ))}
            </tr>
            {/* Prediction Score Row */}
            <tr className="text-white">
              <td className="bg-[#383838] border border-[#565656] px-4 py-2 font-bold">
                Prediction Score
              </td>
              {results.models.map((model, index) => (
                <td
                  key={index}
                  className={`border border-[#383838] px-4 py-2 font-medium ${model.prediction_score >= 0.5 ? 'text-green-300' : 'text-red-300'}`}
                >
                  {DecimalToPercentage(model.prediction_score)}
                </td>
              ))}
            </tr>
            {/* Final Prediction Row */}
            <tr className="text-white">
              <td className="bg-[#383838] border border-[#565656] px-4 py-2 font-bold">
                Final Prediction
              </td>
              {results.models.map((model, index) => (
                <td
                  key={index}
                  className={`border border-[#383838] px-4 py-2 font-medium}`}
                >
                  {classifyResult(model.classification)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
