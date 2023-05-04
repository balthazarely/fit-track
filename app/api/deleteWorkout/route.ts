import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const id = body.data;
  console.log(id);

  try {
    const workout = await prisma.workout.findUnique({
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

    if (!workout) {
      return {
        status: 404,
        body: "Workout not found",
      };
    }

    await prisma.sets.deleteMany({
      where: {
        exerciseId: {
          in: workout.exercises.map((exercise) => exercise.id),
        },
      },
    });

    await prisma.exercise.deleteMany({
      where: {
        workoutId: workout.id,
      },
    });

    // await prisma.workout.delete({
    //   where: {
    //     id: workout.id,
    //   },
    // });

    return {
      status: 200,
      body: "Workout and associated exercises and sets deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: "Internal server error",
    };
  }
}
