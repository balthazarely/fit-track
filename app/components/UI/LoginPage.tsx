"use client";

import { BiDumbbell } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import LoginForm from "./forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const [loginShowing, setLoginShowing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onLoginSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
      }
      if (callback?.error) {
        console.log("login ERROROORR!");
      }
    });
  };

  const onRegisterSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registered! Please sign in");
      })
      .catch((error) => {
        console.log("ERRORR LOGGIN in");
      })
      .finally(() => {
        setIsLoading(false);
        setLoginShowing(true);
      });
  };

  return (
    <>
      <div className="bg-lifter-image-wrap">
        <div className="mx-auto pt-16 max-w-xs flex justify-center flex-col ">
          {/* Content goes here */}
          <div className="font-bold flex flex-col gap-2 text-3xl text-primary mb-8 justify-center items-center ">
            <BiDumbbell className="text-5xl text-base-100 rounded-full  p-1 bg-primary" />
            <div>Welcome to Fit-Stack</div>
          </div>
          <div className="w-full relative overflow-hidden ">
            <div
              className={`transform transition-transform duration-200 px-3 py-6 ${
                loginShowing ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="font-bold text-xl text-center">
                Sign in to your account
              </div>
              <LoginForm onSubmit={onLoginSubmit} isLoading={isLoading} />
              <button
                onClick={() => setLoginShowing(false)}
                className="btn-link w-full text-sm  text-center mt-4 border-2"
              >
                Don&apos;t have an account? Sign up for a one.
              </button>
              <div className=" px-3">
                <div className="divider my-4 text-xs font-bold">OR</div>
                <button
                  className="btn btn-outline btn-ghost w-full"
                  onClick={() => signIn("google")}
                >
                  <FcGoogle className="mr-2 text-lg" />
                  Login In with Google
                </button>
              </div>
            </div>

            <div
              className={`w-full  px-3 py-6 absolute top-0 left-0 transform transition-transform duration-200 ${
                loginShowing ? "translate-x-full" : " translate-x-0"
              }`}
            >
              <div className="font-bold text-xl text-center">
                Create account
              </div>
              <RegisterForm onSubmit={onRegisterSubmit} isLoading={isLoading} />
              <button
                onClick={() => setLoginShowing(true)}
                className="btn-link text-sm w-full text-center mt-4 border-2"
              >
                Already have an account? Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
