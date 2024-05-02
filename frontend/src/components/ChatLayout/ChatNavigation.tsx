import { Logout } from "@/service/Auth.service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createConversation,
  getConversations,
} from "@/service/Conversation.service";
import ChatContainer from "@/components/Reusables/ChatContainer";
import { useChatContext } from "@/context/ChatContext";
import { create } from "domain";

function ChatNavigation() {
  const createrId = localStorage.getItem("userId");
  const {
    conversations,
    setConversations,
    updateConversations,
    setUpdateConversations,
    setCurrentConversation,
    setShowDropdown,
    showDropdown,
  } = useChatContext();

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
          await setCurrentConversation({
            selectedConversationId: createResult,
            receiverId: receiverId,
            messages: [],
          });
          setUpdateConversations((prev: any) => !prev);
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

  const handleDropdown = async () => {
    const dropdown = document.getElementById("chatNavigationContainer");

    if (dropdown) {
      if (showDropdown) {
        setShowDropdown(false);
        dropdown.style.display = "none";
      }
    }
  };

  useEffect(() => {
    const fetchConversations = async () => {
      if (!createrId) return;
      const conversations = await getConversations(createrId);
      setConversations(conversations);
    };

    fetchConversations();
  }, [updateConversations]);

  return (
    <div
      id="chatNavigationContainer"
      className="max-w-[90%] h-full pt-10 bg-black mx-auto sm:max-w-screen-sm"
    >
      {showDropdown && (
        <div>
          <button
            onClick={handleDropdown}
            className="absolute top-0 right-[-25px] text-xl bg-black text-white p-2 rounded-br-2xl rounded-lg-2xl"
          >
            {"<"}
          </button>
        </div>
      )}
      <div
        id="chatNavigationInnerContainer"
        className="flex flex-col gap-12 h-full w-full"
      >
        <div
          id="chatNavigationTop"
          className="h-[15%] w-full flex flex-col gap-5 justify-between items-center px-5"
        >
          <h1 className="text-center">Your ID {createrId}</h1>
          <button
            onClick={logOut}
            className="w-fit px-6 py-2 border rounded-lg"
          >
            Log Out
          </button>
          <button
            id="addChat"
            className="w-fit px-6 py-2 border rounded-lg"
            onClick={createNewConversation}
          >
            NEW CHAT +
          </button>
        </div>
        <div
          id="chatNavigationBottom"
          className="h-[85%] w-full pt-5 flex flex-col items-center gap-5 overflow-y-auto"
        >
          {conversations.map(
            (conversation: { _id: string; members: string[] }) => (
              <ChatContainer
                key={conversation._id}
                receiverId={
                  conversation.members[0] === createrId
                    ? conversation.members[1]
                    : conversation.members[0]
                }
                conversationId={conversation._id}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatNavigation;
