"use client";
import { useRouter } from "next/navigation";
import { IoBarbell } from "react-icons/io5";

export default function NewWorkoutButton() {
  const router = useRouter();

  const navigateToTemplateWorkout = (path: string) => {
    // window.localStorage.removeItem("fit-track-current-workout");
    router.push(path);
  };

  return (
    <>
      <button
        onClick={() => navigateToTemplateWorkout(`/new-workout/default`)}
        className="btn-primary btn"
      >
        <IoBarbell className="text-xl mr-2" />
        Start Blank Workout
      </button>
    </>
  );
}
