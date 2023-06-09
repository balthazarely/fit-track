import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { title, exercises, createdAt } = body;

  const workout = await prisma.workout.create({
    data: {
      userId: currentUser.id,
      title: title,
      createdAt: createdAt,
      exercises: {
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          userId: currentUser.id,
          createdAt: createdAt,
          sets: {
            create: exercise.sets.map((set: any) => ({
              reps: set.reps,
              weight: set.weight,
              rpe: set.rpe,
              userId: currentUser.id,
              createdAt: createdAt,
            })),
          },
        })),
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  return NextResponse.json(workout);
}
