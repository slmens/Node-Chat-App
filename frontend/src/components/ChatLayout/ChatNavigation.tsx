import { Logout } from "@/service/Auth";
import React from "react";
import { useRouter } from "next/navigation";

function ChatNavigation() {
  const router = useRouter();

  const logOut = async () => {
    const logOutResult = await Logout();
    if (logOutResult) router.push("/");
  };

  return (
    <div
      id="chatNavigationContainer"
      className="bg-cyan-700 w-[35%] h-full pt-10 px-8"
    >
      <div id="chatNavigationInnerContainer" className="h-full w-full">
        <div id="chatNavigationTop" className="h-[20%] bg-cyan-300 w-full">
          {/* kullanıcının ismi chat ekleme butonu */}
          <button onClick={logOut} className="text-black">
            Log Out
          </button>
        </div>
        <div id="chatNavigationBottom" className="h-[80%] w-full bg-cyan-400">
          {/* chat listesi ve search function*/}
          <h1>b</h1>
        </div>
      </div>
    </div>
  );
}

export default ChatNavigation;
