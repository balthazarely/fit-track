import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  const body = await request.json();
  const { name } = body;
  console.log(currentUser);

  const exerciseData = await prisma.exercise.findMany({
    where: {
      userId: currentUser?.id,
      name: {
        contains: name,
        mode: "insensitive",
      },
    },
    include: {
      sets: true,
    },
  });
  return NextResponse.json(exerciseData);
}
