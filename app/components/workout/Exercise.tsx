import { useState } from "react";
import { HiX } from "react-icons/hi";
import ExerciseHistoryModal from "./workoutModals/ExerciseHistoryModal";
import { Exercises, Workout } from "@/types";

interface ExerciseProps {
  index: number;
  exercises: Exercises;
  workout: Workout;
  setWorkout: (state: Workout) => void;
  addSet: (index: number) => void;
  removeSet: (idx: number, index: number) => void;
  deleteExercise: (index: number) => void;
  dbUpdating: boolean;
}

type set = {
  reps: number;
  weight: number;
  rpe?: number | any;
};

export default function Exercise({
  index,
  exercises,
  workout,
  setWorkout,
  addSet,
  removeSet,
  deleteExercise,
  dbUpdating,
}: ExerciseProps) {
  const [exerciseHistoryModalOpen, setExerciseHistoryModalOpen] =
    useState<boolean>(false);

  return (
    <>
      <div
        className="bg-base-200 rounded-md  px-4 py-2 flex justify-center items-center flex-col  "
        key={index}
      >
        <div className="flex w-full justify-between items-center ">
          <div className="font-bold text-sm ">{exercises.name}</div>
          <div className="flex btn-group items-center">
            <button
              disabled={dbUpdating}
              onClick={() => setExerciseHistoryModalOpen(true)}
              className="btn btn-xs btn-outline "
            >
              history
            </button>

            <button
              disabled={dbUpdating}
              onClick={() => deleteExercise(index)}
              className="btn btn-xs btn-outline "
            >
              <HiX />
            </button>
          </div>
        </div>

        <div className="font-bold w-full flex gap-2 items-center mt-2  text-xs ">
          <div className="w-6 text-center ">set</div>
          <div className="w-16 text-center">lbs</div>
          <div className="w-16 text-center">reps</div>
          <div className="w-16 text-center">rpe</div>
        </div>

        {exercises.sets.map((set: set, idx: number) => (
          <div className="text-sm w-full flex gap-2 items-center " key={idx}>
            <div className="text-xs font-bold  rounded-full bg-base-100 flex justify-center items-center w-6 h-6">
              {idx + 1}
            </div>
            <input
              className="bg-base-100 h-10 w-16 text-center rounded-md"
              name="weight"
              type="number"
              placeholder="weight"
              value={set.weight}
              onChange={(event) => {
                const newValue = parseInt(event.target.value);
                if (newValue >= 0) {
                  const newWorkout = { ...workout };
                  newWorkout.exercises[index].sets[idx].weight = newValue;
                  setWorkout(newWorkout);
                }
              }}
            />
            <input
              className="bg-base-100 h-10 w-16  text-center rounded-md"
              name="reps"
              type="number"
              placeholder="reps"
              value={set.reps}
              onChange={(event) => {
                const newValue = parseInt(event.target.value);
                if (newValue >= 0) {
                  const newWorkout = { ...workout };
                  newWorkout.exercises[index].sets[idx].reps = parseInt(
                    event.target.value
                  );
                  setWorkout(newWorkout);
                }
              }}
            />
            <select
              value={set.rpe}
              onChange={(event) => {
                const newWorkout = { ...workout };
                newWorkout.exercises[index].sets[idx].rpe = Number(
                  event.target.value
                );
                setWorkout(newWorkout);
              }}
              className="select  select-sm  max-w-xs"
            >
              <option disabled selected>
                RPE
              </option>
              <option>6</option>
              <option>6.5</option>
              <option>7</option>
              <option>7.5</option>
              <option>8</option>
              <option>8.5</option>
              <option>9</option>
              <option>10</option>
            </select>
            <div className="flex-grow flex justify-end items-end">
              <button
                disabled={dbUpdating}
                className="btn btn-ghost"
                onClick={() => removeSet(idx, index)}
              >
                <HiX />
              </button>
            </div>
          </div>
        ))}

        <button
          disabled={dbUpdating}
          className="btn mt-2 w-full btn-sm btn-primary "
          onClick={() => addSet(index)}
        >
          add set
        </button>
      </div>
      <ExerciseHistoryModal
        exercisesName={exercises.name}
        exerciseHistoryModalOpen={exerciseHistoryModalOpen}
        setExerciseHistoryModalOpen={setExerciseHistoryModalOpen}
      />
    </>
  );
}
