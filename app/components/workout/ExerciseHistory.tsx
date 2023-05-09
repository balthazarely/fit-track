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

import BestSetGraph from "../profile/exerciseHistory/graphs/BestSetGraph";
import moment from "moment";
import VolumeGraph from "../profile/exerciseHistory/graphs/VolumeGraph.";
import Heading from "../UI/Heading";

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

export default function ExerciseHistory({ data }: any) {
  const oneRMFormula = (weight: number, reps: number) =>
    parseFloat((weight / (1.0278 - 0.0278 * reps)).toFixed(1));

  const exersiceData = data
    .map((dataset: any) => {
      const bestSet = dataset.sets.reduce(function (prev: any, current: any) {
        return prev.weight * prev.reps > current.weight * current.reps
          ? prev
          : current;
      });
      const bestSetObj = {
        weight: bestSet.weight,
        reps: bestSet.reps,
      };
      const oneRepMax = oneRMFormula(bestSetObj.weight, bestSetObj.reps);

      const totalVolume = dataset.sets.reduce((acc: any, set: any) => {
        return acc + set.reps * set.weight;
      }, 0);

      return {
        createdAt: moment(dataset.createdAt).format("DD-MM-YYYY"),
        bestSet: bestSetObj,
        totalVolume: totalVolume,
        oneRepMax: oneRepMax,
      };
    })
    .sort((a: any, b: any) =>
      moment(a.createdAt, "DD-MM-YYYY").diff(moment(b.createdAt, "DD-MM-YYYY"))
    );

  return (
    <div className="grid gap-2 grid-cols-1 md:grid-cols-5 border-2 border-blue-500 ">
      <div className="col-span-2">
        <Heading heading={data[0].name} />
        <div className="border-2 h-[450px] overflow-y-scroll">
          {data
            .sort((a: any, b: any) =>
              moment(b.createdAt, "DD-MM-YYYY").diff(
                moment(a.createdAt, "DD-MM-YYYY")
              )
            )
            .map((workout: any) => {
              return (
                <div className="border-2 mb-4 py-1 pl-1 pr-4">
                  <div className="text-sm font-bold grid grid-cols-2 mb-1">
                    <div>
                      {moment(workout.createdAt).format("MMM DD, YYYY")}
                    </div>
                    <div className="text-right">1RM</div>
                  </div>
                  <Workout workout={workout} />
                </div>
              );
            })}
        </div>
      </div>
      <div className="col-span-3">
        <BestSetGraph data={exersiceData} />
        <VolumeGraph data={exersiceData} />
      </div>
    </div>
  );
}

function Workout({ workout }: any) {
  const oneRMFormula = (weight: number, reps: number) =>
    parseFloat((weight / (1.0278 - 0.0278 * reps)).toFixed(1));

  return workout.sets.map((set: any, idx: number) => (
    <div className="grid grid-cols-2">
      <div className="text-sm">
        {idx} : {set.reps} x {set.weight}
      </div>
      <div className="text-sm text-right">
        {oneRMFormula(set.weight, set.reps)} 1RM
      </div>
    </div>
  ));
}

{
  /* <OneRepMaxGraph data={exersiceData} /> */
}
{
  /* <Line options={options} data={chartData} /> */
}
{
  /* <Line options={options2} data={chartData2} /> */
}
