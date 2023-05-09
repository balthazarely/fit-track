"use client";

import { useState } from "react";
import moment from "moment";
import WorkoutCard from "./recentWorkouts/RecentWorkoutCard";

export default function WorkoutHistoryFull({ workouts }: any) {
  const [selectedDay, setSelectedDay] = useState<any>("");

  const sortWorkouts = (workouts: any) =>
    workouts.sort((a: any, b: any) =>
      moment(b.createdAt, "DD-MM-YYYY").diff(moment(a.createdAt, "DD-MM-YYYY"))
    );

  return (
    <div className="my-4">
      <div className="my-4 flex flex-col sm:flex-row gap-4 justify-between h-72">
        <div className="w-full flex justify-between flex-col  ">
          <div>
            {selectedDay !== "" && (
              <div className="font-bold  text-sm flex justify-between p-2 mb-1">
                {moment(selectedDay).format("dddd DD/YYYY")}
                <button
                  className="btn btn-neutral btn-xs"
                  onClick={() => setSelectedDay("")}
                >
                  clear
                </button>
              </div>
            )}
            {sortWorkouts(workouts)
              .filter((workout: any) => {
                if (selectedDay !== "") {
                  return workout.createdAtFormatted === selectedDay;
                } else {
                  return workout;
                }
              })
              .map((workout: any) => {
                return <WorkoutCard workout={workout} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
