"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Exercise from "./Exercise";
import { AnyARecord } from "dns";
import getZottmanCurlExercises from "@/actions/getExerciseData";

const defaultWorkout = {
  title: "workout-01",
  exercises: [],
};

const muscleGroups = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

export default function Workout({ initlWorkout = defaultWorkout }: any) {
  const [workout, setWorkout] = useState<any>(initlWorkout);
  const [newExerciseModalOpen, setNewExerciseModalOpen] =
    useState<boolean>(false);

  const editWorkoutName = (newTitle: string) => {
    setWorkout((prevWorkout: any) => {
      return {
        ...prevWorkout,
        title: newTitle,
      };
    });
  };

  const saveNewWorkoutNameToDB = () => {
    const flattenedArray = workout.exercises.flatMap(
      (exercise: any) => exercise.sets
    );
    console.log(flattenedArray, "setsToKill edit");

    axios
      //   .post("/api/deleteSets", flattenedArray)
      .post("/api/editWorkout", workout)
      .then(() => {
        // console.log(workout, "hit api folder sucessifully FOR EDIT ROUT");
        //   toast.success('Listing created!');
        //   router.refresh();
        //   reset();
        //   setStep(STEPS.CATEGORY)
        //   rentModal.onClose();
      })
      .catch(() => {
        console.log("error");
        //   toast.error('Something went wrong.');
      })
      .finally(() => {
        //   setIsLoading(false);
      });
  };

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

  const addSet = (index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.push({ reps: 0, weight: 0 });
    setWorkout(newWorkout);
  };

  const removeSet = (idx: number, index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[index].sets.splice(idx, 1);
    setWorkout(newWorkout);
  };

  const saveWorkoutToDB = () => {
    console.log(workout);

    axios
      .post("/api/workout", workout)
      .then(() => {
        console.log(workout, "hit api folder sucessifully");
        //   toast.success('Listing created!');
        //   router.refresh();
        //   reset();
        //   setStep(STEPS.CATEGORY)
        //   rentModal.onClose();
      })
      .catch(() => {
        console.log("error");
        //   toast.error('Something went wrong.');
      })
      .finally(() => {
        //   setIsLoading(false);
      });
  };

  console.log(workout, "this");

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="font-bold text-3xl text-purple-500">Workout Journal</h1>
      <div className="flex gap-2 flex-col">
        {/* <div>{workout?.workoutTitle}</div> */}
        <div className="flex py-2">
          <input
            className="w-full border-2"
            value={workout?.title}
            onChange={(e) => editWorkoutName(e.target.value)}
          />
          <button
            onClick={() => saveNewWorkoutNameToDB()}
            className="btn btn-primary btn-sm"
          >
            update
          </button>
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
      <button
        className="bg-gray-500 btn px-2 py-1 text-white"
        onClick={() => setNewExerciseModalOpen(true)}
      >
        add new exercise
      </button>
      <AddExerciseModal
        setNewExerciseModalOpen={setNewExerciseModalOpen}
        newExerciseModalOpen={newExerciseModalOpen}
        addNewExercise={addNewExercise}
      />
      <button
        className="bg-purple-500 px-2 py-1 text-white"
        onClick={saveWorkoutToDB}
      >
        Save Workout to DB
      </button>
    </div>
  );
}

function AddExerciseModal({
  addNewExercise,
  setNewExerciseModalOpen,
  newExerciseModalOpen,
}: any) {
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
        checked={newExerciseModalOpen}
        id="my-modal-6"
        className="modal-toggle"
        readOnly
      />
      {/* <input type="checkbox" id="my-modal" className="modal-toggle" /> */}
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h3 className="font-bold text-lg">Add Exercise</h3>
            <button onClick={() => setNewExerciseModalOpen(false)}>X</button>
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
                  setNewExerciseModalOpen(false);
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
