"use client";

import moment from "moment";

export default function ExerciseHistoryHeader({ name, data }: any) {
  console.log(data);

  interface DataObject {
    bestSet: {
      weight: number;
      reps: number;
    };
  }

  const prObject = data.reduce(
    (accumulator: DataObject, currentObject: DataObject) => {
      const currentValue =
        currentObject.bestSet.weight * currentObject.bestSet.reps;
      const highestValue =
        accumulator.bestSet.weight * accumulator.bestSet.reps;

      if (currentValue > highestValue) {
        return currentObject;
      } else {
        return accumulator;
      }
    }
  );

  return (
    <div className="bg-base-200 p-4 rounded-lg">
      <div className="font-bold text-2xl mb-2">{name}</div>
      <div className=" flex-col md:flex-row flex gap-2 md:gap-8 ">
        <div className="text-sm font-bold flex items-center">
          <span className=" font-bold mr-2">Best Set:</span>
          <span className="text-primary">
            {prObject.bestSet.weight} lbs.{" "}
            <span className="text-base-content">x</span> {prObject.bestSet.reps}
          </span>
        </div>
        <div className="text-sm font-bold flex items-center">
          <span className=" font-bold mr-2">date:</span>
          <span className="text-primary">
            {moment(prObject.createdAt).format("MMM DD, YYYY")}
          </span>
        </div>
        <div className="text-sm font-bold flex items-center">
          <span className=" font-bold mr-2">Calculated 1RM:</span>
          <span className="text-primary">{prObject.oneRepMax} lbs.</span>
        </div>
      </div>
    </div>
  );
}
