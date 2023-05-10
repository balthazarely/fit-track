import getExerciseData from "@/actions/getExerciseData";
import ExerciseHistory from "@/components/workout/ExerciseHistory";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Params }) {
  const decodedString = decodeURIComponent(params.id);
  const exerciseData = await getExerciseData(decodedString);

  // <ExerciseHistory data={exerciseData} />;
  return <>Hi</>;
}
