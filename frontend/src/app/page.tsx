"use client";

import LoginForm from "@/components/Auth/LoginForm";
import RegistrationForm from "@/components/Auth/RegisterForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./globals.css";

function Login() {
  const router = useRouter();
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/home");
      setNotAuthorized(false);
    } else {
      setNotAuthorized(true);
    }
  });

  return (
    notAuthorized && (
      <div
        id="loginContainer"
        className="w-screen h-screen flex justify-center items-center "
      >
        <div
          id="loginInnerContainer"
          className="min-w-96 min-h-fit flex flex-col gap-7 justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-8 shadow-lg"
        >
          <h1 className="text-3xl font-bold">BenetChat</h1>
          <div>
            <button
              className={`border px-8 py-1 rounded-l-lg text-lg font-bold ${
                !isRegister && " bg-blue-500 text-white"
              }`}
              onClick={() => setIsRegister(false)}
            >
              Log In
            </button>
            <button
              className={`border px-8 py-1 rounded-r-lg text-lg font-bold ${
                isRegister && " bg-blue-500 text-white"
              } `}
              onClick={() => setIsRegister(true)}
            >
              Sign In
            </button>
          </div>
          {isRegister ? <RegistrationForm /> : <LoginForm />}
        </div>
      </div>
    )
  );
}

export default Login;
