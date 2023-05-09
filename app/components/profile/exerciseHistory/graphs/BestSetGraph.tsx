"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  TimeScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-moment";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BestSetGraph({ data }: any) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "best set",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const weight = data[index].bestSet.weight;
            const reps = data[index].bestSet.reps;
            return `${weight} Lbs. x ${reps} Reps`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          tooltipFormat: "MMM DD",
          parser: "MM-DD-YYYY",
        },
      },
    },
  };

  const chartData = {
    labels: data?.map((item: any) => item.createdAt),
    datasets: [
      {
        label: `Best Set`,
        data: data?.map((item: any) => item.bestSet.weight),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2,
        pointRadius: 8,
      },
      {
        label: "Calculated 1RM",
        data: data?.map((item: any) => item.oneRepMax),
        fill: false,
        borderColor: "rgba(0,192,75,1)",
        tension: 0.2,
        pointRadius: 8,
      },
    ],
  };

  return (
    <div className="relative  w-full">
      {/* @ts-ignore */}
      <Line options={options} data={chartData} />
    </div>
  );
}
