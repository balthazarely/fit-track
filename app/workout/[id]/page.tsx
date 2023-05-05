import getWorkout from "@/actions/getWorkout";
import getExerciseData from "@/actions/getExerciseData";
import History from "@/components/workout/History";
import Workout from "@/components/workout/Workout";

export default async function Page({ params }: any) {
  const workout = await getWorkout(params.id);
  console.log(workout);

  // const curlData = await getExerciseData("Zottman Curl");
  // console.log(curlData, "curlData");

  // const updatedWorkout = JSON.parse(
  //   JSON.stringify(workout).replace(/"sets"/g, '"Sets"')
  // );

  // console.log(updatedWorkout);

  return (
    <div>
      {/* {workout && JSON.stringify(workout)} */}
      {/* <div className="border-2 border-red-500"></div>
      {updatedWorkout && JSON.stringify(updatedWorkout)} */}

      <Workout editWorkout={true} initlWorkout={workout} />
      {/* <History data={curlData} /> */}
    </div>
  );
}
