"use client";

import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { FaWeightHanging } from "react-icons/fa";
import { workoutTemplates } from "@/utils/workoutTemplates";
import WorkoutCard from "../UI/WorkoutCard";

export default function WorkoutHistoryFull({ workouts }: any) {
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

  const limitTotalWorkouts = (workouts: any) =>
    selectedDay === "" ? workouts.slice(0, 5) : workouts;

  return (
    <div className="my-4">
      <div className="my-4 flex flex-col sm:flex-row gap-4 justify-between h-72">
        <div className="flex justify-center">
          <Calendar
            onChange={handleCalendarChange}
            value={value}
            tileClassName={tileClassName}
          ></Calendar>
        </div>
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
            {limitTotalWorkouts(workouts)
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
