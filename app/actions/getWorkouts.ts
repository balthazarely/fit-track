import prisma from "@/libs/prismadb";

export default async function getWorkouts(params: any) {
  const { userId } = params;
  const workouts = await prisma.workout.findMany({
    where: {
      userId: userId,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });
  const workoutsWithFormattedDate = workouts.map((workout) => {
    const createdAt = new Date(workout.createdAt);
    const createdAtFormatted = createdAt.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return {
      ...workout,
      createdAt,
      createdAtFormatted,
    };
  });

  return workoutsWithFormattedDate;
}
