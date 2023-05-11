import axios from "axios";
import { useEffect, useState } from "react";
import BestSetGraph from "./graphs/BestSetGraph";
import { parseExerciseDataForGraph } from "./utils";
import ExerciseDataWorkoutCards from "./ExerciseDataWorkoutCards";
import VolumeGraph from "./graphs/VolumeGraph.";
import Link from "next/link";
import { ParesedExercisesData } from "@/types";

interface ExerciseDataProps {
  selectedExercise: string;
}

export default function ExerciseData({ selectedExercise }: ExerciseDataProps) {
  const [graphTabSelected, setGraphTabSelected] = useState<string>("best-set");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchedExerciseData, setFetchedExerciseData] = useState<
    ParesedExercisesData[] | []
  >([]);

  useEffect(() => {
    if (selectedExercise === "") {
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/getWorkoutHistory", { name: selectedExercise })
      .then((response) => {
        const data = response.data;
        setFetchedExerciseData(parseExerciseDataForGraph(data));
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedExercise]);

  return (
    <div className=" gap-2 mt-16 md:mt-0 col-span-3 flex flex-col ">
      <div className="flex justify-between">
        <div className="font-bold text-xl">{selectedExercise}</div>
        <div className="flex gap-1">
          <button
            disabled={fetchedExerciseData?.length < 1}
            onClick={() => setGraphTabSelected("best-set")}
            className={`btn btn-xs ${
              graphTabSelected === "best-set" ? "btn-primary" : "btn-outline"
            } `}
          >
            Best Set
          </button>
          <button
            disabled={fetchedExerciseData?.length < 1}
            onClick={() => setGraphTabSelected("volume")}
            className={`btn btn-xs ${
              graphTabSelected === "volume" ? "btn-primary" : "btn-outline"
            }`}
          >
            Volume
          </button>
        </div>
      </div>
      {fetchedExerciseData?.length > 0 && !isLoading ? (
        <div>
          <div
            className={`${graphTabSelected === "best-set" ? "flex" : "hidden"}`}
          >
            <BestSetGraph data={fetchedExerciseData} />
          </div>
          <div
            className={`${graphTabSelected === "volume" ? "flex" : "hidden"}`}
          >
            <VolumeGraph data={fetchedExerciseData} />{" "}
          </div>
          <ExerciseDataWorkoutCards
            fetchedExerciseData={fetchedExerciseData}
            selectedExercise={selectedExercise}
          />
        </div>
      ) : (
        <div className="h-96 gap-2 flex-col flex justify-center items-center bg-base-200">
          <div className="font-bold"> Not enought data!</div>
          <Link href="/new-workout/default">
            <button className="btn btn-primary btn-sm">Record a workout</button>
          </Link>
        </div>
      )}
    </div>
  );
}
