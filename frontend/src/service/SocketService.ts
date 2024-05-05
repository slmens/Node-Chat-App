import { useSocketContext } from "../context/SocketContext";
import { useChatContext } from "../context/ChatContext";
import { useEffect } from "react";

export const ListenIncomingMessages = () => {
  const { socket } = useSocketContext();
  const {
    currentConversation,
    setCurrentConversation,
    conversations,
    setUpdateConversations,
    setUpdateUnreadMessages,
  } = useChatContext();

  useEffect(() => {
    socket?.on("newMessage", (message: any) => {
      if (currentConversation.receiverId === message.senderId) {
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      } else {
        // create conversation
        const conversation = conversations.find(
          (c: any) => c.conversationId === message.conversationId
        );

        if (!conversation) {
          setUpdateConversations((prev: boolean) => !prev);
          setUpdateUnreadMessages((prev: boolean) => !prev);
        }
      }
    });

    socket?.on("sentMessage", (message: any) => {
      if (currentConversation.receiverId === message.receiverId) {
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: [...prev.messages, message],
        }));
      }
    });

    socket?.on("deleteConversation", async (conversationId: any) => {
      await setUpdateConversations((prev: boolean) => !prev);
      await setCurrentConversation((prev: any) => ({
        selectedConversationId: null,
        receiverId: null,
        messages: [],
      }));
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("sentMessage");
      socket?.off("deleteConversation");
    };
  }, [socket, currentConversation, setCurrentConversation]);
};

export default ListenIncomingMessages;
