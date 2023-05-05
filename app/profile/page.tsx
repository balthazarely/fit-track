import getCurrentUser from "@/actions/getCurrentUser";
import getWorkouts from "@/actions/getWorkouts";
import Heading from "@/components/UI/Heading";
import WorkoutHistory from "@/components/profile/WorkoutHistory";
import Stats from "@/components/profile/Stats";

export default async function Page() {
  const currentUser = await getCurrentUser();
  let myWorkouts;
  if (currentUser) {
    myWorkouts = await getWorkouts({ userId: currentUser.id });
  }
  return (
    <div>
      <Heading heading="Profile" />
      <Stats myWorkouts={myWorkouts} />
      <WorkoutHistory workouts={myWorkouts} />
    </div>
  );
}
