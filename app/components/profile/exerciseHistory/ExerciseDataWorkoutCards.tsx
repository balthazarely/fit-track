"use client";

import moment from "moment";
import Link from "next/link";
import { ParesedExercisesData } from "@/types";

interface ExerciseDataWorkoutCardsProps {
  selectedExercise: string;
  fetchedExerciseData: ParesedExercisesData[];
}

export default function ExerciseDataWorkoutCards({
  fetchedExerciseData,
  selectedExercise,
}: ExerciseDataWorkoutCardsProps) {
  return (
    <>
      <div className="font-bold mt-2">Recent Sets</div>
      <div className="bg-base-200 rounded-lg p-3 h-56 overflow-y-scroll">
        {fetchedExerciseData
          ?.sort((a: any, b: any) =>
            moment(b.createdAt, "MM-DD-YYYY").diff(
              moment(a.createdAt, "MM-DD-YYYY")
            )
          )
          .slice(0, 4)
          .map((exercise: ParesedExercisesData, idx: number) => {
            return (
              <div className="mb-2" key={idx}>
                <div className="text-sm font-bold grid grid-cols-2 mb-1">
                  <div>{moment(exercise.createdAt).format("MMM DD, YYYY")}</div>
                  <div className="text-right">1RM</div>
                </div>
                <Workout exercise={exercise} />
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

function Workout({
  exercise,
}: {
  exercise: ParesedExercisesData;
}): JSX.Element | null {
  const oneRMFormula = (weight: number, reps: number) =>
    parseFloat((weight / (1.0278 - 0.0278 * reps)).toFixed(1));

  if (!exercise?.sets) {
    return null;
  }

  return (
    <>
      {exercise.sets.map((set: any, idx: number) => (
        <div className="grid grid-cols-2" key={idx}>
          <div className="text-sm flex gap-3 items-center">
            <span className="bg-base-100 text-opacity-60 text-white font-bold w-5 h-5  rounded-full flex justify-center items-center text-xs">
              {" "}
              {idx + 1}
            </span>{" "}
            {set.weight} lbs. x {set.reps} reps
          </div>
          <div className="text-sm text-right">
            {oneRMFormula(set.weight, set.reps)} 1RM
          </div>
        </div>
      ))}
    </>
  );
}
