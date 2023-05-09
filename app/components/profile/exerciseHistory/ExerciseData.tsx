import axios from "axios";
import { useEffect, useState } from "react";
import BestSetGraph from "./graphs/BestSetGraph";
import { parseExerciseDataForGraph } from "./utils";
import ExerciseDataWorkoutCards from "./ExerciseDataWorkoutCards";
import VolumeGraph from "./graphs/VolumeGraph.";
import Link from "next/link";

export default function ExerciseData({ selectedExercise }: any) {
  const [fetchedExercisData, setFetcheExercisData] = useState<any>(null);
  const [graphTabSelected, setGraphTabSelected] = useState<any>("best-set");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (selectedExercise === "") {
      return;
    }
    setIsLoading(true);
    axios
      .post("/api/getWorkoutHistory", { name: selectedExercise })
      .then((response) => {
        const data = response.data;
        setFetcheExercisData(parseExerciseDataForGraph(data));
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
            disabled={fetchedExercisData?.length < 1}
            onClick={() => setGraphTabSelected("best-set")}
            className={`btn btn-xs ${
              graphTabSelected === "best-set" ? "btn-primary" : "btn-outline"
            } `}
          >
            Best Set
          </button>
          <button
            disabled={fetchedExercisData?.length < 1}
            onClick={() => setGraphTabSelected("volume")}
            className={`btn btn-xs ${
              graphTabSelected === "volume" ? "btn-primary" : "btn-outline"
            }`}
          >
            Volume
          </button>
        </div>
      </div>
      {fetchedExercisData?.length > 0 && !isLoading ? (
        <div>
          <div
            className={`${graphTabSelected === "best-set" ? "flex" : "hidden"}`}
          >
            <BestSetGraph data={fetchedExercisData} />
          </div>
          <div
            className={`${graphTabSelected === "volume" ? "flex" : "hidden"}`}
          >
            <VolumeGraph data={fetchedExercisData} />{" "}
          </div>
          <ExerciseDataWorkoutCards
            fetchedExercisData={fetchedExercisData}
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
