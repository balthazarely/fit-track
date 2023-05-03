"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const initWorkout = {
  workoutName: "workout-01",
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

export default function journal() {
  const [workout, setWorkout] = useState<any>(initWorkout);
  const [newExerciseModalOpen, setNewExerciseModalOpen] =
    useState<boolean>(false);

  const addNewExercise = (exerciseName: string) => {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        {
          name: exerciseName,
          Sets: [{ reps: 0, weight: 0 }],
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
    newWorkout.exercises[index].Sets.push({ reps: 0, weight: 0 });
    setWorkout(newWorkout);
  };

  const removeSet = (idx: number, index: number) => {
    const newWorkout = { ...workout };
    newWorkout.exercises[index].Sets.splice(idx, 1);
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

  return (
    <div className="max-w-xl mx-auto px-4">
      {/* {JSON.stringify(workout)} */}

      <h1 className="font-bold text-3xl text-purple-500">Workout Journal</h1>
      <div className="flex gap-2 flex-col">
        {workout.exercises.map((exercises: any, index: number) => {
          return (
            <div className="bg-gray-100" key={index}>
              <div className="flex justify-between">
                <div>{exercises.name}</div>
                <button
                  className="bg-purple-400 text-xs px-2 py-1 mt-2 text-white"
                  onClick={() => deleteExercise(index)}
                >
                  Del
                </button>
              </div>
              <div>
                {exercises.Sets.map((set: any, idx: number) => (
                  <div className="text-sm" key={idx}>
                    <input
                      className="border-2 border-gray-300 w-12"
                      name="reps"
                      type="number"
                      placeholder="reps"
                      value={set.reps}
                      onChange={(event) => {
                        const newWorkout = { ...workout };
                        newWorkout.exercises[index].Sets[idx].reps = parseInt(
                          event.target.value
                        );
                        setWorkout(newWorkout);
                      }}
                    />
                    <input
                      className="border-2 border-gray-300  w-16"
                      name="weight"
                      type="number"
                      placeholder="weight"
                      value={set.weight}
                      onChange={(event) => {
                        const newWorkout = { ...workout };
                        newWorkout.exercises[index].Sets[idx].weight = parseInt(
                          event.target.value
                        );
                        setWorkout(newWorkout);
                      }}
                    />
                    <button onClick={() => removeSet(idx, index)}>
                      remove
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="bg-purple-400 text-xs px-2 py-1 mt-2 text-white "
                onClick={() => addSet(index)}
              >
                add set
              </button>
            </div>
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
          {apiResults.map((result: any) => (
            <button
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
