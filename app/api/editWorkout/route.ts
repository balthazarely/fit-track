import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const { title, id, exercises } = body;
  const setsforDeleting = exercises.flatMap((exercise: any) => exercise.sets);

  const currentUser = await getCurrentUser();
  console.log(exercises, "these need deletino");

  //   const setsToDelete = await prisma.sets.findMany({
  //     where: {
  //       id: { in: setsforDeleting.id },
  //     },
  //   });

  //   if (setsToDelete.length === 0) {
  //     return new Response(`No sets found with the given IDs.`, { status: 404 });
  //   }

  //   await prisma.sets.deleteMany({
  //     where: {
  //       id: { in: setsforDeleting.id },
  //     },
  //   });

  //   return new Response(`${setsToDelete.length} set(s) deleted.`, {
  //     status: 200,
  //   });

  const workout = await prisma.workout.update({
    where: { id: id },
    data: {
      title: title,
      exercises: {
        deleteMany: {},
        create: exercises.map((exercise: any) => ({
          name: exercise.name,
          userId: currentUser?.id,
          sets: {
            create: exercise.sets.map((set: any) => ({
              reps: set.reps,
              weight: set.weight,
              userId: currentUser?.id,
              createdAt: set.createdAt,
            })),
          },
        })),
      },
    },
  });

  return NextResponse.json(workout);
}
