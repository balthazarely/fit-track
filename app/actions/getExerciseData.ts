import prisma from "@/libs/prismadb";

export default async function getExerciseData(exerciseName: string) {
  const exerciseData = await prisma.exercise.findMany({
    where: {
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
