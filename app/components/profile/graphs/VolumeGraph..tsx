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
import moment from "moment";
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

export default function VolumeGraph({ data }: any) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Total Volume",
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          displayFormats: {
            month: "MMM",
          },
          parser: "DD-MM-YYYY",
        },
      },
    },
  };

  const chartData = {
    labels: data.map((item: any) => item.createdAt),
    datasets: [
      {
        label: "Total Volume",
        data: data.map((item: any) => item.totalVolume),
        fill: false,
        borderColor: "rgba(192,72,192,1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="border-2 relative border-red-700 w-full">
      {/* @ts-ignore */}
      <Line options={options} data={chartData} />
    </div>
  );
}
