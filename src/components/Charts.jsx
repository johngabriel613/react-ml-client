import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; 
import { useGlobalContext } from "../hooks/useGlobalContext";
import { DecimalToPercentage } from "../utils/helper";


Chart.register(ChartDataLabels);

const Charts = () => {
  const {results} = useGlobalContext()
  

  const data = {
    labels: ["Spectrogram + CNN (Binary)", "Spectrogram + CNN (Categorical)", "Spectrogram + CNN-LSTM (Categorical)", "MFCC + CNN (Categorical)", "MFCC + CNN-LSTM (Categorical)"], // X-axis labels
    datasets: [
      {
        label: "Prediction Score (%)",
        data: results.models.map((model) => Math.floor(model.prediction_score * 100)), // Y-axis values
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ], // Bar colors
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ], // Bar border colors
        borderWidth: 1, // Bar border width
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          font: {
            family: "Inter, sans-serif", // Inter font for legend labels
            size: 14, // Font size for legend labels
          },
        },
      },
      datalabels: {
        // Add text inside bars
        anchor: "center",
        align: "center",
        color: "white",
        font: {
          family: "Inter, sans-serif", // Inter font for data labels
          size: 14, // Font size for data labels
          weight: "500", // Font weight for data labels
        },
        formatter: (value, context) => {
          return results.models[context.dataIndex].classification; // Text inside the bar
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // Set the Y-axis maximum to 100 for percentage
        title: {
          display: true,
          text: "Prediction Score (%)",
          font: {
            family: "Inter, sans-serif", // Inter font for Y-axis title
            size: 16, // Font size for Y-axis title
            weight: "500", // Font weight for Y-axis title
          },
        },
        ticks: {
          font: {
            family: "Inter, sans-serif", // Inter font for Y-axis ticks
            size: 14, // Font size for Y-axis ticks
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light grid lines for dark background
          borderColor: "rgba(255, 255, 255, 0.1)", // Light grid line border for Y-axis
          borderWidth: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Model",
          font: {
            family: "Inter, sans-serif", // Inter font for X-axis title
            size: 16, // Font size for X-axis title
            weight: "500", // Font weight for X-axis title
          },
        },
        ticks: {
          font: {
            family: "Inter, sans-serif", // Inter font for X-axis ticks
            size: 14, // Font size for X-axis ticks
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Light grid lines for dark background
          borderColor: "rgba(255, 255, 255, 0.1)", // Light grid line border for X-axis
          borderWidth: 1,
        },
      },
    },
  };
  
  

  return (
    <Bar data={data} options={options} />
  );
};

export default Charts;
