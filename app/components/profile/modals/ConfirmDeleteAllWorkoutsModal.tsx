import { memo, useState } from "react";
import { HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

interface ConfrimDeleteAllWorkoutsModalProps {
  deleteAllWorkoutsDB: () => void;
  deleteAllWorkoutsModalOpen: boolean;
  setDeleteAllWorkoutsModalOpen: (state: boolean) => void;
}

const ConfrimDeleteAllWorkoutsModal = memo(
  ({
    deleteAllWorkoutsDB,
    deleteAllWorkoutsModalOpen,
    setDeleteAllWorkoutsModalOpen,
  }: ConfrimDeleteAllWorkoutsModalProps) => {
    return (
      <>
        <input
          type="checkbox"
          checked={deleteAllWorkoutsModalOpen}
          id="my-modal-6"
          className="modal-toggle"
          readOnly
        />
        <div className="modal left-0 lg:left-56 absolute">
          <div className="modal-box flex flex-col justify-center items-center relative">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setDeleteAllWorkoutsModalOpen(false)}
            >
              <HiX />
            </button>
            <div className="mb-2 text-xl">
              Are you sure you want to delete this workout?{" "}
            </div>
            <button
              className={`btn btn-primary px-2 py-1`}
              onClick={() => {
                setDeleteAllWorkoutsModalOpen(false);
                deleteAllWorkoutsDB();
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

ConfrimDeleteAllWorkoutsModal.displayName = "ConfrimDeleteAllWorkoutsModal";
export default ConfrimDeleteAllWorkoutsModal;
