"use client";

import LoginForm from "@/components/Auth/LoginForm";
import { useRouter } from "next/navigation";
import React from "react";

function Login() {
  const router = useRouter();

  const handleRedirectToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <LoginForm />
      <button className="" onClick={handleRedirectToRegister}>
        Doesn&apos;t have an account?
      </button>
    </div>
  );
}

export default Login;

// middleware lazım
// https://www.youtube.com/watch?v=y99YgaQjgx4
// https://www.youtube.com/watch?v=nYsw2mQ7J6Q&list=PLq8u_jCKAEZozLNUmGTQR0EbKJueE-DXz
// https://www.youtube.com/watch?v=HwCqsOis894 socket kısmı
