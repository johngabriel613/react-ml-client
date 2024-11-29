export const DecimalToPercentage = (decimal) => {
  const percentage = (decimal * 100).toFixed(2) + '%';
  return percentage;
};