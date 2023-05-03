import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { title, exercises } = body;

  console.log(exercises);

  const workout = await prisma.workout.create({
    data: {
      userId: currentUser.id,
      title: title,
      exercises: {
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          userId: currentUser.id,
          sets: {
            create: exercise.sets.map((set: any) => ({
              reps: set.reps,
              weight: set.weight,
              userId: currentUser.id,
            })),
          },
        })),
      },
    },
  });
  return NextResponse.json(workout);
}
