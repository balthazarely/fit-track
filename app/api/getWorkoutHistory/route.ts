import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const exerciseData = await prisma.exercise.findMany({
    where: {
      name: {
        contains: "Dumbbell Bench Press",
        mode: "insensitive",
      },
    },
    include: {
      sets: true,
    },
  });
  return NextResponse.json(exerciseData);
}
