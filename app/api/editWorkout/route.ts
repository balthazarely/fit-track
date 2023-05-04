import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  const body = await request.json();
  const { title, createdAt, id, exercises } = body;
  console.log(title, id, exercises);

  const existingWorkout = await prisma.workout.findUnique({
    where: {
      id: id,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (!existingWorkout) {
    return {
      status: 404,
      body: "Workout not found",
    };
  }

  await prisma.sets.deleteMany({
    where: {
      exerciseId: {
        in: existingWorkout.exercises.map((exercise) => exercise.id),
      },
    },
  });

  await prisma.exercise.deleteMany({
    where: {
      workoutId: existingWorkout.id,
    },
  });

  const workout = await prisma.workout.update({
    where: { id: id },
    data: {
      title: title,
      exercises: {
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          userId: currentUser?.id,
          sets: {
            create: exercise.sets.map((set: any) => ({
              reps: set.reps,
              weight: set.weight,
              userId: currentUser?.id,
              createdAt: createdAt,
            })),
          },
        })),
      },
    },
  });

  return NextResponse.json(workout);
}
