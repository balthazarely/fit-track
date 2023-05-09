"use client";

import Workout from "@/components/workout/Workout";
import { workoutTemplates } from "@/utils/workoutTemplates";

type Params = {
  id: string;
};

export default function NewWorkout({ params: { id } }: { params: Params }) {
  let selectedWorkout = null;
  for (const key in workoutTemplates) {
    if (workoutTemplates.hasOwnProperty(key)) {
      const workout = workoutTemplates[key];
      if (workout.id === id) {
        selectedWorkout = workout;
        break;
      }
    }
  }

  return <Workout initlWorkout={selectedWorkout} />;
}
