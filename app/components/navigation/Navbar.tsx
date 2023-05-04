"use client";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import { SafeUser } from "@/types";
import Image from "next/image";
import PageWrapper from "../UI/PageWrapper";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

interface NavbarProps {
  currentUser: SafeUser | null;
  children: React.ReactNode;
}

export default function Navbar({ currentUser, children }: NavbarProps) {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const toggleDrawer = useToggleDrawer();

  return (
    // <div className="navbar bg-base-100">
    //   <div className="flex-none">
    // <button
    //   className="btn btn-square btn-ghost"
    //   onClick={() =>
    //     toggleDrawer.isOpen ? toggleDrawer.onClose() : toggleDrawer.onOpen()
    //   }
    // >
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     fill="none"
    //     viewBox="0 0 24 24"
    //     className="inline-block w-5 h-5 stroke-current"
    //   >
    //     <path
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       strokeWidth="2"
    //       d="M4 6h16M4 12h16M4 18h16"
    //     ></path>
    //   </svg>
    // </button>
    //   </div>
    //   <div className="flex-1">
    //     <a className="btn btn-ghost normal-case text-xl">fit-track</a>
    //   </div>
    //   <div className="flex-none">
    // <div className="dropdown dropdown-end">
    //   <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //     <div className="w-10 rounded-full">
    //       <Image
    //         className="rounded-full"
    //         height="30"
    //         width="30"
    //         alt="Avatar"
    //         src={currentUser?.image || "/images/placeholder.jpg"}
    //       />
    //     </div>
    //   </label>
    //   <ul
    //     tabIndex={0}
    //     className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
    //   >
    //     <li>
    //       <a className="justify-between">
    //         Profile
    //         <span className="badge">New</span>
    //       </a>
    //     </li>
    //     <li>
    //       <a>Settings</a>
    //     </li>
    //     <li>
    //       <a>Logout</a>
    //     </li>
    //   </ul>
    // </div>
    //   </div>
    // </div>

    <div className="drawer drawer-mobile ">
      <input
        id="my-drawer-2"
        type="checkbox"
        checked={toggleDrawer.isOpen}
        className="drawer-toggle"
      />
      <div className="drawer-content ">
        {/* <!-- Page content here --> */}
        {/* <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
        <div className="navbar bg-base-100 visible lg:invisible">
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={() =>
                toggleDrawer.isOpen
                  ? toggleDrawer.onClose()
                  : toggleDrawer.onOpen()
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
          </div>
          <div className="flex-none"></div>
        </div>
        <PageWrapper>{children}</PageWrapper>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          onClick={() =>
            toggleDrawer.isOpen ? toggleDrawer.onClose() : toggleDrawer.onOpen()
          }
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-56 bg-base-100 text-base-content">
          {/* <!-- Sidebar content here --> */}
          {/* <li>
            <Link href={"/journal"}>New Workout</Link>
          </li>
          <li>
            <Link href={"/workouts"}>Profile</Link>
          </li> */}
          {!currentUser ? (
            <div>
              <button
                onClick={() => registerModal.onOpen()}
                className=" px-2 py-1 "
              >
                Register
              </button>
              <button
                onClick={() => loginModal.onOpen()}
                className=" px-2 py-1 "
              >
                Login
              </button>
              <button onClick={() => signIn("google")} className=" px-2 py-1 ">
                Login with Google
              </button>
            </div>
          ) : (
            <div>
              <li>
                <Link href={"/journal"}>Workout</Link>
              </li>
              <li>
                <Link href={"/workouts"}>Profile</Link>
              </li>
              <button onClick={() => signOut()} className=" px-2 py-1 ">
                Sign out
              </button>
              <li>
                <Image
                  className="rounded-full"
                  height="30"
                  width="30"
                  alt="Avatar"
                  src={currentUser?.image || "/images/placeholder.jpg"}
                />
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>

    // <div className="flex justify-between bg-purple-500 py-4">
    //   <div>
    //     <Link href={"/"}>
    //       <button className=" px-2 py-1 text-white">Home</button>
    //     </Link>
    //     <Link href={"/workouts"}>
    //       <button className=" px-2 py-1 text-white">workouts</button>
    //     </Link>
    //   </div>
    //   <div>
    //     {!currentUser ? (
    //       <div>
    //         <button
    //           onClick={() => registerModal.onOpen()}
    //           className=" px-2 py-1 text-white"
    //         >
    //           Register
    //         </button>
    //         <button
    //           onClick={() => loginModal.onOpen()}
    //           className=" px-2 py-1 text-white"
    //         >
    //           Login
    //         </button>
    //         <button
    //           onClick={() => signIn("google")}
    //           className=" px-2 py-1 text-white"
    //         >
    //           Login with Google
    //         </button>
    //       </div>
    //     ) : (
    //       <>
    //         <button onClick={() => signOut()} className=" px-2 py-1 text-white">
    //           Sign out
    //         </button>
    // <Image
    //   className="rounded-full"
    //   height="30"
    //   width="30"
    //   alt="Avatar"
    //   src={currentUser?.image || "/images/placeholder.jpg"}
    // />
    //       </>
    //     )}

    //     {currentUser && `logged in as ${currentUser.name} `}
    //   </div>
    // </div>
  );
}
