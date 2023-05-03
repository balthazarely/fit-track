"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar({ currentUser }: any) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="flex justify-between bg-purple-500 py-4">
      <div>
        <Link href={"/"}>
          <button className=" px-2 py-1 text-white">Home</button>
        </Link>
        <Link href={"/workouts"}>
          <button className=" px-2 py-1 text-white">workouts</button>
        </Link>
      </div>
      <div>
        {!currentUser ? (
          <div>
            <button
              onClick={() => registerModal.onOpen()}
              className=" px-2 py-1 text-white"
            >
              Register
            </button>
            <button
              onClick={() => loginModal.onOpen()}
              className=" px-2 py-1 text-white"
            >
              Login
            </button>
          </div>
        ) : (
          <button onClick={() => signOut()} className=" px-2 py-1 text-white">
            Sign out
          </button>
        )}

        {currentUser && `logged in as ${currentUser.name} `}
      </div>
    </div>
  );
}
