import getCurrentUser from "@/actions/getCurrentUser";
import getWorkouts from "@/actions/getWorkouts";
import Heading from "@/components/UI/Heading";
import WorkoutHistoryFull from "@/components/profile/WorkoutHistoryFull";

export default async function Page() {
  const currentUser = await getCurrentUser();
  let myWorkouts;
  if (currentUser) {
    myWorkouts = await getWorkouts({ userId: currentUser.id });
  }
  return (
    <div>
      <Heading heading="All Workouts" />
      <WorkoutHistoryFull workouts={myWorkouts} />
    </div>
  );
}
