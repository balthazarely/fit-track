import prisma from "@/libs/prismadb";

export default async function getWorkout(params: string) {
  const workout = await prisma.workout.findUnique({
    where: {
      id: params,
    },
    include: {
      exercises: {
        include: {
          Sets: true,
        },
      },
    },
  });

  if (workout) {
    const exercises = workout.exercises;
    const exerciseData = exercises.map((exercise) => {
      const setsData = exercise.Sets.map((set) => {
        return {
          reps: set.reps,
          weight: set.weight,
        };
      });
      return {
        name: exercise.name,
        sets: setsData,
      };
    });
    return {
      workoutTitle: workout.title,
      exercises: exerciseData,
    };
  } else {
    return null;
  }
}
