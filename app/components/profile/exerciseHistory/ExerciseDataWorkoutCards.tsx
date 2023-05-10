"use client";

import moment from "moment";
import Link from "next/link";
import { ParesedExercisesData } from "@/types";
import { oneRepMaxFormula } from "@/utils/formulas";

interface ExerciseDataWorkoutCardsProps {
  selectedExercise: string;
  fetchedExerciseData: ParesedExercisesData[];
  limitResults?: boolean;
}

export default function ExerciseDataWorkoutCards({
  fetchedExerciseData,
  selectedExercise,
  limitResults = true,
}: ExerciseDataWorkoutCardsProps) {
  const sortedExercises = fetchedExerciseData?.sort((a: any, b: any) =>
    moment(b.createdAt, "MM-DD-YYYY").diff(moment(a.createdAt, "MM-DD-YYYY"))
  );

  const displayedExercises = sortedExercises?.map(
    (exercise: ParesedExercisesData, idx: number) => (
      <div className="mb-2 w-full" key={idx}>
        <Workout idx={idx} exercise={exercise} />
      </div>
    )
  );
  const slicedExercises = limitResults
    ? displayedExercises?.slice(0, 4)
    : displayedExercises;

  return (
    <>
      <div className="font-bold my-2 flex justify-between">
        Recent Sets{" "}
        {limitResults && (
          <Link href={`/profile/history/${selectedExercise}`}>
            <button className="btn btn-primary btn-xs ">
              See Full Exercise Data
            </button>
          </Link>
        )}
      </div>
      <div
        className={`${
          limitResults ? "h-56" : "h-[500px]"
        } bg-base-200  rounded-lg p-3 overflow-y-scroll`}
      >
        {slicedExercises}
      </div>
    </>
  );
}

function Workout({
  exercise,
  idx,
}: {
  exercise: ParesedExercisesData;
  idx: number;
}): JSX.Element | null {
  if (!exercise?.sets) {
    return null;
  }

  return (
    <div className="w-full mb-4  ">
      <div className="text-sm border-b-2 border-opacity-50 border-white flex justify-between font-bold mb-1">
        <div className="">
          {moment(exercise.createdAt).format("MMM DD, YYYY")}
        </div>
        <div className="text-right">1RM</div>
      </div>
      {exercise.sets.map((set: any, idx: number) => (
        <div className="flex justify-between" key={idx}>
          <div className=" flex w-full  flex-grow items-center  text-sm">
            <span className="bg-base-100 text-opacity-60 text-white font-bold w-5 h-5 mr-1  rounded-full flex justify-center items-center text-xs">
              {" "}
              {idx + 1}
            </span>{" "}
            {set.weight} lbs. x {set.reps} reps
          </div>
          <div className=" w-24 text-right  text-xs">
            {oneRepMaxFormula(set.weight, set.reps)} lb 1RM
          </div>
        </div>
      ))}
    </div>
  );
}
