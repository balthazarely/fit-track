"use client";

import moment from "moment";
import Link from "next/link";

export default function ExerciseDataWorkoutCards({
  fetchedExercisData,
  selectedExercise,
}: any) {
  return (
    <>
      <div className="font-bold mt-2">Recent Sets</div>
      <div className="bg-base-200 rounded-lg p-3 h-56 overflow-y-scroll">
        {fetchedExercisData
          ?.sort((a: any, b: any) =>
            moment(b.createdAt, "MM-DD-YYYY").diff(
              moment(a.createdAt, "MM-DD-YYYY")
            )
          )
          .slice(0, 4)
          .map((workout: any, idx: number) => {
            return (
              <div className="mb-2" key={idx}>
                <div className="text-sm font-bold grid grid-cols-2 mb-1">
                  <div>{moment(workout.createdAt).format("MMM DD, YYYY")}</div>
                  <div className="text-right">1RM</div>
                </div>
                <Workout workout={workout} />
              </div>
            );
          })}
      </div>
      <Link href={`/profile/history/${selectedExercise}`}>
        <button className="btn btn-ghost btn-sm mt-2 w-full">
          See All Exercise Set Data
        </button>
      </Link>
    </>
  );
}

function Workout({ workout }: any) {
  const oneRMFormula = (weight: number, reps: number) =>
    parseFloat((weight / (1.0278 - 0.0278 * reps)).toFixed(1));

  return workout?.sets?.map((set: any, idx: number) => (
    <div className="grid grid-cols-2">
      <div className="text-sm flex gap-3 items-center">
        <span className=""> {idx}</span> {set.reps} reps x {set.weight} lbs
      </div>
      <div className="text-sm text-right">
        {oneRMFormula(set.weight, set.reps)} 1RM
      </div>
    </div>
  ));
}
