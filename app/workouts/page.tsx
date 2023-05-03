import getCurrentUser from "@/actions/getCurrentUser";
import getWorkouts from "@/actions/getWorkouts";
import Link from "next/link";

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
          <Link className="flex flex-col" href={`workout/${workout.id}`}>
            {workout.title} + {JSON.stringify(workout.createdAt)}
          </Link>
        ))}
      </div>
    </div>
  );
}
