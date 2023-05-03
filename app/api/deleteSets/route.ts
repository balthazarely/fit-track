import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const body = await request.json();
  const data = body;
  console.log(data, "body");

  try {
    const setsToDelete = await prisma.sets.findMany({
      where: {
        id: { in: data.id },
      },
    });

    if (setsToDelete.length === 0) {
      return new Response(`No sets found with the given IDs.`, { status: 404 });
    }

    await prisma.sets.deleteMany({
      where: {
        id: { in: data.id },
      },
    });

    return new Response(`${setsToDelete.length} set(s) deleted.`, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(`Error deleting sets with the given IDs.`, {
      status: 500,
    });
  }
}

//   return NextResponse.json(workout);
