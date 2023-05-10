import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getExerciseData(exerciseName: string) {
  const currentUser = await getCurrentUser();

  const exerciseData = await prisma.exercise.findMany({
    where: {
      userId: currentUser?.id,
      name: {
        contains: exerciseName,
        mode: "insensitive",
      },
    },
    include: {
      sets: true,
    },
  });

  return exerciseData;
}
