"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChatNavigation from "@/components/ChatLayout/ChatNavigation";
import Chat from "@/components/ChatLayout/Chat";
import { ChatProvider } from "@/context/ChatContext";

function Home() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || token === "" || token === undefined || token === null) {
      router.push("/");
    } else {
      setAuthorized(true);
    }
  }, []);

  return (
    authorized && (
      <div
        id="homePageContainer"
        className="w-screen h-screen flex justify-center items-center"
      >
        <ChatProvider>
          <ChatNavigation />
          <Chat />
        </ChatProvider>
      </div>
    )
  );
}

export default Home;
