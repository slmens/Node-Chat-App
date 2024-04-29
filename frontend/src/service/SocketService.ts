import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatContext";
import { useEffect } from "react";

export const ListenIncomingMessages = () => {
  const { socket } = useSocketContext();
  const { currentConversation, setCurrentConversation } = useChatContext();

  useEffect(() => {
    socket?.on("newMessage", (message: any) => {
      if (
        currentConversation.selectedConversationId === message.conversationId
      ) {
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    });

    console.log("Listening for incoming messages");

    return () => socket?.off("newMessage");
  }, [socket, currentConversation, setCurrentConversation]);
};

export default ListenIncomingMessages;
