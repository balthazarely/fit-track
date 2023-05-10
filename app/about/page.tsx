"use client";

import { workoutDataDemo } from "@/utils/demoWorkoutData";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  SiTailwindcss,
  SiDaisyui,
  SiNextdotjs,
  SiPrisma,
  SiMongodb,
} from "react-icons/si";

export default function About() {
  const [loading, setLoading] = useState<boolean>(false);

  const saveWorkoutToDB = () => {
    setLoading(true);
    const requests = workoutDataDemo.map((demo: any, index: number) => {
      return axios.post("/api/createWorkout", demo);
    });
    Promise.all(requests)
      .then(() => {
        toast.success(`Test data created`);
        setLoading(false);
      })
      .catch(() => {
        console.log("error");
        toast.error("Something went wrong.");
        setLoading(false);
      });
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col items-center gap-4">
          <div className="max-w-md text-center text-base relative ">
            Made with
            <div className="text-lg font-bold">
              NextJS 13 + MongoDB + Prisma + TailwindCSS + DaisyUI
            </div>
          </div>

          <div className="flex gap-4 z-50">
            <SiNextdotjs className="text-3xl text-primary" />
            <SiMongodb className="text-3xl text-primary" />
            <SiPrisma className="text-3xl text-primary" />
            <SiTailwindcss className="text-3xl text-primary" />
            <SiDaisyui className="text-3xl text-primary" />
          </div>
          <a href="https://github.com/balthazarely/fit-track" target="_BLANK">
            <button className="btn btn-primary btn-outline mt-2">
              Repo Link
            </button>
          </a>
          <div className="mt-16 flex justify-center items-center flex-col max-w-md">
            <div className="text-center mb-2">
              If you would just like to see data without entering workouts,
              click below:
            </div>
            <div>
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                onClick={saveWorkoutToDB}
              >
                Create Sample Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
