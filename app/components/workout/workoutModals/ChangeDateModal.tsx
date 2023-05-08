import { memo } from "react";
import { HiX } from "react-icons/hi";
import { Calendar } from "react-date-range";

const ChangeDateModal = memo(
  ({ dateModalOpen, setDateModalOpen, workout, updateWorkoutInfo }: any) => {
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
              className={`btn btn-primary px-2 py-1 `}
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

export default ChangeDateModal;
