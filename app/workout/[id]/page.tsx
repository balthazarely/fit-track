import getWorkout from "@/actions/getWorkout";
import Workout from "@/components/workout/Workout";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Params }) {
  const workout = await getWorkout(params.id);

  return (
    <div>
      <Workout editWorkout={true} initlWorkout={workout} />
    </div>
  );
}
