"use client";

import Link from "next/link";

export default function WorkoutCard({ workout }: any) {
  return (
    <div>
      <Link className="flex flex-col" href={`workout/${workout.id}`}>
        {workout.title} + {JSON.stringify(workout.createdAt)}
      </Link>
    </div>
  );
}
