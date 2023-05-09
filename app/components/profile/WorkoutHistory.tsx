"use client";

import React, { useState } from "react";
import RecentWorkouts from "./recentWorkouts/RecentWorkouts";
import ExerciseHistoryPanel from "./exerciseHistory/ExerciseHistoryPanel";
import Overview from "./overview/Overview";

export default function WorkoutHistory({ workouts }: any) {
  const [tabSelected, setSelectedTab] = useState("Overview");

  const menuTabs = ["Overview", "Recent Workouts", "Exercise History"];

  return (
    <div className="mt-4">
      <div className="tabs">
        {menuTabs.map((item: any) => (
          <button onClick={() => setSelectedTab(item)}>
            <a
              className={`tab tab-bordered ${
                tabSelected === item ? "tab-active" : ""
              }`}
            >
              {item}
            </a>
          </button>
        ))}
      </div>
      <div className={`${tabSelected === "Overview" ? "block" : "hidden"}`}>
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
