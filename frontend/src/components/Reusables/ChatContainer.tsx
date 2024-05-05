import React, { useEffect } from "react";
import { useChatContext } from "@/context/ChatContext";
import {
  deleteUnreadMessages,
  getUnreadMessages,
} from "@/service/Message.service";

function ChatContainer({
  receiverId,
  conversationId,
  conversationName,
}: {
  receiverId: string;
  conversationId: string;
  conversationName: string;
}) {
  const {
    setCurrentConversation,
    currentConversation,
    setShowDropdown,
    showDropdown,
    setCurrentPage,
    updateUnreadMessages,
  } = useChatContext();

  const [unreadMessages, setUnreadMessages] = React.useState<number>(0);
  const [containerColor, setContainerColor] =
    React.useState<string>("bg-gray-700");

  const handleCurrentChat = async () => {
    // tıklandığı zaman o conversationdaki unread mesajları sıfır yap

    const dropdown = document.getElementById("chatNavigationContainer");

    if (currentConversation.selectedConversationId === conversationId) return;
    if (receiverId) {
      await setCurrentConversation((prev: any) => ({
        ...prev,
        messages: [],
        selectedConversationId: conversationId,
        receiverId: receiverId,
        conversationName: conversationName,
      }));
      await setCurrentPage(1);
      const response = await deleteUnreadMessages(conversationId);

      if (response) {
        setUnreadMessages(0);
      }

      if (dropdown) {
        if (showDropdown) {
          setShowDropdown(false);
          dropdown.style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    // unread messages count çek

    const getUnreadMessagesCount = async () => {
      const response = await getUnreadMessages({ conversationId });
      if (response) {
        setUnreadMessages(response);
      }
    };

    getUnreadMessagesCount();
  }, [updateUnreadMessages]);

  useEffect(() => {
    // Set container color based on current conversation
    if (currentConversation.selectedConversationId === conversationId) {
      setContainerColor("bg-blue-500");
    } else {
      setContainerColor("bg-gray-700");
    }
  }, [currentConversation.selectedConversationId, conversationId]);

  return (
    <div
      onClick={handleCurrentChat}
      id="chatContainer"
      className={`w-fit h-fit flex gap-5 px-5 py-3 rounded-2xl text-white text-center text-sm cursor-pointer hover:bg-gray-800 transition-all duration-300 ease-in-out relative ${containerColor}`}
    >
      <h1>{conversationName}</h1>
      {unreadMessages > 0 && (
        <div className="absolute top-0 right-[-3px] bg-red-500 w-4 h-4 px-1.5 py-0.5 rounded-full text-white text-xs"></div>
      )}
    </div>
  );
}

export default ChatContainer;
