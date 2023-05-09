import { ExerciseApiResults } from "@/types";
import { muscleGroups } from "@/utils/muscleGroups";
import { memo, useEffect, useState } from "react";
import { HiX, HiOutlineInformationCircle } from "react-icons/hi";

interface AddNewExercisesModalProps {
  addNewExercise: (value: string) => void;
  setExerciseModalOpen: (state: boolean) => void;
  exerciseModalOpen: boolean;
}

const AddNewExercisesModal = memo(
  ({
    addNewExercise,
    setExerciseModalOpen,
    exerciseModalOpen,
  }: AddNewExercisesModalProps) => {
    const key = process.env.NEXT_PUBLIC_API_NINJA_API_KEY;
    const [selectedMuscleGroup, setSelectedMuscleGroups] = useState<string>("");
    const [selectedExercise, setSelectedExercise] = useState<string>("");
    const [instructionsOpen, setInstructionsOpen] = useState<string>("");
    const [apiResults, setApiResults] = useState<ExerciseApiResults[] | null>(
      null
    );

    function handleSelectChange(event: any) {
      setSelectedMuscleGroups(event.target.value);
    }

    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/exercises?muscle=${selectedMuscleGroup}`,
          {
            headers: {
              "X-Api-Key": key!,
            },
          }
        );
        const jsonData = await response.json();
        setApiResults(jsonData);
      };

      if (selectedMuscleGroup) {
        fetchData();
      }
    }, [selectedMuscleGroup, key]);

    return (
      <>
        <input
          type="checkbox"
          checked={exerciseModalOpen}
          id="my-modal-6"
          className="modal-toggle relative"
          readOnly
        />
        <div className="modal left-0 lg:left-56 absolute">
          <div className="modal-box relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setExerciseModalOpen(false)}
            >
              <HiX />
            </button>
            <div className="flex justify-between ">
              <h3 className="font-bold text-lg">Add Exercise</h3>
            </div>
            <select
              value={selectedMuscleGroup}
              onChange={handleSelectChange}
              className="select select-primary w-full mb-2 "
            >
              <option disabled value="">
                Choose Muscle Group
              </option>
              {muscleGroups.map((group: string) => (
                <option key={group}>{group}</option>
              ))}
            </select>
            <div className="flex flex-col h-96 overflow-y-scroll">
              {apiResults?.map((result: ExerciseApiResults, idx: number) => (
                <Exercise
                  setSelectedExercise={setSelectedExercise}
                  selectedExercise={selectedExercise}
                  setInstructionsOpen={setInstructionsOpen}
                  instructionsOpen={instructionsOpen}
                  result={result}
                  idx={idx}
                  key={idx}
                />
              ))}
            </div>

            <div className="modal-action">
              <button
                disabled={!selectedExercise}
                className={`btn-primary btn px-2 py-1 `}
                onClick={() => {
                  if (selectedExercise) {
                    addNewExercise(selectedExercise);
                    setExerciseModalOpen(false);
                  }
                }}
              >
                Create Exercise
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

AddNewExercisesModal.displayName = "AddNewExercisesModal";
export default AddNewExercisesModal;

interface ExerciseProps {
  setSelectedExercise: (state: string) => void;
  selectedExercise: string;
  instructionsOpen: string;
  setInstructionsOpen: (state: string) => void;
  result: ExerciseApiResults;
  idx: number;
}

function Exercise({
  setSelectedExercise,
  selectedExercise,
  instructionsOpen,
  setInstructionsOpen,
  result,
  idx,
}: ExerciseProps) {
  const toggleInstructionsPanel = () => {
    if (instructionsOpen === result.name) {
      setInstructionsOpen("");
    } else {
      setInstructionsOpen(result.name);
    }
  };

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
        <button onClick={toggleInstructionsPanel} className="text-right  ">
          <HiOutlineInformationCircle className="text-2xl mx-2" />
        </button>
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
