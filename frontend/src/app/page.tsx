"use client";

import LoginForm from "@/components/Auth/LoginForm";
import RegistrationForm from "@/components/Auth/RegisterForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./globals.css";
import LoadingBar from "../components/Reusables/LoadingBar";

function Login() {
  const router = useRouter();
  const [notAuthorized, setNotAuthorized] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/home");
      setNotAuthorized(false);
    } else {
      setNotAuthorized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    notAuthorized && (
      <div
        id="loginContainer"
        className="w-screen h-screen flex justify-center items-center bg-black"
      >
        {loading && <LoadingBar />}
        <div
          id="loginInnerContainer"
          className="relative min-w-84 min-h-fit flex flex-col gap-7 justify-center items-center bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-8 shadow-lg"
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
          {isRegister ? (
            <RegistrationForm loading={loading} setLoading={setLoading} />
          ) : (
            <LoginForm loading={loading} setLoading={setLoading} />
          )}
        </div>
      </div>
    )
  );
}

export default Login;
