import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type Workout = {
  createdAt: Date;
  createdAtFormatted: string;
  exercises: Exercises[];
  id: string;
  title: string;
  userId: string;
};

export type InitialWorkout = {
  exercises: any[];
  title: string;
  id?: string;
};

export type Exercises = {
  id: string;
  name: string;
  workoutId: string;
  userId: string;
  createdAt: string;
  sets: Sets[];
};

export type Sets = {
  id: string;
  reps: number;
  weight: number;
  rpe: null | number;
  exerciseId: string;
  userId: string;
  createdAt: string;
};

export type ExerciseApiResults = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};

export type ParesedExercisesData = {
  bestSet: { weight: number; reps: number };
  createdAt: string;
  oneRepMax: number;
  sets: Sets[];
  totalVolume: number;
};

export type WorkoutTemplates = {
  name: string;
  id: string;
  description: string;
};
