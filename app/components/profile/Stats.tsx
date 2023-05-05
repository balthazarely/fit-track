"use client";

import moment from "moment";

export default function Stats({ myWorkouts }: any) {
  console.log(myWorkouts);

  const totalWorkouts = myWorkouts.length;
  const workoutsThisWeek = myWorkouts.filter((workout: any) =>
    moment(workout.createdAt).isSame(new Date(), "week")
  ).length;

  return (
    <div className="flex sm:justify-start justify-center">
      <div className="stats stats-vertical sm:stats-horizontal shadow my-4">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Workouts</div>
          <div className="stat-value text-primary">{totalWorkouts}</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Workouts this week</div>
          <div className="stat-value text-secondary">{workoutsThisWeek}</div>
          {/* <div className="stat-desc">21% more than last month</div> */}
        </div>
      </div>
    </div>
  );
}
