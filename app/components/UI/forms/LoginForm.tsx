"use client";

import { FieldValues, useForm } from "react-hook-form";

export default function LoginForm({ onSubmit, isLoading }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-6">
      <label className="text-sm ">Email</label>
      <input
        id="email"
        disabled={isLoading}
        {...register("email", { required: true })}
        type="email"
        className="border-2 mt-1 py-1 px-2 bg-base-200 "
      />
      <label className="text-sm mt-4 ">Password</label>
      <input
        id="password"
        disabled={isLoading}
        {...register("password", { required: true })}
        type="password"
        className="border-2 mt-1 py-1 px-2 bg-base-200 "
      />
      <button
        type="submit"
        className={`btn btn-primary w-full mt-4 ${isLoading ? "loading" : ""}`}
      >
        Login
      </button>
    </form>
  );
}
