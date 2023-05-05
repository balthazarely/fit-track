import Heading from "@/components/UI/Heading";
import Link from "next/link";

export default function StartWorkout() {
  const workouts = [
    { name: "Chest Day", id: "chest-day-01" },
    { name: "Leg Day", id: "leg-day-01" },
    { name: "Back Day", id: "back-day-01" },
    { name: "Arm Day", id: "arm-day-01" },
    { name: "Lower Body Day", id: "lower-body-day-01" },
    { name: "Upper Body Day", id: "upper-body-day-01" },
  ];

  return (
    <div>
      <Heading
        heading="Start New Workout"
        subheading="Start a blank template or select a premade workout"
      />
      <div className="mt-8">
        <Link href="/new-workout/default">
          <button className="btn-primary btn">Start Blank Workout</button>
        </Link>
      </div>

      <div className="mt-8 font-bold">Templates</div>
      <div className="grid md:grid-cols-3 grid-cols-2 gap-2 ">
        {workouts.map((workout: any) => (
          <div className="bg-base-200 rounded-lg p-4">
            <div className="font-bold">{workout.name}</div>
            <div className="font-xs">
              this will be something here but not toasf
            </div>
            <Link href={`/new-workout/${workout.id}`}>
              <button className="btn-primary btn-sm btn flex mt-1  items-center justify-center rounded-lg ">
                Start
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
