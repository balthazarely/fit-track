import getExerciseData from "@/actions/getExerciseData";
import Heading from "@/components/UI/Heading";
import ExerciseDataWorkoutCards from "@/components/profile/exerciseHistory/ExerciseDataWorkoutCards";
import ExerciseHistoryHeader from "@/components/profile/exerciseHistory/ExerciseHistoryHeader";
import BestSetGraph from "@/components/profile/exerciseHistory/graphs/BestSetGraph";
import VolumeGraph from "@/components/profile/exerciseHistory/graphs/VolumeGraph.";
import { parseExerciseDataForGraph } from "@/components/profile/exerciseHistory/utils";

type Params = {
  id: string;
};

export default async function Page({ params }: { params: Params }) {
  const decodedString = decodeURIComponent(params.id);
  const exerciseData = await getExerciseData(decodedString);
  const data = parseExerciseDataForGraph(exerciseData);

  return (
    <div>
      <ExerciseHistoryHeader name={decodedString} data={data} />
      <div className="grid grid-cols-1 md:grid-cols-5  mt-4 gap-4 md:gap-6">
        <div className="col-span-2 order-2 ">
          <ExerciseDataWorkoutCards
            fetchedExerciseData={data}
            selectedExercise={decodedString}
            limitResults={false}
          />
        </div>
        <div className="col-span-3  order-1">
          <BestSetGraph data={data} />
          <VolumeGraph data={data} />
        </div>
      </div>
    </div>
  );
}
