"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Exercise from "./Exercise";
import toast from "react-hot-toast";
import { AiTwotoneEdit, AiOutlineCheck, AiFillCalendar } from "react-icons/ai";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/navigation";
import ConfrimCompleteModal from "./workoutModals/ConfirmCompleteModal";
import ConfrimDeleteModal from "./workoutModals/ConfrimDeleteModal";
import ChangeDateModal from "./workoutModals/ChangeDateModal";
import AddNewExercisesModal from "./workoutModals/AddNewExercisesModal";

const defaultWorkout = {
  title: "workout-01",
  exercises: [],
};

interface WorkoutProps {
  initlWorkout?: any;
  editWorkout?: boolean;
}

export default function Workout({
  initlWorkout = defaultWorkout,
  editWorkout = false,
}: WorkoutProps) {
  const [workout, setWorkout] = useState<any>(initlWorkout);
  const [nameEdit, setNameEdit] = useState<boolean>(false);
  const [dbUpdating, setDbUpdateing] = useState<boolean>(false);
  const [dbDeleting, setDbDeleting] = useState<boolean>(false);

  // MODAL
  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);

  const router = useRouter();

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
    console.log(newWorkout);
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

  const saveWorkoutToDB = useCallback(() => {
    setDbUpdateing(true);
    axios
      .post("/api/workout", workout)
      .then(() => {
        console.log(workout, "hit api folder sucessifully");
        toast.success(`Workout Saved`);
        router.refresh();
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setDbUpdateing(false);
        setCompleteModalOpen(false);
      });
  }, [workout]);

  const updateWorkoutInDb = useCallback(() => {
    setDbUpdateing(true);
    console.log(workout);
    axios
      .post("/api/editWorkout", workout)
      .then(() => {
        toast.success(`Workout Updated`);
        router.refresh();
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setDbUpdateing(false);
      });
  }, [workout]);

  const deleteWorkout = useCallback(() => {
    setDbDeleting(true);
    axios
      .post("/api/deleteWorkout", { data: workout.id })
      .then(() => {
        toast.success(`Workout deleted`);
        router.push("/profile");
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        setDbDeleting(false);
        setDeleteModalOpen(false);
      });
  }, []);

  return (
    <>
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between mb-4">
          {!editWorkout && (
            <h1 className="font-bold text-center w-full text-2xl ">
              Create Workout
            </h1>
          )}

          {editWorkout && (
            <>
              <h1 className="font-bold text-center  text-2xl ">Edit Workout</h1>
              <div>
                {editWorkout && (
                  <div className="flex items-center">
                    <button
                      className={`btn btn-outline btn-success btn-xs px-2 py-1 
                    ${dbUpdating ? "loading btn-disabled" : ""}  `}
                      onClick={updateWorkoutInDb}
                    >
                      Save Changes
                    </button>
                    <button
                      className={`btn btn-outline btn-error btn-xs px-2 py-1  `}
                      onClick={() => setDeleteModalOpen(true)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex py-2 gap-2  justify-between items-center pr-2">
            <div>
              <div className="text-xs mb-1">workout name</div>
              {!nameEdit ? (
                <div className="font-bold text-xl">{workout?.title}</div>
              ) : (
                <input
                  className="font-bold text-xl bg-base-200  input-bordered input-primary "
                  value={workout?.title}
                  onChange={(e) => updateWorkoutInfo(e.target.value, "title")}
                />
              )}
            </div>
            <div>
              {!nameEdit ? (
                <button
                  className="btn btn-ghost"
                  onClick={() => setNameEdit(!nameEdit)}
                >
                  <AiTwotoneEdit className="text-xl cursor-pointer" />
                </button>
              ) : (
                <button
                  className="btn btn-ghost"
                  onClick={() => setNameEdit(!nameEdit)}
                >
                  <AiOutlineCheck className="text-xl cursor-pointer" />
                </button>
              )}
              <button
                className="btn btn-ghost"
                onClick={() => setDateModalOpen(true)}
              >
                <AiFillCalendar className="text-xl cursor-pointer" />
              </button>
            </div>
          </div>
          {workout.exercises.map((exercises: any, index: number) => {
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
              />
            );
          })}
        </div>
        <div className="my-2 flex flex-col w-full gap-2">
          <button
            className="btn-outline btn px-2 py-1   w-full"
            onClick={() => setExerciseModalOpen(true)}
          >
            add new exercise
          </button>
          {!editWorkout && (
            <button
              className={`btn btn-primary px-2 py-1  w-full ${
                workout.exercises?.length === 0 ? "btn-disabled" : ""
              } ${dbUpdating ? "loading btn-disabled" : ""}`}
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
        deleteWorkout={deleteWorkout}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
        dbUpdating={dbDeleting}
      />
      <ConfrimCompleteModal
        saveWorkoutToDB={saveWorkoutToDB}
        completeModalOpen={completeModalOpen}
        setCompleteModalOpen={setCompleteModalOpen}
        dbUpdating={dbUpdating}
      />
    </>
  );
}

// Need to create a useEFfect that will update this whenever the workout changes
// const updateLocalStorage = () => {
//   if (!editWorkout) {
//     window.localStorage.setItem(
//       "fit-track-current-workout",
//       JSON.stringify(workout)
//     );
//   }
// };

// useEffect(() => {
//   if (!editWorkout) {
//     const data = window.localStorage.getItem("fit-track-current-workout");
//     if (data) {
//       let reveredStr = JSON.parse(data);
//       setWorkout(reveredStr);
//       console.log(reveredStr);
//     }
//   }
// }, []);
