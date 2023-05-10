import getWorkout from "@/actions/getWorkout";
import BackToWorkoutsButton from "@/components/UI/BackToWorkoutsButton";
import Workout from "@/components/workout/Workout";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Params }) {
  const workout = await getWorkout(params.id);

  console.log(workout);

  if (!workout) {
    return (
      <div className="w-full h-96 flex justify-center items-center flex-col gap-2">
        <div className="font-bold text-2xl">This workout doesn't exist...</div>
        <div>Hopefully that isn't a problem...</div>
        <BackToWorkoutsButton />
      </div>
    );
  }

  return (
    <div>
      <Workout editWorkout={true} initlWorkout={workout} />
    </div>
  );
}
