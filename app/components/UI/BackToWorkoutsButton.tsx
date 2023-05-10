import Link from "next/link";

export default function BackToWorkoutsButton() {
  return (
    <Link href="/profile">
      <button className="btn btn-primary">Back to workouts</button>
    </Link>
  );
}
