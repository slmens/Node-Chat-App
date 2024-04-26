"use client";

import LoginForm from "@/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Login() {
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
    router.push("/register");
  };

  return (
    notAuthorized && (
      <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
        <LoginForm />
        <button className="" onClick={handleRedirectToRegister}>
          Don&apos;t you have an account?
        </button>
      </div>
    )
  );
}

export default Login;

// middleware lazım
// https://www.youtube.com/watch?v=y99YgaQjgx4
// https://www.youtube.com/watch?v=nYsw2mQ7J6Q&list=PLq8u_jCKAEZozLNUmGTQR0EbKJueE-DXz
// https://www.youtube.com/watch?v=HwCqsOis894 socket kısmı
// farklılaştır baya backendi
// Mobil ekransa left rigth diye değil başka bir page mi yaparsın artık bilmiyorum wp gibi olcak işte
