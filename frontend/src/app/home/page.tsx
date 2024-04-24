"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "" || token === undefined || token === null) {
      router.push("/");
    }
  }, []);

  return authorized && <div>Home</div>;
}

export default Home;
