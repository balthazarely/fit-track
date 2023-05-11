import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const { colorMode } = body;
  const currentUser = await getCurrentUser();

  const foundWorkout = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      colorMode: colorMode,
    },
  });

  if (!foundWorkout) {
    return NextResponse.error();
  }

  return NextResponse.json(foundWorkout);
}
