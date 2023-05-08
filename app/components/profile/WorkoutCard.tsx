"use client";
import { FaWeightHanging } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";

export default function WorkoutCard({ workout }: any) {
  const formattedDate = moment(workout.createdAt).format("dddd MM/DD");
  const weightTotal = workout.exercises.reduce((total: any, exercise: any) => {
    exercise.sets.forEach((set: any) => {
      total += set.weight * set.reps;
    });
    return total;
  }, 0);

  return (
    <div className=" p-3 rounded-lg">
      <Link className="" href={`workout/${workout.id}`}>
        <div className="font-bold text-sm">{workout.title}</div>
      </Link>
      <div className="flex gap-4">
        <div className="text-sm">{formattedDate}</div>
        <div className="text-sm flex items-center gap-1">
          <FaWeightHanging className="text-xs" />
          {weightTotal} lb
        </div>
      </div>

      {/* <div>
          {workout.exercises.map((exercises: any) => (
            <div>
              {exercises.sets.length} x {exercises.name}
            </div>
          ))}
        </div> */}
    </div>
  );
}
