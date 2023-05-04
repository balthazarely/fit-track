"use client";

import { useRouter } from "next/navigation";

export default function Exercise({
  index,
  exercises,
  workout,
  setWorkout,
  addSet,
  removeSet,
  deleteExercise,
}: any) {
  const router = useRouter();

  const linkToExcersiseHistory = () => {
    router.push(`/history/${encodeURIComponent(exercises.name)}`);
  };

  return (
    <>
      <div className="bg-gray-100" key={index}>
        <div className="flex justify-between">
          <button onClick={linkToExcersiseHistory} className="font-bold">
            {exercises.name}
          </button>
          <button
            className="bg-purple-400 text-xs px-2 py-1 mt-2 text-white"
            onClick={() => deleteExercise(index)}
          >
            Del
          </button>
        </div>
        <div>
          {exercises.sets.map((set: any, idx: number) => (
            <div className="text-sm" key={idx}>
              <input
                className="border-2 border-gray-300 w-12"
                name="reps"
                type="number"
                placeholder="reps"
                value={set.reps}
                onChange={(event) => {
                  const newWorkout = { ...workout };
                  newWorkout.exercises[index].sets[idx].reps = parseInt(
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
                  newWorkout.exercises[index].sets[idx].weight = parseInt(
                    event.target.value
                  );
                  setWorkout(newWorkout);
                }}
              />
              <div>{set.id}</div>
              <button onClick={() => removeSet(idx, index)}>remove</button>
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
    </>
  );
}
