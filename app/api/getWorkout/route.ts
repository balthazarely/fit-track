import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { id } = body;

  const foundWorkout = await prisma.workout.findUnique({
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

  if (!foundWorkout) {
    return {
      status: 404,
      body: "Workout not found",
    };
  }

  return NextResponse.json(foundWorkout);
}
