"use client";

import Link from "next/link";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import RecentWorkoutCard from "./RecentWorkoutCard";
import { Workout } from "@prisma/client";
import ConfrimDeleteAllWorkoutsModal from "../modals/ConfirmDeleteAllWorkoutsModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/UI/Loader";

interface RecentWorkoutsProps {
  workouts: Workout[];
}

export default function RecentWorkouts({ workouts }: RecentWorkoutsProps) {
  let workoutsForHistory = workouts;
  const [value, onChange] = useState<any>(new Date());
  const [selectedDay, setSelectedDay] = useState<any>("");
  const [deleteAllWorkoutsModalOpen, setDeleteAllWorkoutsModalOpen] =
    useState<boolean>(false);
  const [updatingDB, setuUpdatingDB] = useState<boolean>(false);
  const router = useRouter();

  const deleteAllWorkoutsDB = () => {
    setuUpdatingDB(true);
    const requests = workouts.map((workout: any, index: number) => {
      return axios.post("/api/deleteWorkout", workout);
    });
    Promise.all(requests)
      .then(() => {
        workoutsForHistory.length = 0;
        toast.success(`All workouts deleted`);
        setuUpdatingDB(false);
        router.refresh();
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
        setuUpdatingDB(false);
      });
  };

  function tileClassName({ date }: any) {
    const formattedDate = moment(date).format("MM/DD/YYYY");
    const formattedDates = workouts.map((day: any) => day.createdAtFormatted);
    if (formattedDates.includes(formattedDate)) {
      return "highlight";
    } else {
      return "custom-tile";
    }
  }

  function handleCalendarChange(value: any) {
    const formattedDate = moment(value).format("MM/DD/YYYY");
    setSelectedDay(formattedDate);
  }

  const sortTotalWorkouts = (workouts: any) =>
    workouts.sort((a: any, b: any) =>
      moment(b.createdAt, "DD-MM-YYYY").diff(moment(a.createdAt, "DD-MM-YYYY"))
    );

  return (
    <div className="my-6">
      <div className="text-xl font-bold flex justify-between">
        <div>Recent Workouts</div>
        {workouts.length !== 0 && (
          <button
            disabled={updatingDB}
            className="btn-outline btn btn-xs"
            onClick={() => setDeleteAllWorkoutsModalOpen(true)}
          >
            Delete all workouts
          </button>
        )}
      </div>
      <div className="my-4 flex flex-col sm:flex-row gap-4 justify-between h-72">
        <div className="flex justify-center">
          <Calendar
            onChange={handleCalendarChange}
            value={value}
            tileClassName={tileClassName}
          ></Calendar>
        </div>
        {workoutsForHistory.length > 0 ? (
          <>
            {!updatingDB ? (
              <div className="w-full flex justify-between flex-col   ">
                <div>
                  {selectedDay !== "" && (
                    <div className="font-bold  text-sm flex justify-between p-2 mb-1">
                      {moment(selectedDay).format("dddd DD/YYYY")}
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => setSelectedDay("")}
                      >
                        clear
                      </button>
                    </div>
                  )}
                  {sortTotalWorkouts(workoutsForHistory)
                    .filter((workout: any) => {
                      if (selectedDay !== "") {
                        return workout.createdAtFormatted === selectedDay;
                      } else {
                        return workout;
                      }
                    })
                    .slice(0, 4)
                    .map((workout: any, idx: number) => {
                      return <RecentWorkoutCard key={idx} workout={workout} />;
                    })}
                </div>
                <div className="w-full flex justify-center my-4">
                  <Link href={"/history/workout"}>
                    <button className="btn btn-primary btn-sm ">
                      See all {workoutsForHistory.length} workouts
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-full h-72  flex justify-center items-center ">
                <Loader size="lg" />
              </div>
            )}
          </>
        ) : (
          <div className="w-full text-xl  h-full flex justify-center items-center">
            No workouts yet
          </div>
        )}
      </div>
      <ConfrimDeleteAllWorkoutsModal
        deleteAllWorkoutsDB={deleteAllWorkoutsDB}
        deleteAllWorkoutsModalOpen={deleteAllWorkoutsModalOpen}
        setDeleteAllWorkoutsModalOpen={setDeleteAllWorkoutsModalOpen}
      />
    </div>
  );
}
