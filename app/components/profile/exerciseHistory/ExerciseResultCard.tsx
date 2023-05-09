import { ExerciseApiResults } from "@/types";

interface ExerciseResultCardProps {
  setSelectedExercise: (state: string) => void;
  selectedExercise: string;
  result: ExerciseApiResults;
  idx: number;
}

export default function ExerciseResultCard({
  setSelectedExercise,
  selectedExercise,
  result,
  idx,
}: ExerciseResultCardProps) {
  const parseEquipmentName = (name: string) => {
    return name.replace(/_/g, " ");
  };

  return (
    <button
      key={idx}
      onClick={() => setSelectedExercise(result.name)}
      className={`${
        selectedExercise === result.name && "btn-primary"
      } rounded-lg  p-2 cursor-pointer w-full `}
    >
      <div className="flex justify-between items-center ">
        <div className="text-left w-full ">
          <div className="font-bold">{result.name}</div>
          <div className="text-xs">
            Equipment:{" "}
            <span className="capitalize font-bold">
              {parseEquipmentName(result.equipment)}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
