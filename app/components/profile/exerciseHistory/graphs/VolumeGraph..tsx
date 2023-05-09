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
import { ParesedExercisesData } from "@/types";

interface VolumeGraphProps {
  data: ParesedExercisesData[];
}

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

export default function VolumeGraph({ data }: VolumeGraphProps) {
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
          tooltipFormat: "MMM DD",
          parser: "MM-DD-YYYY",
        },
      },
    },
  };

  const chartData = {
    labels: data?.map((item: ParesedExercisesData) => item.createdAt),
    datasets: [
      {
        label: "Total Volume",
        data: data?.map((item: ParesedExercisesData) => item.totalVolume),
        fill: false,
        borderColor: "rgba(192,72,192,1)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* @ts-ignore */}
      <Line options={options} data={chartData} />
    </div>
  );
}
