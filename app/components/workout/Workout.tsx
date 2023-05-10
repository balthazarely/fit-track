"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import Exercise from "./Exercise";
import toast from "react-hot-toast";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/navigation";
import ConfrimCompleteModal from "./workoutModals/ConfirmCompleteModal";
import ConfrimDeleteModal from "./workoutModals/ConfrimDeleteModal";
import ChangeDateModal from "./workoutModals/ChangeDateModal";
import AddNewExercisesModal from "./workoutModals/AddNewExercisesModal";
import { Exercises, InitialWorkout, Workout } from "@/types";
import WorkoutHeader from "./WorkoutHeader";

const defaultWorkout = {
  title: "workout-01",
  exercises: [],
};

interface WorkoutProps {
  initlWorkout?: Workout | InitialWorkout | any;
  editWorkout?: boolean;
}

export default function Workout({
  initlWorkout = defaultWorkout,
  editWorkout = false,
}: WorkoutProps) {
  const [workout, setWorkout] = useState<Workout | any>(initlWorkout);
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [dbUpdating, setDbUpdateing] = useState<boolean>(false);

  // MODAL
  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);

  const router = useRouter();
  // const inputRef = useRef<HTMLInputElement>(null);

  const addNewExercise = (exerciseName: string) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        {
          name: exerciseName,
          sets: [{ reps: 0, weight: 0 }],
        },
      ],
    });
  };

  const deleteExercise = (index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises.splice(index, 1);
    setWorkout(newWorkout);
  };

  const updateWorkoutInfo = (value: any, field: string) => {
    const newWorkout = { ...workout };
    newWorkout[field] = value;
    setWorkout(newWorkout);
  };

  const addSet = (index: number) => {
    const prevWeightReps = workout.exercises[index].sets.slice(-1)[0];
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.push({
      reps: prevWeightReps?.reps || 0,
      weight: prevWeightReps?.weight || 0,
    });
    setWorkout(newWorkout);
  };

  const removeSet = (idx: number, index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.splice(idx, 1);
    setWorkout(newWorkout);
  };

  const useDatabase = useCallback(
    (apiRoute: string, loadMsg: string, successMsg: string) => {
      setDbUpdateing(true);
      const promise = axios.post(apiRoute, workout);
      toast.promise(
        promise,
        {
          loading: loadMsg,
          success: successMsg,
          error: "Error",
        },
        {
          style: {
            background: "#3d4451",
            color: "white",
          },
          success: {
            duration: 2000,
          },
        }
      );
      promise
        .then(() => {
          router.refresh();
          router.push("/profile");
          // setDbUpdateing(false);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [workout, router]
  );

  return (
    <>
      <div className="max-w-md mx-auto px-4">
        <WorkoutHeader
          editWorkout={editWorkout}
          modifyDatabase={useDatabase}
          setDeleteModalOpen={setDeleteModalOpen}
          nameEdit={nameEdit}
          workout={workout}
          setNameEdit={setNameEdit}
          updateWorkoutInfo={updateWorkoutInfo}
          setDateModalOpen={setDateModalOpen}
          dbUpdating={dbUpdating}
        />
        <div className="flex gap-2 flex-col">
          {workout.exercises.map((exercises: Exercises, index: number) => {
            return (
              <Exercise
                key={index}
                index={index}
                exercises={exercises}
                workout={workout}
                setWorkout={setWorkout}
                addSet={addSet}
                removeSet={removeSet}
                deleteExercise={deleteExercise}
                dbUpdating={dbUpdating}
              />
            );
          })}
        </div>
        <div className="divider"></div>
        <div className="my-2 flex flex-col w-full gap-2">
          <button
            disabled={dbUpdating}
            className="btn-outline btn px-2 py-1   w-full"
            onClick={() => setExerciseModalOpen(true)}
          >
            add new exercise
          </button>
          {!editWorkout && (
            <button
              disabled={dbUpdating}
              className={`btn btn-primary px-2 py-1  w-full ${
                workout.exercises?.length === 0 ? "btn-disabled" : ""
              } `}
              onClick={() => setCompleteModalOpen(true)}
            >
              Save Workout
            </button>
          )}
        </div>
      </div>

      <AddNewExercisesModal
        setExerciseModalOpen={setExerciseModalOpen}
        exerciseModalOpen={exerciseModalOpen}
        addNewExercise={addNewExercise}
      />
      <ChangeDateModal
        updateWorkoutInfo={updateWorkoutInfo}
        dateModalOpen={dateModalOpen}
        setDateModalOpen={setDateModalOpen}
        workout={workout}
      />
      <ConfrimDeleteModal
        deleteWorkout={useDatabase}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      <ConfrimCompleteModal
        saveWorkoutToDB={useDatabase}
        completeModalOpen={completeModalOpen}
        setCompleteModalOpen={setCompleteModalOpen}
      />
    </>
  );
}
