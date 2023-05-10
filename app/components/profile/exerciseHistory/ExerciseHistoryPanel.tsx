"use client";

import { muscleGroups } from "@/utils/muscleGroups";
import React, { useEffect, useState } from "react";
import { Loader } from "../../UI/Loader";
import ExerciseResultCard from "./ExerciseResultCard";
import ExerciseData from "./ExerciseData";
import { ExerciseApiResults } from "@/types";

export default function ExerciseHistoryPanel() {
  const key = process.env.NEXT_PUBLIC_API_NINJA_API_KEY;
  const [selectedMuscleGroup, setSelectedMuscleGroups] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [loadingAPI, setLoadingAPI] = useState<boolean>(false);
  const [apiResults, setApiResults] = useState<ExerciseApiResults[]>([]);

  function handleSelectChange(event: any) {
    setSelectedMuscleGroups(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedMuscleGroup) {
        return;
      }
      setLoadingAPI(true);
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleGroup}`,
        {
          headers: {
            "X-Api-Key": key!,
          },
        }
      );
      const jsonData = await response.json();
      setApiResults(jsonData);
      setLoadingAPI(false);
    };

    fetchData();
  }, [selectedMuscleGroup, key]);

  return (
    <div className="my-6">
      <div className="text-xl font-bold">Exercise History</div>
      <div className="grid grid-cols-1 md:grid-cols-5  mt-4 gap-0 md:gap-6">
        <div className="col-span-2 w-full">
          <select
            value={selectedMuscleGroup}
            onChange={handleSelectChange}
            className="select  select-primary w-full mb-2 "
          >
            <option disabled value="">
              Choose Muscle Group
            </option>
            {muscleGroups.map((group: string) => (
              <option key={group} className=" ">
                {group}
              </option>
            ))}
          </select>

          <div
            className={`flex flex-col h-96  bg-base-200  ${
              apiResults.length ? " overflow-y-scroll" : " overflow-y-hidden"
            }`}
          >
            {loadingAPI && <Loader />}
            {!loadingAPI &&
              selectedMuscleGroup &&
              apiResults?.map((result: ExerciseApiResults, idx: number) => (
                <ExerciseResultCard
                  setSelectedExercise={setSelectedExercise}
                  selectedExercise={selectedExercise}
                  result={result}
                  idx={idx}
                  key={idx}
                />
              ))}
            {!selectedMuscleGroup && (
              <div className="w-full text-xl opacity-50 font-bold h-full bg-base-200 flex justify-center items-center">
                Make exercise selection
              </div>
            )}
          </div>
        </div>
        {!selectedExercise ? (
          <div className="col-span-3 text-xl opacity-50 font-bold h-full bg-base-200 flex justify-center items-center">
            Make exercise selection
          </div>
        ) : (
          <ExerciseData selectedExercise={selectedExercise} />
        )}
      </div>
    </div>
  );
}
