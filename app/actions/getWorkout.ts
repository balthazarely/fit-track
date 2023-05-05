import prisma from "@/libs/prismadb";

export default async function getWorkout(params: string) {
  const workout = await prisma.workout.findUnique({
    where: {
      id: params,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (workout) {
    const exercises = workout.exercises;
    const exerciseData = exercises.map((exercise) => {
      const setsData = exercise.sets.map((set) => {
        return {
          reps: set.reps,
          weight: set.weight,
          rpe: set.rpe,
          id: set.id,
          createdAt: set.createdAt,
        };
      });
      return {
        name: exercise.name,
        sets: setsData,
        id: exercise.id,
      };
    });
    return {
      title: workout.title,
      id: workout.id,
      createdAt: workout.createdAt,
      userId: workout.userId,
      exercises: exerciseData,
    };
  } else {
    return null;
  }
}
