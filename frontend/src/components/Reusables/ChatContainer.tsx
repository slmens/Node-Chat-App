import React from "react";
import { useChatContext } from "@/context/ChatContext";

function ChatContainer({ receiverId }: { receiverId: string }) {
  const { setCurrentConversation } = useChatContext();

  const handleCurrentChat = () => {
    if (receiverId) {
      setCurrentConversation((prev: any) => ({
        ...prev,
        selectedConversationId: receiverId,
      }));
    }
  };

  return (
    <div
      onClick={handleCurrentChat}
      id="chatContainer"
      className="w-fit h-fit px-5 py-3 bg-black rounded-2xl text-white text-center text-sm cursor-pointer hover:bg-gray-800 transition-all duration-300 ease-in-out"
    >
      <h1>{receiverId}</h1>
    </div>
  );
}

export default ChatContainer;
