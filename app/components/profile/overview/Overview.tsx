"use client";

import { BiDumbbell } from "react-icons/bi";
import moment from "moment";
import { FaRegGrinBeamSweat, FaWeightHanging } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Exercises, Sets, Workout } from "@/types";

interface OverviewProps {
  workouts: Workout[];
}

type DaysWithWorkoutBoolean = {
  dayName: string;
  hasWorkout: boolean;
};

export default function Overview({ workouts }: OverviewProps) {
  const totalWorkouts = workouts.length;

  const workoutsThisWeek = workouts.filter((workout: Workout) => {
    const workoutDate = moment(workout.createdAt);
    const startOfWeek = moment().startOf("week").add(1, "day");
    const endOfWeek = moment().endOf("week").add(1, "day");
    return workoutDate.isBetween(startOfWeek, endOfWeek, null, "[]");
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const workoutsWithDayOfWeek = workoutsThisWeek.map((workout: Workout) => ({
    createdAt: moment(workout.createdAt).format("dddd") || "No date available",
  }));

  const daysWithWorkouts = daysOfWeek.map((day) => {
    const hasWorkout = workoutsWithDayOfWeek.some(
      (workout: { createdAt: string }) => workout.createdAt === day
    );
    return {
      dayName: day,
      hasWorkout: hasWorkout,
    };
  });

  const weightTotal = (workouts: Workout[]) => {
    let total = 0;
    workoutsThisWeek.forEach((workout) => {
      workout.exercises.forEach((exercise: Exercises) => {
        exercise.sets.forEach((set: Sets) => {
          total += set.weight * set.reps;
        });
      });
    });
    const formattedTotal = total
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedTotal;
  };

  return (
    <div className=" mt-4 ">
      <div className="text-xl font-bold mt-6">Recent Acomplishments</div>
      <div className="flex sm:justify-start justify-center ">
        <div className="stats stats-vertical sm:stats-horizontal shadow ">
          <div className="stat  bg-base-200  ">
            <div className="stat-figure text-primary">
              <GiWeightLiftingUp className="text-2xl" />
            </div>
            <div className="stat-title text-sm">Total Workouts</div>
            <div className="stat-value text-primary">{totalWorkouts}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat  bg-base-200">
            <div className="stat-figure text-primary">
              <FaRegGrinBeamSweat className="text-2xl" />
            </div>
            <div className="stat-title text-sm">Workouts this week</div>
            <div className="stat-value text-primary">
              {workoutsThisWeek.length}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat  bg-base-200">
            <div className="stat-figure text-primary">
              <FaWeightHanging className="text-2xl" />
            </div>
            <div className="stat-title text-sm">
              Total weight lifted this week
            </div>
            <div className="stat-value text-primary">
              {weightTotal(workouts)} <span className="text-xs">lbs</span>
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
        </div>
      </div>
      <div className="flex sm:justify-start justify-center mt-3">
        <div className="stats stats-vertical sm:stats-horizontal  shadow">
          <div className="stat  bg-base-200">
            <div className="stat-title">Weekly Progress</div>
            <div className="flex sm:flex-row flex-col gap-2 mt-1">
              {daysWithWorkouts.map(
                (day: DaysWithWorkoutBoolean, idx: number) => (
                  <div
                    className="p-1 flex justify-end flex-col items-center"
                    key={idx}
                  >
                    {day.hasWorkout ? (
                      <BiDumbbell className="text-3xl text-primary" />
                    ) : (
                      <HiX className="text-3xl text-base-300" />
                    )}
                    <div className="text-xs">{day.dayName}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
