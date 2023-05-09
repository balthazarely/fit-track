import getExerciseData from "@/actions/getExerciseData";
import ExerciseHistory from "@/components/workout/ExerciseHistory";

export default async function Page({ params }: any) {
  const decodedString = decodeURIComponent(params.id);
  const exerciseData = await getExerciseData(decodedString);

  return (
    <div>
      <ExerciseHistory data={exerciseData} />
    </div>
  );
}
