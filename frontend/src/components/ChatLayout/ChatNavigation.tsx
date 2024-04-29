import { Logout } from "@/service/Auth.service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createConversation,
  getConversations,
} from "@/service/Conversation.service";
import ChatContainer from "@/app/Reusables/ChatContainer";
import { useChatContext } from "@/context/ChatContext";

function ChatNavigation() {
  const createrId = localStorage.getItem("userId");
  const { conversations, setConversations, update, setUpdate } =
    useChatContext();

  const router = useRouter();

  const logOut = async () => {
    const logOutResult = await Logout();
    if (logOutResult) router.push("/");
  };

  const createNewConversation = async () => {
    const receiverId = prompt("Enter receiver id");

    try {
      if (createrId && receiverId) {
        const createResult = await createConversation(createrId, receiverId);
        if (createResult) {
          setUpdate(!update);
        } else {
          console.log(
            "Failed to create conversation.Input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      if (!createrId) return;
      const conversations = await getConversations(createrId);
      console.log(conversations);
      setConversations(conversations);
    };

    fetchConversations();
  }, [update]);

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
        <div
          id="chatNavigationBottom"
          className="h-[85%] w-full pt-5 bg-cyan-400 flex flex-col items-center gap-5"
        >
          {/* chat listesi ve search function*/}
          {conversations.map(
            (conversation: { _id: string; members: string[] }) => (
              <ChatContainer
                key={conversation._id}
                receiverId={
                  conversation.members[0] === createrId
                    ? conversation.members[1]
                    : conversation.members[0]
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatNavigation;
