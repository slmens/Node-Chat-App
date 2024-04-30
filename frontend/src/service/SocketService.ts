import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatContext";
import { useEffect } from "react";

export const ListenIncomingMessages = () => {
  const { socket } = useSocketContext();
  const { currentConversation, setCurrentConversation } = useChatContext();

  useEffect(() => {
    socket?.on("newMessage", (message: any) => {
      if (currentConversation.selectedConversationId === message.senderId) {
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    });

    socket?.on("sentMessage", (message: any) => {
      if (currentConversation.selectedConversationId === message.receiverId) {
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("sentMessage");
    };
  }, [socket, currentConversation, setCurrentConversation]);
};

export default ListenIncomingMessages;
