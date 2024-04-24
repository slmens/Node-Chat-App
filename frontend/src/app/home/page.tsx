"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContextProvider, useAuthContext } from "@/context/AuthContext";

function Home() {
  const router = useRouter();
  const authContext = useAuthContext();
  const user = authContext ? authContext.user : null;

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return <AuthContextProvider>{user && <div>Home</div>}</AuthContextProvider>;
}

export default Home;
