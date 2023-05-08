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
import { HiX } from "react-icons/hi";
import moment from "moment";
import { oneRepMaxFormula } from "@/utils/formulas";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/UI/Loader";

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

export default function ShowWorkoutModal({
  setShowWorkoutModal,
  showWorkoutModal,
  workoutId,
}: any) {
  const [fetchedData, setFetchedData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (showWorkoutModal) {
      setIsLoading(true);
      axios
        .post("/api/getWorkout", { id: workoutId })
        .then((response) => {
          const data = response.data; // Extract the data from the response
          setFetchedData(data);
          console.log(data);
        })
        .catch((error) => {
          console.error(error); // Handle the error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [showWorkoutModal]);

  return (
    <div className="">
      <input
        type="checkbox"
        checked={showWorkoutModal}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />

      <div
        className="modal modal-bottom sm:modal-middle"
        onClick={() => setShowWorkoutModal(false)}
      >
        <div className="transform relative left-0 lg:translate-x-24 modal-box">
          <div className="flex justify-between">
            <div className="font-bold text-lg">Workout Overview</div>
            <button
              className=" btn btn-sm btn-ghost"
              onClick={() => setShowWorkoutModal(false)}
            >
              <HiX />
            </button>
          </div>
          {fetchedData ? (
            <div className="w-full mt-2">
              <div className="flex justify-between mb-2">
                <div className="text-xl font-bold">{fetchedData.title}</div>
                <div className="text-md font-bold">
                  {moment(fetchedData.createdAt).format("MMM DD, YYYY")}
                </div>
              </div>
              {fetchedData.exercises.map((exercise: any) => {
                return (
                  <div className=" p-2">
                    <div>{exercise.name}</div>
                    {exercise.sets.map((set: any, idx: number) => (
                      <div className="grid grid-cols-2">
                        <div className="text-sm">
                          {idx} : {set.reps} x {set.weight}
                        </div>
                        <div className="text-sm text-right">
                          {oneRepMaxFormula(set.weight, set.reps)} 1RM
                        </div>
                      </div>
                    ))}
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

function Workout({ workout }: any) {
  return workout.sets.map((set: any, idx: number) => (
    <div className="grid grid-cols-2">
      <div className="text-sm">
        {idx} : {set.reps} x {set.weight}
      </div>
      <div className="text-sm text-right">
        {oneRepMaxFormula(set.weight, set.reps)} 1RM
      </div>
    </div>
  ));
}
