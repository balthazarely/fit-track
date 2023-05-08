import getWorkout from "@/actions/getWorkout";
import getExerciseData from "@/actions/getExerciseData";
import ExerciseHistory from "@/components/workout/ExerciseHistory";
import Workout from "@/components/workout/Workout";
import Exercise from "@/components/workout/Exercise";

export default async function Page({ params }: any) {
  const decodedString = decodeURIComponent(params.id);
  const exerciseData = await getExerciseData(decodedString);
  //   console.log(exerciseData, "exerciseData");

  // const updatedWorkout = JSON.parse(
  //   JSON.stringify(workout).replace(/"sets"/g, '"Sets"')
  // );

  // console.log(updatedWorkout);

  return (
    <div>
      {/* {workout && JSON.stringify(workout)} */}
      {/* <div className="border-2 border-red-500"></div>
      {updatedWorkout && JSON.stringify(updatedWorkout)} */}

      {/* <Workout initlWorkout={workout} /> */}
      <ExerciseHistory data={exerciseData} />
    </div>
  );
}
