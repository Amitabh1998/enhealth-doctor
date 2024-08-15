import React from "react";
import { Bar } from "react-chartjs-2";

import { CategoryScale, Chart, ArcElement, registerables } from "chart.js";

Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(...registerables);

const RevenueGraph = ({ data, title }) => {
  const dates = data.map((item) => item.date);
  const labTestRevenues = data.map((item) => item.revenue);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: "Doctor Revenue",
        data: labTestRevenues,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true, // Stack bars on the x-axis
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        beginAtZero: true, // Start y-axis from 0
        stacked: true, // Stack bars on the y-axis
        title: {
          display: true,
          text: "Revenue",
        },
      },
    },
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueGraph;
