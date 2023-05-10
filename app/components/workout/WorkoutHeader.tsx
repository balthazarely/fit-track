import { Workout } from "@/types";
import { useRef } from "react";
import { AiTwotoneEdit, AiOutlineCheck, AiFillCalendar } from "react-icons/ai";

interface WorkoutHeaderProps {
  editWorkout: boolean;
  modifyDatabase: (
    apiRoute: string,
    loadMsg: string,
    successMsg: string
  ) => void;
  setDeleteModalOpen: (state: boolean) => void;
  nameEdit: boolean;
  workout: Workout | any;
  setNameEdit: (state: boolean) => void;
  updateWorkoutInfo: (value: any, field: string) => void;
  setDateModalOpen: (state: boolean) => void;
  dbUpdating: boolean;
}

export default function WorkoutHeader({
  editWorkout,
  modifyDatabase,
  setDeleteModalOpen,
  nameEdit,
  workout,
  setNameEdit,
  updateWorkoutInfo,
  setDateModalOpen,
  dbUpdating,
}: WorkoutHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="flex justify-between mb-4">
        {!editWorkout && (
          <h1 className="font-bold text-center w-full text-2xl text-primary">
            Create Workout
          </h1>
        )}

        {editWorkout && (
          <>
            <h1 className="font-bold text-center  text-2xl ">Edit Workout</h1>
            <div>
              {editWorkout && (
                <div className="flex items-center btn-group">
                  <button
                    disabled={dbUpdating}
                    className={`btn btn-outline  btn-xs px-2 py-1  `}
                    onClick={() =>
                      modifyDatabase(
                        "/api/editWorkout",
                        "Updaing workout...",
                        "Workout updated! Redirecting..."
                      )
                    }
                  >
                    Save Changes
                  </button>
                  <button
                    disabled={dbUpdating}
                    className={`btn btn-outline btn-xs px-2 py-1  `}
                    onClick={() => setDeleteModalOpen(true)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div className="flex py-2 gap-2  h-24  justify-between items-center pr-2">
        <div className=" h-full">
          <div className="text-xs my-1">Workout Name</div>
          {!nameEdit ? (
            <input
              readOnly
              className="font-bold text-xl bg-base-200 input !border-0 pointer-events-none cursor-default  "
              value={workout?.title}
            />
          ) : (
            <input
              ref={inputRef}
              className="font-bold text-xl bg-base-200 input input-bordered input-primary "
              value={workout?.title}
              onChange={(e) => updateWorkoutInfo(e.target.value, "title")}
            />
          )}
        </div>
        <div className="">
          {!nameEdit ? (
            <button
              disabled={dbUpdating}
              className="btn btn-ghost"
              onClick={() => {
                setNameEdit(!nameEdit);
                if (inputRef.current) {
                  inputRef.current.focus();
                  inputRef.current.select();
                }
              }}
            >
              <AiTwotoneEdit className="text-xl cursor-pointer" />
            </button>
          ) : (
            <button
              disabled={dbUpdating}
              className="btn btn-ghost"
              onClick={() => setNameEdit(!nameEdit)}
            >
              <AiOutlineCheck className="text-xl cursor-pointer" />
            </button>
          )}
          <button
            disabled={dbUpdating}
            className="btn btn-ghost"
            onClick={() => setDateModalOpen(true)}
          >
            <AiFillCalendar className="text-xl cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
}
