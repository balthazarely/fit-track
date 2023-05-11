"use client";

import useToggleDrawer from "@/hooks/useToggleDrawer";
import { SafeUser } from "@/types";
import Image from "next/image";
import PageWrapper from "../UI/PageWrapper";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { IoPersonCircle, IoExitOutline } from "react-icons/io5";
import { BiDumbbell } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { FaInfoCircle } from "react-icons/fa";
import ColorModeToggle from "../UI/ColorModeToggle";

interface NavbarProps {
  currentUser: SafeUser | null;
  children: React.ReactNode;
}

export default function Navbar({ currentUser, children }: NavbarProps) {
  const toggleDrawer = useToggleDrawer();
  const pathname = usePathname();

  const currentPath = () => {
    const path = pathname?.substring(1).split("/")[0];

    return path;
  };

  const handleSignOut = async () => {
    await signOut({ redirect: true });
  };

  return (
    <div className="drawer-mobile drawer ">
      <input
        id="my-drawer-2"
        type="checkbox"
        readOnly
        checked={toggleDrawer.isOpen}
        className="drawer-toggle"
      />
      <div className="drawer-content ">
        <div className="navbar visible bg-base-100 lg:invisible">
          <div className="flex-none">
            <button
              className="btn-ghost btn-square btn"
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
                className="inline-block h-5 w-5 stroke-current"
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
            <a className="btn-ghost btn text-xl normal-case">Fit-Stack</a>
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
        <ul className="menu flex flex-col justify-between w-56 bg-base-200 p-4 text-base-content">
          <div className="">
            <div className="flex items-center justify-between gap-2 mb-6 relative">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full">
                  {currentUser?.image ? (
                    <Image
                      className="rounded-full"
                      height="50"
                      width="50"
                      alt="Avatar"
                      src={currentUser?.image || "/images/placeholder.jpg"}
                    />
                  ) : (
                    <div className="rounded-full h-[50px] w-[50px] bg-primary flex justify-center items-center text-base-100  text-2xl">
                      {currentUser?.name?.slice(0, 1)}
                    </div>
                  )}
                </div>
                <div className="flex flex-col h-full justify-center">
                  <div className="text-xs ">logged in as</div>
                  <div className="text-xs font-bold">{currentUser?.name}</div>
                </div>
              </div>
              <ColorModeToggle />
            </div>
            <li>
              <Link
                href={"/"}
                className={
                  currentPath() === "" || currentPath() === "new-workout"
                    ? "text-primary"
                    : ""
                }
                onClick={() => toggleDrawer.onClose()}
              >
                <BiDumbbell className="text-xl" />
                <div>Workout</div>
              </Link>
            </li>
            <li>
              <Link
                href={"/profile"}
                className={
                  currentPath() === "profile" || currentPath() === "workout"
                    ? "text-primary"
                    : ""
                }
                onClick={() => toggleDrawer.onClose()}
              >
                <IoPersonCircle className="text-xl" />
                <div>Profile</div>
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={currentPath() === "about" ? "text-primary" : ""}
                onClick={() => toggleDrawer.onClose()}
              >
                <FaInfoCircle className="text-xl" />
                <div>About</div>
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>
                <IoExitOutline className="text-xl" />
                <div>Sign Out</div>
              </button>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
}
