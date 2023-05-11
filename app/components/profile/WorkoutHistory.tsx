"use client";

import React from "react";
import RecentWorkouts from "./recentWorkouts/RecentWorkouts";
import ExerciseHistoryPanel from "./exerciseHistory/ExerciseHistoryPanel";
import Overview from "./overview/Overview";
import { Workout } from "@/types";
import { useSearchParams } from "next/navigation";

interface WorkoutHistoryProps {
  workouts?: Workout[] | any;
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const searchParams = useSearchParams();
  const page = searchParams?.get("tab");

  return (
    <div className="mt-4">
      <div className={`${page === "stats" ? "block" : "hidden"}`}>
        <Overview workouts={workouts} />
      </div>
      <div className={`${page === "recent-workouts" ? "block" : "hidden"}`}>
        <RecentWorkouts workouts={workouts} />
      </div>
      <div className={`${page === "exercise-history" ? "block" : "hidden"}`}>
        <ExerciseHistoryPanel />
      </div>
    </div>
  );
}
