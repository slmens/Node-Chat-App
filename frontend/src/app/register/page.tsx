"use client";

import React from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/Auth/RegisterForm";
import { useState, useEffect } from "react";

function Register() {
  const router = useRouter();
  const [notAuthorized, setNotAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === "loggedIn") {
      router.push("/home");
      setNotAuthorized(false);
    } else {
      setNotAuthorized(true);
    }
  }, []);

  const handleRedirectToRegister = () => {
    router.push("/");
  };

  return (
    notAuthorized && (
      <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
        <RegisterForm />
        <button className="" onClick={handleRedirectToRegister}>
          Do you have an account?
        </button>
      </div>
    )
  );
}

export default Register;
