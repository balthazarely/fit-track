import { FieldValues, useForm } from "react-hook-form";

interface LoginFormProps {
  onSubmit: any;
  isLoading: boolean;
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
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
        className="input input-bordered input-primary w mt-1 py-1 px-2 bg-base-100 "
      />
      <label className="text-sm mt-4 ">Password</label>
      <input
        id="password"
        disabled={isLoading}
        {...register("password", { required: true })}
        type="password"
        className="input input-bordered input-primary  mt-1 py-1 px-2 bg-base-100 "
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
