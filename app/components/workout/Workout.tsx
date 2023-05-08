"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Exercise from "./Exercise";
import toast from "react-hot-toast";
import { AiTwotoneEdit, AiOutlineCheck, AiFillCalendar } from "react-icons/ai";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { muscleGroups } from "@/utils/muscleGroups";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal, HiX } from "react-icons/hi";
import MemoTest from "./MemoTest";

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
  const [workoutEditted, setWorkoutEditted] = useState<boolean>(false);
  const [dbUpdating, setDbUpdateing] = useState<boolean>(false);

  // MODAL
  const [exerciseModalOpen, setExerciseModalOpen] = useState<boolean>(false);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [completeModalOpen, setCompleteModalOpen] = useState<boolean>(false);

  /// TES
  // const [testModalOpen, setTestModalOpen] = useState<boolean>(false);
  const [value, setvalue] = useState<string>("ttesttest");

  const router = useRouter();

  // const toggleDateModal = useCallback(() => {
  //   setDateModalOpen(!dateModalOpen);
  // }, []);

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
    setWorkoutEditted(true);
  };

  const deleteExercise = (index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises.splice(index, 1);
    setWorkout(newWorkout);
    setWorkoutEditted(true);
  };

  const updateWorkoutInfo = (value: any, field: string) => {
    const newWorkout = { ...workout };
    newWorkout[field] = value;
    setWorkout(newWorkout);
    console.log(newWorkout);

    setWorkoutEditted(true);
  };

  const addSet = (index: number) => {
    const prevWeightReps = workout.exercises[index].sets.slice(-1)[0];
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.push({
      reps: prevWeightReps?.reps || 0,
      weight: prevWeightReps?.weight || 0,
    });
    setWorkout(newWorkout);
    setWorkoutEditted(true);
  };

  const removeSet = (idx: number, index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.splice(idx, 1);
    setWorkout(newWorkout);
    setWorkoutEditted(true);
  };

  const saveWorkoutToDB = () => {
    console.log(workout);

    setDbUpdateing(true);
    axios
      .post("/api/workout", workout)
      .then(() => {
        console.log(workout, "hit api folder sucessifully");
        toast.success(`Workout Saved`);
        //   router.refresh();
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setWorkoutEditted(false);
        setDbUpdateing(false);
        setCompleteModalOpen(false);
      });
  };

  const updateWorkoutInDb = () => {
    setDbUpdateing(true);
    axios
      .post("/api/editWorkout", workout)
      .then(() => {
        toast.success(`Workout Updated`);
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setWorkoutEditted(false);
        setDbUpdateing(false);
      });
  };

  const deleteWorkout = () => {
    setDbUpdateing(true);
    axios
      .post("/api/deleteWorkout", { data: workout.id })
      .then(() => {
        router.push("/workouts");
        toast.success(`Workout deleted`);
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        setDbUpdateing(false);
        setDeleteModalOpen(false);
      });
  };

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

  return (
    <>
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between mb-4">
          {/* <button onClick={() => setvalue("new text")}>change memo text</button> */}
          {/* <MemoTest value={value} /> */}
          <h1 className="font-bold text-2xl ">
            {editWorkout ? "Edit Workout" : "Create Workout"}
          </h1>
          {editWorkout && (
            <div className="flex items-center">
              <button
                className={`btn btn-primary px-2 py-1 
              ${dbUpdating ? "loading btn-disabled" : ""} 
              ${workoutEditted ? "" : "btn-disabled"}`}
                onClick={updateWorkoutInDb}
              >
                Save Changes
              </button>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost  ">
                  <HiDotsHorizontal className="text-xl" />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <div
                      className="text-xs font-bold"
                      onClick={() => setDeleteModalOpen(true)}
                    >
                      Delete Workout
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 flex-col">
          <div className="flex py-2 gap-2  justify-between items-center pr-2">
            {!nameEdit ? (
              <div className="font-bold text-xl p-2">{workout?.title}</div>
            ) : (
              <input
                className="font-bold text-xl bg-base-200 p-2 input-bordered input-primary "
                value={workout?.title}
                onChange={(e) => updateWorkoutInfo(e.target.value, "title")}
              />
            )}
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

        <AddExerciseModal
          setExerciseModalOpen={setExerciseModalOpen}
          exerciseModalOpen={exerciseModalOpen}
          addNewExercise={addNewExercise}
        />
        {/* <TestModal
          testModalOpen={testModalOpen}
          setTestModalOpen={setTestModalOpen}
        /> */}
        <ChangeDateModal
          dateModalOpen={dateModalOpen}
          setDateModalOpen={setDateModalOpen}
          workout={workout}
          updateWorkoutInfo={updateWorkoutInfo}
        />
        <ConfrimDeleteModal
          deleteModalOpen={deleteModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          dbUpdating={dbUpdating}
          deleteWorkout={deleteWorkout}
        />
        <ConfrimCompleteModal
          completeModalOpen={completeModalOpen}
          setCompleteModalOpen={setCompleteModalOpen}
          dbUpdating={dbUpdating}
          saveWorkoutToDB={saveWorkoutToDB}
        />
      </div>
    </>
  );
}

function TestModal({ testModalOpen, setTestModalOpen }: any) {
  console.log("TestModal rerender");
  return (
    <>
      <input
        type="checkbox"
        checked={testModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div className="modal left-0 lg:left-56 absolute">
        <div className="modal-box relative flex justify-center items-center">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setTestModalOpen(false)}
          >
            <HiX />
          </button>
          <div>ttest</div>
        </div>
      </div>
    </>
  );
}

function ConfrimCompleteModal({
  completeModalOpen,
  setCompleteModalOpen,
  dbUpdating,
  saveWorkoutToDB,
}: any) {
  console.log("ConfrimCompleteModal rerender");

  return (
    <>
      <input
        type="checkbox"
        checked={completeModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div className="modal left-0 lg:left-56 absolute">
        <div className="modal-box flex flex-col justify-center items-center relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setCompleteModalOpen(false)}
          >
            <HiX />
          </button>
          <div className="mb-2 text-xl">
            Are you sure you want to finish this workout?
          </div>
          <button
            className={`btn btn-primary px-2 py-1 
              ${dbUpdating ? "loading" : ""}`}
            onClick={saveWorkoutToDB}
          >
            Complete
          </button>
        </div>
      </div>
    </>
  );
}

function ConfrimDeleteModal({
  deleteModalOpen,
  setDeleteModalOpen,
  dbUpdating,
  deleteWorkout,
}: any) {
  console.log("ConfrimDeleteModal rerender");
  return (
    <>
      <input
        type="checkbox"
        checked={deleteModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div className="modal left-0 lg:left-56 absolute">
        <div className="modal-box flex flex-col justify-center items-center relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setDeleteModalOpen(false)}
          >
            <HiX />
          </button>
          <div className="mb-2 text-xl">
            Are you sure you want to delete this workout?{" "}
          </div>
          <button
            className={`btn btn-primary px-2 py-1 
              ${dbUpdating ? "loading" : ""}`}
            onClick={deleteWorkout}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

function ChangeDateModal({
  dateModalOpen,
  setDateModalOpen,
  workout,
  updateWorkoutInfo,
}: any) {
  console.log("ChangeDateModal rerender");
  return (
    <>
      <input
        type="checkbox"
        checked={dateModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      <div className="modal left-0 lg:left-56 absolute">
        <div className="modal-box relative flex justify-center items-center">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setDateModalOpen(false)}
          >
            <HiX />
          </button>
          <Calendar
            date={workout.createdAt}
            onChange={(date) => updateWorkoutInfo(date, "createdAt")}
            // onChange={(date) => updateDate(date)}
          />
        </div>
      </div>
    </>
  );
}

function AddExerciseModal({
  addNewExercise,
  setExerciseModalOpen,
  exerciseModalOpen,
}: any) {
  console.log("AddExerciseModal rerender");
  const key = process.env.NEXT_PUBLIC_API_NINJA_API_KEY;
  const [selectedMuscleGroup, setSelectedMuscleGroups] = useState("");
  const [selectedExercise, setSelectedExercise] = useState();
  const [apiResults, setApiResults] = useState([]);

  function handleSelectChange(event: any) {
    setSelectedMuscleGroups(event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleGroup}`,
        {
          headers: {
            "X-Api-Key": key!,
          },
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      setApiResults(jsonData);
    };

    if (selectedMuscleGroup) {
      fetchData();
    }
  }, [selectedMuscleGroup]);

  return (
    <>
      <input
        type="checkbox"
        checked={exerciseModalOpen}
        id="my-modal-6"
        className="modal-toggle relative"
        readOnly
      />
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
      <div className="modal left-0 lg:left-56 absolute">
        <div className="modal-box relative">
          <button
            className="absolute top-2 right-2 btn btn-sm btn-ghost"
            onClick={() => setExerciseModalOpen(false)}
          >
            <HiX />
          </button>
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Add Exercise</h3>
          </div>
          <select
            value={selectedMuscleGroup}
            onChange={handleSelectChange}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled value="">
              Choose Muscle Group
            </option>
            {muscleGroups.map((group: string) => (
              <option key={group}>{group}</option>
            ))}
          </select>
          {apiResults.map((result: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedExercise(result.name)}
              className={`${
                selectedExercise === result.name && "bg-purple-500 text-white "
              } border-2 border-gray-100 py-1 px-2 cursor-pointer `}
            >
              {result.name}
            </button>
          ))}

          <div className="modal-action">
            <button
              className="bg-purple-500 btn px-2 py-1 text-white"
              onClick={() => {
                if (selectedExercise) {
                  addNewExercise(selectedExercise);
                  setExerciseModalOpen(false);
                }
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
