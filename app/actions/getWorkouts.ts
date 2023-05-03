import prisma from "@/libs/prismadb";

export default async function getWorkouts(params: any) {
  const { userId } = params;
  const workout = await prisma.workout.findMany({
    where: {
      userId: userId,
    },
  });
  return workout;
}
