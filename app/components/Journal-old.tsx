"use client";
import { useState } from "react";

const initWorkout = {
  name: "workout-01",
  exercises: [
    {
      name: "Bench Press",
      sets: [
        { reps: 10, weight: 200 },
        { reps: 9, weight: 200 },
        { reps: 11, weight: 200 },
      ],
    },
    {
      name: "Lat Pulldown",
      sets: [
        { reps: 12, weight: 150 },
        { reps: 11, weight: 150 },
        { reps: 11, weight: 160 },
      ],
    },
  ],
};

export default function journal() {
  const [workout, setWorkout] = useState<any>(initWorkout);
  const [newExercise, setNewExercise] = useState({
    name: "",
    sets: [{ reps: 0, weight: 0 }],
  });

  const handleSetChange = (idx: number, field: string, value: number) => {
    const updatedSets: any = [...newExercise.sets];
    updatedSets[idx][field] = value;
    setNewExercise({
      ...newExercise,
      sets: updatedSets,
    });
  };

  const addSet = () => {
    setNewExercise({
      ...newExercise,
      sets: [...newExercise.sets, { reps: 0, weight: 0 }],
    });
  };

  const removeSet = (idx: number) => {
    const updatedSets = [...newExercise.sets];
    updatedSets.splice(idx, 1);
    setNewExercise({
      ...newExercise,
      sets: updatedSets,
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="font-bold text-3xl text-purple-500">Workout Journal</h1>
      <div className="flex gap-2 flex-col">
        {workout.exercises.map((exercises: any) => {
          return (
            <div className="bg-gray-100 ">
              <div>{exercises.name}</div>
              <div>
                {exercises.sets.map((set: any) => (
                  <div className="text-sm">
                    {set.reps} reps - {set.weight} lbs
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <AddExercise
        newExercise={newExercise}
        setNewExercise={setNewExercise}
        addSet={addSet}
        removeSet={removeSet}
        handleSetChange={handleSetChange}
      />
    </div>
  );
}

function AddExercise({
  newExercise,
  setNewExercise,
  addSet,
  removeSet,
  handleSetChange,
}: any) {
  return (
    <div>
      {JSON.stringify(newExercise)}
      <div className="mt-12 flex flex-col gap-2">
        <input
          className="border-2 border-gray-300 w-48"
          name="exercise-name"
          type="text"
          value={newExercise.name}
          onChange={(e) =>
            setNewExercise((prevState: any) => ({
              ...prevState,
              name: e.target.value,
            }))
          }
          placeholder="exercise-name"
        />
        {newExercise.sets.map((set: any, idx: number) => (
          <div className="flex gap-2">
            <div className="text-xs">set {idx}:</div>
            <input
              className="border-2 border-gray-300 w-12"
              name="reps"
              type="number"
              placeholder="reps"
              value={set.reps}
              onChange={(e) =>
                handleSetChange(idx, "reps", parseInt(e.target.value))
              }
            />
            <input
              className="border-2 border-gray-300  w-16"
              name="weight"
              type="number"
              placeholder="weight"
              value={set.weight}
              onChange={(e) =>
                handleSetChange(idx, "weight", parseInt(e.target.value))
              }
            />
            <button onClick={() => removeSet(idx)}>remove</button>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <button
          onClick={addSet}
          className="mt-2 text-xs bg-purple-500 px-2 py-1 text-white "
        >
          add set
        </button>
      </div>
    </div>
  );
}
