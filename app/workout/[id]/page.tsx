import getWorkout from "@/actions/getWorkout";
import Workout from "@/components/workout/Workout";

export default async function Page({ params }: any) {
  const workout = await getWorkout(params.id);

  return (
    <div>
      <Workout editWorkout={true} initlWorkout={workout} />
    </div>
  );
}
