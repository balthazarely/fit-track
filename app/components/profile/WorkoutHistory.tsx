"use client";

import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

export default function WorkoutHistory({ workouts }: any) {
  const [value, onChange] = useState<any>(new Date());
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  //   console.log(workouts);

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
    console.log(formattedDate);
    console.log(workouts[0].createdAtFormatted);

    setSelectedDay(value);
    let target = workouts.filter(
      (workout: any) => workout.createdAtFormatted === formattedDate
    );
    setSelectedWorkout(target);
  }

  return (
    <div>
      <div className="text-2xl">Recent Workouts</div>
      {workouts?.map((workout: any) => (
        <WorkoutCard workout={workout} />
      ))}
      <Calendar
        onChange={handleCalendarChange}
        value={value}
        tileClassName={tileClassName}
      ></Calendar>
      {JSON.stringify(selectedWorkout)}
      {/* {workouts.filter((workout: any) => {
        return workout.createdAtFormatted === selectedDay;
      })} */}
      {selectedDay && (
        <div>Selected day: {moment(selectedDay).format("MM/DD/YYYY")}</div>
      )}
    </div>
  );
}

function WorkoutCard({ workout }: any) {
  return (
    <div className="border-2">
      <Link className="" href={`workout/${workout.id}`}>
        <div>{workout.title}</div>
      </Link>
      <div>
        {workout.exercises.map((exercises: any) => (
          <div>
            {exercises.sets.length} x {exercises.name}
          </div>
        ))}
      </div>
    </div>
  );
}
