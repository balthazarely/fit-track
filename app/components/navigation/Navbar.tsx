"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signOut } from "next-auth/react";

export default function Navbar({ currentUser }: any) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  console.log(currentUser, "this currentUser");

  return (
    <>
      <button
        onClick={() => registerModal.onOpen()}
        className="bg-purple-500 px-2 py-1 text-white"
      >
        Register
      </button>
      <button
        onClick={() => loginModal.onOpen()}
        className="bg-purple-500 px-2 py-1 text-white"
      >
        Login
      </button>
      <button
        onClick={() => signOut()}
        className="bg-purple-500 px-2 py-1 text-white"
      >
        Sign out
      </button>
    </>
  );
}
