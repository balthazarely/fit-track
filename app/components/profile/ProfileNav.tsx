"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProfileNav() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("tab");
  const menuTabs = ["recent-workouts", "stats", "exercise-history"];

  const navigate = (route: string) => {
    router.push(`/profile?tab=${route}`);
  };

  return (
    <nav className="flex items-start flex-col gap-4 col-span-1 p-2">
      <div className="tabs tabs-boxed">
        {menuTabs.map((item: string, idx: number) => (
          <button key={idx} onClick={() => navigate(item)}>
            <div
              className={`tab tab-lifted   ${
                page === item ? "tab-active  " : ""
              }`}
            >
              {item}
            </div>
          </button>
        ))}
      </div>
    </nav>
  );
}
