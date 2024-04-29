import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext<any>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState([]);
  const [update, setUpdate] = useState(false);
  const [currentChatId, setCurrentChatId] = useState("");

  return (
    <ChatContext.Provider
      value={{
        conversations,
        setConversations,
        update,
        setUpdate,
        currentChatId,
        setCurrentChatId,
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
