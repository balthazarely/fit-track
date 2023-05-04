"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { SafeUser } from "@/types";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface NavbarProps {
  currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: NavbarProps) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    // <div className="navbar bg-base-100">
    //   <div className="flex-none">
    //     <button className="btn btn-square btn-ghost">
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 24 24"
    //         className="inline-block w-5 h-5 stroke-current"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="2"
    //           d="M4 6h16M4 12h16M4 18h16"
    //         ></path>
    //       </svg>
    //     </button>
    //   </div>
    //   <div className="flex-1">
    //     <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
    //   </div>
    //   <div className="flex-none">
    //     <div className="dropdown dropdown-end">
    //       <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //         <div className="w-10 rounded-full">
    //           <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
    //         </div>
    //       </label>
    //       <ul
    //         tabIndex={0}
    //         className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
    //       >
    //         <li>
    //           <a className="justify-between">
    //             Profile
    //             <span className="badge">New</span>
    //           </a>
    //         </li>
    //         <li>
    //           <a>Settings</a>
    //         </li>
    //         <li>
    //           <a>Logout</a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
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
