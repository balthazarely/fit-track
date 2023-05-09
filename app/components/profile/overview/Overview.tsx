"use client";

import moment from "moment";
import { FaRegGrinBeamSweat, FaWeightHanging } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

export default function Overview({ workouts }: any) {
  const totalWorkouts = workouts.length;
  const workoutsThisWeek = workouts.filter((workout: any) =>
    moment(workout.createdAt).isSame(new Date(), "week")
  ).length;

  const weightTotal = (workouts: any[]) => {
    let total = 0;
    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise: any) => {
        exercise.sets.forEach((set: any) => {
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
    <>
      <div className="text-xl font-bold mt-8">Recent Acomplishments</div>
      <div className="flex sm:justify-start justify-center">
        <div className="stats stats-vertical sm:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-figure text-primary">
              <GiWeightLiftingUp className="text-2xl" />
            </div>
            <div className="stat-title">Total Workouts</div>
            <div className="stat-value text-primary">{totalWorkouts}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaRegGrinBeamSweat className="text-2xl" />
            </div>
            <div className="stat-title">Workouts this week</div>
            <div className="stat-value text-primary">{workoutsThisWeek}</div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <FaWeightHanging className="text-2xl" />
            </div>
            <div className="stat-title">Weight lifted this week</div>
            <div className="stat-value text-primary">
              {weightTotal(workouts)}
            </div>
            {/* <div className="stat-desc">21% more than last month</div> */}
          </div>
        </div>
      </div>
    </>
  );
}
