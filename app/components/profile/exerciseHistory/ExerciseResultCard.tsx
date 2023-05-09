"use client";

export default function ExerciseResultCard({
  setSelectedExercise,
  selectedExercise,
  instructionsOpen,
  setInstructionsOpen,
  result,
  idx,
}: any) {
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
      <div
        className={`${
          instructionsOpen === result.name ? "block" : "hidden"
        } text-left text-xs my-2`}
      >
        {result.instructions}
      </div>
    </button>
  );
}
