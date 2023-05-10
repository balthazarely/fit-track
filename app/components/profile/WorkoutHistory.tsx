"use client";

import React, { useState } from "react";
import RecentWorkouts from "./recentWorkouts/RecentWorkouts";
import ExerciseHistoryPanel from "./exerciseHistory/ExerciseHistoryPanel";
import Overview from "./overview/Overview";
import { Workout } from "@/types";

interface WorkoutHistoryProps {
  workouts?: Workout[] | any;
}

export default function WorkoutHistory({ workouts }: WorkoutHistoryProps) {
  const [tabSelected, setTabSelected] = useState("Recent Workouts");
  const menuTabs = ["Recent Workouts", "Stats", "Exercise History"];

  return (
    <div className="mt-4">
      <div className="tabs tabs-boxed">
        {menuTabs.map((item: string, idx: number) => (
          <button key={idx} onClick={() => setTabSelected(item)}>
            <div
              className={`tab tab-lifted   ${
                tabSelected === item ? "tab-active  " : ""
              }`}
            >
              {item}
            </div>
          </button>
        ))}
      </div>
      <div className={`${tabSelected === "Stats" ? "block" : "hidden"}`}>
        <Overview workouts={workouts} />
      </div>
      <div
        className={`${tabSelected === "Recent Workouts" ? "block" : "hidden"}`}
      >
        <RecentWorkouts workouts={workouts} />
      </div>
      <div
        className={`${tabSelected === "Exercise History" ? "block" : "hidden"}`}
      >
        <ExerciseHistoryPanel />
      </div>
    </div>
  );
}
