import { memo } from "react";
import { HiX } from "react-icons/hi";

interface ConfrimDeleteModalProps {
  deleteWorkout: () => void;
  setDeleteModalOpen: (state: boolean) => void;
  deleteModalOpen: boolean;
  dbUpdating: boolean;
}

const ConfrimDeleteModal = memo(
  ({
    deleteModalOpen,
    setDeleteModalOpen,
    dbUpdating,
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
              className={`btn btn-primary px-2 py-1 
                ${dbUpdating ? "loading" : ""}`}
              onClick={deleteWorkout}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
);
export default ConfrimDeleteModal;
