import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext<any>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState([]);
  const [updateConversations, setUpdateConversations] = useState(false);
  const [currentConversation, setCurrentConversation] = useState({
    selectedConversationId: null,
    messages: [],
  });

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        update: updateConversations,
        setUpdate: setUpdateConversations,
        currentConversation: currentConversation,
        setCurrentConversation: setCurrentConversation,
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
