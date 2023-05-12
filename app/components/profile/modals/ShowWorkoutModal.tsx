import { HiX } from "react-icons/hi";
import moment from "moment";
import { oneRepMaxFormula } from "@/utils/formulas";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/UI/Loader";
import { Exercises, Sets, Workout } from "@/types";
import ModalWrapper from "@/components/UI/ModalWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaWeightHanging } from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";

interface ShowWorkoutModalProps {
  setShowWorkoutModal: (state: boolean) => void;
  showWorkoutModal: boolean;
  workoutId?: string;
  workout?: any;
}

export default function ShowWorkoutModal({
  setShowWorkoutModal,
  showWorkoutModal,
  workoutId,
  workout,
}: ShowWorkoutModalProps) {
  const [fetchedData, setFetchedData] = useState<Workout>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (showWorkoutModal && workoutId) {
      setIsLoading(true);
      axios
        .post("/api/getWorkout", { id: workoutId })
        .then((response) => {
          const data = response.data; // Extract the data from the response
          setFetchedData(data);
        })
        .catch((error) => {
          console.error(error); // Handle the error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (workout) {
      setFetchedData(workout);
    }
  }, [showWorkoutModal, workoutId]);

  const closeModalRoute = () => {
    if (workoutId) {
      setShowWorkoutModal(false);
    }
  };

  const weightTotal = fetchedData?.exercises.reduce(
    (total: number, exercise: Exercises) => {
      exercise.sets.forEach((set: Sets) => {
        total += set.weight * set.reps;
      });
      return total;
    },
    0
  );

  function WorkoutCompleteHeader() {
    return (
      <>
        <div className="font-bold text-2xl text-primary w-full text-center">
          Great Job!
        </div>
      </>
    );
  }

  function ShowWorkoutHeader() {
    return (
      <>
        <div className="font-bold text-lg text-primary">Workout Overview</div>
        <button className=" btn btn-sm btn-ghost" onClick={closeModalRoute}>
          <HiX />
        </button>
      </>
    );
  }

  return (
    <ModalWrapper isModalOpen={showWorkoutModal} setModalOpen={closeModalRoute}>
      <div className="transform relative left-0 lg:translate-x-24 modal-box">
        {fetchedData ? (
          <>
            <div className="flex justify-between">
              {workoutId ? <ShowWorkoutHeader /> : <WorkoutCompleteHeader />}
            </div>
            <>
              <div className="flex items-center justify-between mb-2 ">
                <div className="flex flex-col mt-2">
                  <div className="text-xl font-bold">{fetchedData.title}</div>
                </div>
                <div className="text-md font-bold">
                  {moment(fetchedData.createdAt).format("MMM DD, YYYY")}
                </div>
              </div>
              {workout && (
                <div className="border-2 border-primary rounded-lg p-3 w-full flex justify-around my-3">
                  <div className="text-sm font-bold items-center flex gap-2">
                    <FaWeightHanging className="text-primary" />
                    {weightTotal} lbs. lifted
                  </div>
                  <div className="text-sm font-bold items-center flex gap-2">
                    <GiWeightLiftingUp className=" text-lg text-primary" />
                    {fetchedData?.exercises.length} exercises completed
                  </div>
                </div>
              )}
              <div className="divider "></div>

              {fetchedData.exercises.map((exercise: Exercises, idx: number) => {
                return (
                  <div className="p-2" key={idx}>
                    <div className="flex justify-between mb-1">
                      <div className="text-sm font-bold ">{exercise.name}</div>
                      {workoutId && (
                        <Link href={`/history/exercise/${exercise.name}`}>
                          <button className="btn btn-xs btn-primary btn-outline ">
                            See Charts
                          </button>
                        </Link>
                      )}
                    </div>
                    {exercise.sets.map((set: Sets, idx: number) => (
                      <div className="grid grid-cols-2" key={idx}>
                        <div className="text-sm flex gap-3 items-center">
                          <span className="bg-base-100 text-opacity-60  font-bold w-5 h-5  rounded-full flex justify-center items-center text-xs">
                            {" "}
                            {idx + 1}
                          </span>{" "}
                          {set.weight} lbs x {set.reps}
                        </div>
                        <div className="text-sm text-right">
                          {oneRepMaxFormula(set.weight, set.reps)} 1RM
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
              {workout && (
                <div className="w-full flex justify-center mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push("/profile?tab=recent-workouts")}
                  >
                    Continue to Workouts
                  </button>
                </div>
              )}
            </>
          </>
        ) : (
          <div>
            {isLoading ? (
              <Loader size="md" />
            ) : (
              <div className="text-center py-2"> No history</div>
            )}
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
