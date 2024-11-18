import React from 'react';
import { useGlobalContext } from '../hooks/useGlobalContext';

const Table = () => {
  const { results } = useGlobalContext();

  const DecimalToPercentage = (decimal) => {
    const percentage = (decimal * 100).toFixed(2) + '%';
    return percentage;
  };

  // Pastel colors for each EXP column
  const columnColors = [
    'bg-pink-200',  // EXP1 (Light Pink)
    'bg-blue-200',  // EXP2 (Light Blue)
    'bg-green-200', // EXP3 (Light Green)
    'bg-yellow-200', // EXP4 (Light Yellow)
    'bg-purple-200', // EXP5 (Light Purple)
  ];

  return (
    <div className="overflow-x-auto bg-stone-900 p-8 rounded-md">
      <h2 className='text-2xl font-semibold mb-4'>Model Prediction</h2>
      <table className="table-auto w-full text-sm text-left text-stone-800 border-collapse border border-stone-700">
        <thead className="bg-stone-900 text-xs uppercase text-stone-400">
          <tr>
            <th className="px-4 py-3 border border-stone-700">Metric</th>
            {['1', '2', '3', '4', '5'].map((exp, index) => (
              <th
                key={index}
                className={`px-4 py-3 border border-stone-700 ${columnColors[index]} text-stone-800 font-semibold`}
              >
                Experiment #{exp}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-stone-900 hover:bg-stone-800">
            <td className="px-4 py-3 border border-stone-700 font-bold text-stone-200">Classification</td>
            {results.models.map((model, index) => (
              <td
                key={index}
                className={`px-4 py-3 border border-stone-700 ${columnColors[index]} font-medium text-stone-800`}
              >
                {model.classification}
              </td>
            ))}
          </tr>
          <tr className="bg-stone-800 hover:bg-stone-700">
            <td className="px-4 py-3 border border-stone-700 font-bold text-stone-200">Prediction Score</td>
            {results.models.map((model, index) => (
              <td
                key={index}
                className={`px-4 py-3 border border-stone-700 ${columnColors[index]} font-medium text-stone-800`}
              >
                {DecimalToPercentage(model.prediction_score)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
