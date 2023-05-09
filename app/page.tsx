import Heading from "@/components/UI/Heading";
import NewWorkoutButton from "@/components/workout/NewWorkoutButton";
import WorkoutTemplateCard from "@/components/workout/WorkoutTemplateCard";
import { WorkoutTemplates } from "./types";

export default function Home() {
  const workouts: WorkoutTemplates[] = [
    { name: "Chest Day", id: "chest-day-01", description: "asasf" },
    { name: "Leg Day", id: "leg-day-01", description: "asasf" },
    { name: "Back Day", id: "back-day-01", description: "asasf" },
    { name: "Arm Day", id: "arm-day-01", description: "asasf" },
    { name: "Lower Body Day", id: "lower-body-day-01", description: "asasf" },
    { name: "Upper Body Day", id: "upper-body-day-01", description: "asasf" },
  ];

  return (
    <div>
      <Heading
        heading="Start New Workout"
        subheading="Start a blank template or select a premade workout"
      />
      <div className="mt-8">
        <NewWorkoutButton />
      </div>

      <div className="mt-8 font-bold">Templates</div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-2 ">
        {workouts.map((workout: WorkoutTemplates, idx: number) => (
          <WorkoutTemplateCard key={idx} workout={workout} />
        ))}
      </div>
    </div>
  );
}
