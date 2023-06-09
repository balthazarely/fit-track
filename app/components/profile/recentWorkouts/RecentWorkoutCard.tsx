"use client";

import { FaWeightHanging } from "react-icons/fa";
import Link from "next/link";
import moment from "moment";
import ShowWorkoutModal from "../modals/ShowWorkoutModal";
import { useState } from "react";
import { Exercises, Sets, Workout } from "@/types";

interface RecentWorkoutCardProps {
  workout: Workout;
}

export default function RecentWorkoutCard({ workout }: RecentWorkoutCardProps) {
  const [showWorkoutModal, setShowWorkoutModal] = useState<boolean>(false);
  const formattedDate = moment(workout.createdAt).format("dddd MM/DD");
  const weightTotal = workout.exercises.reduce(
    (total: number, exercise: Exercises) => {
      exercise.sets.forEach((set: Sets) => {
        total += set.weight * set.reps;
      });
      return total;
    },
    0
  );

  return (
    <>
      <div className=" p-3  rounded-lg hover:bg-base-200 ">
        <div className="flex justify-between">
          <div>
            <div className="font-bold text-sm text-primary">
              {workout.title}
            </div>
            <div className="flex gap-4">
              <div className="text-sm">{formattedDate}</div>
              <div className="text-sm flex items-center gap-1">
                <FaWeightHanging className="text-xs" />
                {weightTotal} lb
              </div>
            </div>
          </div>
          <div className="flex items-center  btn-group">
            <button
              onClick={() => setShowWorkoutModal(true)}
              className="btn btn-xs btn-outline"
            >
              View
            </button>

            <button className="btn btn-xs btn-outline">
              <Link href={`workout/${workout.id}`}>Edit</Link>
            </button>
          </div>
        </div>
      </div>
      <ShowWorkoutModal
        workoutId={workout.id}
        showWorkoutModal={showWorkoutModal}
        setShowWorkoutModal={setShowWorkoutModal}
      />
    </>
  );
}
