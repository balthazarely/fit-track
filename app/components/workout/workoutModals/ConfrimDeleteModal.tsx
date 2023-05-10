import { memo } from "react";
import { HiX } from "react-icons/hi";

interface ConfrimDeleteModalProps {
  deleteWorkout: (
    apiRoute: string,
    loadMsg: string,
    successMsg: string
  ) => void;
  setDeleteModalOpen: (state: boolean) => void;
  deleteModalOpen: boolean;
}

const ConfrimDeleteModal = memo(
  ({
    deleteModalOpen,
    setDeleteModalOpen,
    deleteWorkout,
  }: ConfrimDeleteModalProps) => {
    return (
      <>
        <input
          type="checkbox"
          checked={deleteModalOpen}
          id="my-modal-6"
          className="modal-toggle"
          readOnly
        />
        <div className="modal left-0 lg:left-56 absolute">
          <div className="modal-box flex flex-col justify-center items-center relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setDeleteModalOpen(false)}
            >
              <HiX />
            </button>
            <div className="mb-2 text-xl">
              Are you sure you want to delete this workout?{" "}
            </div>
            <button
              className={`btn btn-primary px-2 py-1`}
              onClick={() => {
                setDeleteModalOpen(false);
                deleteWorkout(
                  "/api/deleteWorkout",
                  "Deleting workout...",
                  "Workout deleted! Redirecting..."
                );
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
);

ConfrimDeleteModal.displayName = "ConfrimDeleteModal";
export default ConfrimDeleteModal;
