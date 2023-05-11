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
import { BiDumbbell } from "react-icons/bi";

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

  const prObject = fetchedData?.reduce(
    (maxObj, obj) => {
      const innerMaxObject = obj.sets.reduce(
        (innerMax, set) => {
          const sum = set.reps + set.weight;
          if (sum > innerMax.sum) {
            return { ...set, sum };
          }
          return innerMax;
        },
        { sum: -Infinity }
      );

      if (innerMaxObject.sum > maxObj.sum) {
        return innerMaxObject;
      }
      return maxObj;
    },
    { sum: -Infinity }
  );

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
                  moment(b.createdAt, "YYYY-MM-DD").diff(
                    moment(a.createdAt, "YYYY-MM-DD")
                  )
                )
                .map((exercise: Exercises, idx: number) => {
                  return (
                    <div key={idx} className=" mb-4 py-1 pl-1 pr-4">
                      <div className="text-sm font-bold grid grid-cols-2 mb-1">
                        <div>
                          {moment(exercise.createdAt).format("MMM DD, YYYY")}
                        </div>
                        <div className="text-right pr-2">1RM</div>
                      </div>
                      <ExerciseCard prObject={prObject} exercise={exercise} />
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="">
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
  prObject,
}: {
  prObject: any;
  exercise: Exercises;
}): JSX.Element | null {
  return (
    <>
      {exercise.sets.map((set: any, idx: number) => (
        <div
          className={`grid grid-cols-2 px-2  rounded-md ${
            prObject.id === set.id ? "border-[1px] border-primary" : ""
          }`}
          key={idx}
        >
          <div className="text-sm flex gap-0 items-center">
            <span className="opacity-60 mr-2 font-bold w-5 h-5  rounded-full flex justify-center items-center text-xs">
              {" "}
              {idx + 1}
            </span>{" "}
            {set.reps} reps x {set.weight} lbs
            {prObject.id === set.id ? (
              <>
                <BiDumbbell className="text-lg text-primary ml-2 mr-1" />{" "}
                <div className="text-primary text-xs font-bold">PR</div>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="text-sm text-right">
            {oneRepMaxFormula(set.weight, set.reps)} 1RM
          </div>
        </div>
      ))}
    </>
  );
}
