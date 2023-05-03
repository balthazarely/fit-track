import getWorkout from "@/actions/getWorkout";

export default async function Page({ params }: any) {
  const workout = await getWorkout(params.id);
  console.log(workout);

  return <div>HELLO:{workout && JSON.stringify(workout)}</div>;
}
