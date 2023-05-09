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
import { HiX } from "react-icons/hi";
import moment from "moment";
import { oneRepMaxFormula } from "@/utils/formulas";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/UI/Loader";
import { Exercises } from "@/types";

interface ExerciseHistoryModalProps {
  exercisesName: string;
  setExerciseHistoryModalOpen: (state: boolean) => void;
  exerciseHistoryModalOpen: boolean;
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

export default function ExerciseHistoryModal({
  exerciseHistoryModalOpen,
  setExerciseHistoryModalOpen,
  exercisesName,
}: ExerciseHistoryModalProps) {
  const [fetchedData, setFetchedData] = useState<Exercises[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (exerciseHistoryModalOpen) {
      setIsLoading(true);
      axios
        .post("/api/getWorkoutHistory", { name: exercisesName })
        .then((response) => {
          const data = response.data;

          setFetchedData(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [exerciseHistoryModalOpen, exercisesName]);

  return (
    <div className="">
      <input
        type="checkbox"
        checked={exerciseHistoryModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />

      <div
        className="modal modal-bottom sm:modal-middle"
        onClick={() => setExerciseHistoryModalOpen(false)}
      >
        <div className="transform relative left-0 lg:translate-x-24 modal-box">
          <div className="flex justify-between">
            <div className="font-bold text-lg">{exercisesName}</div>
            <button
              className=" btn btn-sm btn-ghost"
              onClick={() => setExerciseHistoryModalOpen(false)}
            >
              <HiX />
            </button>
          </div>
          {fetchedData && fetchedData.length > 0 ? (
            <div className="w-full   mt-2">
              {fetchedData
                .sort((a: any, b: any) =>
                  moment(b.createdAt, "DD-MM-YYYY").diff(
                    moment(a.createdAt, "DD-MM-YYYY")
                  )
                )
                .map((exercise: Exercises, idx: number) => {
                  return (
                    <div key={idx} className=" mb-4 py-1 pl-1 pr-4">
                      <div className="text-sm font-bold grid grid-cols-2 mb-1">
                        <div>
                          {moment(exercise.createdAt).format("MMM DD, YYYY")}
                        </div>
                        <div className="text-right">1RM</div>
                      </div>
                      <ExerciseCard exercise={exercise} />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="">
              {" "}
              {isLoading ? (
                <Loader size="md" />
              ) : (
                <div className="text-center py-2"> No history</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ExerciseCard({
  exercise,
}: {
  exercise: Exercises;
}): JSX.Element | null {
  return (
    <>
      {exercise.sets.map((set: any, idx: number) => (
        <div className="grid grid-cols-2" key={idx}>
          <div className="text-sm flex gap-3 items-center">
            <span className=""> {idx + 1}</span> {set.reps} reps x {set.weight}{" "}
            lbs
          </div>
          <div className="text-sm text-right">
            {oneRepMaxFormula(set.weight, set.reps)} 1RM
          </div>
        </div>
      ))}
    </>
  );
}
