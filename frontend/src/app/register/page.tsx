"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/Auth/RegisterForm";

function Register() {
  const router = useRouter();

  const handleRedirectToRegister = () => {
    router.push("/");
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <RegisterForm />
      <button className="" onClick={handleRedirectToRegister}>
        Do you have an account?
      </button>
    </div>
  );
}

export default Register;
