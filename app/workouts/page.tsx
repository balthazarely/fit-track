import getCurrentUser from "@/actions/getCurrentUser";
import getWorkouts from "@/actions/getWorkouts";
import WorkoutCard from "@/components/UI/WorkoutCard";

export default async function Page() {
  const currentUser = await getCurrentUser();
  let myWorkouts;
  if (currentUser) {
    myWorkouts = await getWorkouts({ userId: currentUser.id });
  }
  return (
    <div>
      <div className="font-bold text-2xl">Workouts</div>
      <div>
        {myWorkouts?.map((workout: any) => (
          <WorkoutCard workout={workout} />
        ))}
      </div>
    </div>
  );
}
