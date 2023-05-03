import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const body = await request.json();
  const { workoutName, exercises } = body;

  const exercisesTest = [
    {
      name: "Deadlift",
      Sets: [
        { reps: 10, weight: 0 },
        { reps: 12, weight: 0 },
        { reps: 15, weight: 0 },
      ],
    },
    {
      /// NOTE: the sets must be Sets
      name: "Barbell Row",
      Sets: [
        { reps: 8, weight: 50 },
        { reps: 10, weight: 50 },
        { reps: 12, weight: 50 },
      ],
    },
  ];
  console.log(exercisesTest, "exercisesTest");
  console.log(exercises, "exercises");

  const workout = await prisma.workout.create({
    data: {
      userId: currentUser.id,
      title: "Quad Daddy",
      exercises: {
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          //   sets: exercise.sets,
          Sets: {
            create: exercise.Sets.map((set: any) => ({
              reps: set.reps,
              weight: set.weight,
            })),
          },
        })),
      },
    },
  });
  return NextResponse.json(workout);
}
