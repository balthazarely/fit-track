"use client";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../UI/Modal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

export default function RegisterModal() {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

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
    console.log(data);

    axios
      .post("/api/register", data)
      .then(() => {
        console.log("logged in");
        // toast.success("Registered!");
        registerModal.onClose();
        // loginModal.onOpen();
      })
      .catch((error) => {
        // toast.error(error);
        console.log("ERRORR LOGGIN in");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isModalOpen={registerModal.isOpen}>
      <h1>Register</h1>
      <div className="flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="name"
            disabled={isLoading}
            {...register("name", { required: true })}
            placeholder="name"
            type="text"
            className="border-2 "
          />
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
          <button type="submit">Register</button>
        </form>
      </div>
      <button onClick={() => registerModal.onClose()}>Close</button>
    </Modal>
  );
}
