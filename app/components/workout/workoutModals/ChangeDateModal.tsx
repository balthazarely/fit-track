import { memo } from "react";
import { HiX } from "react-icons/hi";
import { Calendar } from "react-date-range";
import { Workout } from "@/types";

interface ChangeDateModalProps {
  updateWorkoutInfo: (value: any, field: string) => void;
  setDateModalOpen: (state: boolean) => void;
  dateModalOpen: boolean;
  workout: Workout;
}

const ChangeDateModal = memo(
  ({
    dateModalOpen,
    setDateModalOpen,
    workout,
    updateWorkoutInfo,
  }: ChangeDateModalProps) => {
    return (
      <>
        <input
          type="checkbox"
          checked={dateModalOpen}
          id="my-modal-6"
          className="modal-toggle"
          readOnly
        />
        <div className="modal left-0 lg:left-56 absolute">
          <div className="modal-box relative flex flex-col justify-center items-center">
            <button
              className="absolute top-2 right-2 btn btn-sm btn-ghost"
              onClick={() => setDateModalOpen(false)}
            >
              <HiX />
            </button>
            <Calendar
              date={workout.createdAt}
              onChange={(date) => updateWorkoutInfo(date, "createdAt")}
            />
            <button
              className={`btn btn-primary px-2 py-1 mt-2 `}
              onClick={() => setDateModalOpen(false)}
            >
              Change Date
            </button>
          </div>
        </div>
      </>
    );
  }
);

ChangeDateModal.displayName = "ChangeDateModal";
export default ChangeDateModal;
