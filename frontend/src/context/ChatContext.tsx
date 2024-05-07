import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext<any>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState([]);
  const [updateConversations, setUpdateConversations] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({
    selectedConversationId: null,
    conversationName: "",
    receiverId: null,
    messages: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [updateUnreadMessages, setUpdateUnreadMessages] = useState(false);
  const [scrollBottom, setScrollBottom] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        updateConversations,
        setUpdateConversations,
        currentConversation,
        setCurrentConversation,
        showDropdown,
        setShowDropdown,
        currentPage,
        setCurrentPage,
        updateUnreadMessages,
        setUpdateUnreadMessages,
        scrollBottom,
        setScrollBottom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
