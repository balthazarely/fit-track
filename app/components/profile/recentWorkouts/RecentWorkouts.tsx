"use client";

import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import RecentWorkoutCard from "./RecentWorkoutCard";
import { Workout } from "@prisma/client";

interface RecentWorkoutsProps {
  workouts: Workout[];
}

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  const [value, onChange] = useState<any>(new Date());
  const [selectedDay, setSelectedDay] = useState<any>("");

  function tileClassName({ date }: any) {
    const formattedDate = moment(date).format("MM/DD/YYYY");
    const formattedDates = workouts.map((day: any) => day.createdAtFormatted);
    if (formattedDates.includes(formattedDate)) {
      return "highlight";
    } else {
      return "custom-tile";
    }
  }

  function handleCalendarChange(value: any) {
    const formattedDate = moment(value).format("MM/DD/YYYY");
    setSelectedDay(formattedDate);
  }

  const limitAndSortTotalWorkouts = (workouts: any) =>
    workouts
      .sort((a: any, b: any) =>
        moment(b.createdAt, "DD-MM-YYYY").diff(
          moment(a.createdAt, "DD-MM-YYYY")
        )
      )
      .slice(0, 4);

  return (
    <div className="my-6">
      <div className="text-xl font-bold">Recent Workouts</div>
      <div className="my-4 flex flex-col sm:flex-row gap-4 justify-between h-72">
        <div className="flex justify-center">
          <Calendar
            onChange={handleCalendarChange}
            value={value}
            tileClassName={tileClassName}
          ></Calendar>
        </div>
        {workouts.length > 0 ? (
          <>
            <div className="w-full flex justify-between flex-col   ">
              <div>
                {selectedDay !== "" && (
                  <div className="font-bold  text-sm flex justify-between p-2 mb-1">
                    {moment(selectedDay).format("dddd DD/YYYY")}
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => setSelectedDay("")}
                    >
                      clear
                    </button>
                  </div>
                )}
                {limitAndSortTotalWorkouts(workouts)
                  .filter((workout: any) => {
                    if (selectedDay !== "") {
                      return workout.createdAtFormatted === selectedDay;
                    } else {
                      return workout;
                    }
                  })
                  .map((workout: any, idx: number) => {
                    return <RecentWorkoutCard key={idx} workout={workout} />;
                  })}
              </div>
              <div className="w-full flex justify-center my-4">
                <Link href={"/profile/workouts"}>
                  <button className="btn btn-primary btn-sm ">
                    See all {workouts.length} workouts
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full text-xl  h-full flex justify-center items-center">
            No workouts yet
          </div>
        )}
      </div>
    </div>
  );
}
