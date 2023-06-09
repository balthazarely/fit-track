import getCurrentUser from "@/actions/getCurrentUser";
import getWorkouts from "@/actions/getWorkouts";
import Heading from "@/components/UI/Heading";
import ProfileNav from "@/components/profile/ProfileNav";
import WorkoutHistory from "@/components/profile/WorkoutHistory";

export default async function Layout() {
  const currentUser = await getCurrentUser();
  let myWorkouts;
  if (currentUser) {
    myWorkouts = await getWorkouts({ userId: currentUser.id });
  }

  return (
    <>
      <Heading heading="Profile" />
      <ProfileNav />
      <WorkoutHistory workouts={myWorkouts} />
    </>
  );
}
