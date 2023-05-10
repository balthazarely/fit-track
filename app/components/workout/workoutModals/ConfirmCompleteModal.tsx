import { memo } from "react";
import { HiX } from "react-icons/hi";

interface ConfrimCompleteModalProps {
  saveWorkoutToDB: (
    apiRoute: string,
    loadMsg: string,
    successMsg: string
  ) => void;
  setCompleteModalOpen: (state: boolean) => void;
  completeModalOpen: boolean;
}

const ConfrimCompleteModal = memo(
  ({
    completeModalOpen,
    setCompleteModalOpen,
    saveWorkoutToDB,
  }: ConfrimCompleteModalProps) => {
    return (
      <>
        <input
          type="checkbox"
          checked={completeModalOpen}
          id="my-modal-6"
          className="modal-toggle"
          readOnly
        />
        <div className="modal left-0 lg:left-56 absolute">
          <div className="modal-box flex flex-col justify-center items-center relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setCompleteModalOpen(false)}
            >
              <HiX />
            </button>
            <div className="mb-2 text-xl">
              Are you sure you want to finish this workout?
            </div>
            <button
              className={`btn btn-primary px-2 py-1`}
              onClick={() => {
                setCompleteModalOpen(false);
                saveWorkoutToDB(
                  "/api/createWorkout",
                  "Saving workout...",
                  "Workout saved! Redirecting..."
                );
              }}
            >
              Complete
            </button>
          </div>
        </div>
      </>
    );
  }
);

ConfrimCompleteModal.displayName = "ConfrimCompleteModal";
export default ConfrimCompleteModal;
