"use client";
import { useRouter } from "next/navigation";

export default function WorkoutTemplateCard({ workout }: any) {
  const router = useRouter();

  const navigateToTemplateWorkout = (path: string) => {
    window.localStorage.removeItem("fit-track-current-workout");
    router.push(path);
  };

  return (
    <div className="bg-base-200 rounded-lg p-4">
      <div className="font-bold">{workout.name}</div>
      <div className="font-xs">this will be something here but not toasf</div>
      <button
        onClick={() => navigateToTemplateWorkout(`/new-workout/${workout.id}`)}
        className="btn-primary btn-sm btn flex mt-1  items-center justify-center rounded-lg "
      >
        Start
      </button>
    </div>
  );
}
