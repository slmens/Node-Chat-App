import { Logout } from "@/service/Auth.service";
import React from "react";
import { useRouter } from "next/navigation";
import { createConversation } from "@/service/Conversation.service";

function ChatNavigation() {
  const router = useRouter();

  const logOut = async () => {
    const logOutResult = await Logout();
    if (logOutResult) router.push("/");
  };

  const createNewConversation = () => {
    const createrId = localStorage.getItem("userId");
    const receiverId = prompt("Enter receiver id");

    if (createrId && receiverId) {
      createConversation(createrId, receiverId);
    }
  };

  return (
    <div
      id="chatNavigationContainer"
      className="bg-cyan-700 w-[35%] h-full pt-10 px-8"
    >
      <div id="chatNavigationInnerContainer" className="h-full w-full">
        <div
          id="chatNavigationTop"
          className="h-[15%] bg-cyan-300 w-full flex justify-between px-5"
        >
          {/* kullanıcının ismi chat ekleme butonu */}
          <button onClick={logOut} className="text-black">
            Log Out
          </button>
          <button
            id="addChat"
            className="text-black"
            onClick={createNewConversation}
          >
            NEW CHAT
          </button>
        </div>
        <div id="chatNavigationBottom" className="h-[85%] w-full bg-cyan-400">
          {/* chat listesi ve search function*/}
          <h1>b</h1>
        </div>
      </div>
    </div>
  );
}

export default ChatNavigation;
