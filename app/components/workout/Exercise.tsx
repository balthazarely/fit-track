"use client";

import { useRouter } from "next/navigation";
import { HiX, HiDotsHorizontal } from "react-icons/hi";

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
      <div
        className="bg-base-200 rounded-md  px-4 py-2 flex justify-center items-center flex-col  "
        key={index}
      >
        <div className="flex w-full justify-between items-center ">
          <div className="font-bold text-sm">{exercises.name}</div>
          <div className="dropdown dropdown-bottom dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-sm ">
              <HiDotsHorizontal className="text-xl" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div
                  className="text-xs font-bold"
                  onClick={() => deleteExercise(index)}
                >
                  Remove Exercise
                </div>
              </li>
              <li>
                <div
                  className="text-xs font-bold"
                  onClick={() => linkToExcersiseHistory()}
                >
                  Exercise History
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="font-bold w-full flex gap-2 items-center mt-2  text-xs ">
          <div className="w-6 text-center ">set</div>
          <div className="w-16 text-center">lbs</div>
          <div className="w-16 text-center">reps</div>
          <div className="w-16 text-center">rpe</div>
        </div>

        {exercises.sets.map((set: any, idx: number) => (
          <div className="text-sm w-full flex gap-2 items-center " key={idx}>
            <div className="text-xs font-bold  rounded-full bg-base-100 flex justify-center items-center w-6 h-6">
              {idx + 1}
            </div>
            <input
              className="bg-base-100 h-10 w-16  text-center rounded-md"
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
              className="bg-base-100 h-10 w-16 text-center rounded-md"
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
                className="btn btn-ghost"
                onClick={() => removeSet(idx, index)}
              >
                <HiX />
              </button>
            </div>
          </div>
        ))}

        <button
          className="btn mt-2 w-full btn-sm btn-primary "
          onClick={() => addSet(index)}
        >
          add set
        </button>
      </div>
    </>
  );
}
