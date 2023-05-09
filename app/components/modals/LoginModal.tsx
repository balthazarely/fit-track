"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../UI/Modal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.refresh();
        loginModal.onClose();
      }
      if (callback?.error) {
        console.log("login ERROROORR!");
      }
    });
  };
  return (
    <Modal isModalOpen={loginModal.isOpen}>
      <h1>Login</h1>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="email"
            disabled={isLoading}
            {...register("email", { required: true })}
            placeholder="email"
            type="email"
            className="border-2 "
          />

          <input
            id="password"
            disabled={isLoading}
            {...register("password", { required: true })}
            placeholder="password"
            type="password"
            className="border-2 "
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <button onClick={() => loginModal.onClose()}>Close</button>
    </Modal>
  );
}
