"use client";

export default function MyWorkouts({ workoutSingle }: any) {
  return <div className="mt-16">{JSON.stringify(workoutSingle)}</div>;
}
