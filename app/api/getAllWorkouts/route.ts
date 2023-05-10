import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST() {
  const currentUser = await getCurrentUser();
  const exerciseData = await prisma.workout.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  return NextResponse.json(exerciseData);
}
