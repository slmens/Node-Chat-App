import { Logout } from "@/service/Auth.service";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createConversation,
  getConversations,
} from "@/service/Conversation.service";
import ChatContainer from "@/components/Reusables/ChatContainer";
import { useChatContext } from "@/context/ChatContext";

function ChatNavigation() {
  const createrId = localStorage.getItem("userId");
  const {
    conversations,
    setConversations,
    updateConversations,
    setUpdateConversations,
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

  useEffect(() => {
    const fetchConversations = async () => {
      if (!createrId) return;
      const conversations = await getConversations(createrId);
      setConversations(conversations);
    };

    fetchConversations();
  }, [updateConversations]);

  return (
    <div id="chatNavigationContainer" className="w-[35%] h-full pt-10 bg-black">
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
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatNavigation;
