"use client";
import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "@/context/ChatContext";
import { createMessage, getMessages } from "@/service/Message.service";
import { deleteConversation } from "@/service/Conversation.service";
import { ListenIncomingMessages } from "@/service/SocketService";

function Chat() {
  const userId = localStorage.getItem("userId");
  const chatScrollContainerRef = useRef(null);

  ListenIncomingMessages();

  const {
    currentConversation,
    setCurrentConversation,
    setUpdateConversations,
  } = useChatContext();
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = async () => {
    if (messageToSend === "") return;
    // Send message to the current chat

    if (!currentConversation.receiverId) return;

    const messageResult = await createMessage(
      messageToSend,
      currentConversation.selectedConversationId,
      currentConversation.receiverId
    );

    if (messageResult) {
      // Message sent successfully
      setMessageToSend("");
    }
  };

  const handleDeleteChat = async () => {
    if (!currentConversation.selectedConversationId) return;
    const deleteResult = await deleteConversation(
      currentConversation.selectedConversationId
    );
    if (deleteResult) {
      await setCurrentConversation({
        selectedConversationId: null,
        receiverId: null,
        messages: [],
      });
      await setUpdateConversations((prev: any) => !prev);
    }
  };

  useEffect(() => {
    const fetchMessagesResult = async () => {
      if (currentConversation.selectedConversationId == null) return;

      const result = await getMessages(currentConversation.receiverId);

      if (result) {
        // Set the messages to the current conversation
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: result,
        }));
      } else {
        console.log("Failed to fetch messages");
      }
    };

    fetchMessagesResult();
  }, [currentConversation.selectedConversationId]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messages change
    if (chatScrollContainerRef.current) {
      (chatScrollContainerRef.current as HTMLElement).scrollTop = (
        chatScrollContainerRef.current as HTMLElement
      ).scrollHeight;
    }
  }, [currentConversation.messages]);

  return (
    <div className="h-full bg-cyan-950 w-full flex flex-col justify-center items-center relative">
      <div className="w-fit flex flex-col justify-center items-center gap-2 px-10 bg-black py-2 rounded-b-2xl rounded-lg-2xl">
        <h1>
          {currentConversation.receiverId && (
            <>{currentConversation.receiverId}</>
          )}
        </h1>
        {currentConversation.selectedConversationId && (
          <button onClick={handleDeleteChat}>Delete</button>
        )}
      </div>

      <div
        id="chatScrollContainer"
        ref={chatScrollContainerRef}
        className="h-full w-full px-10 overflow-y-auto mb-16"
      >
        {currentConversation.messages.map((message: any) => (
          <div
            key={message._id}
            className={`flex w-full ${
              message.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                message.senderId === userId
                  ? "bg-cyan-700 text-white rounded-br-none"
                  : "bg-cyan-700 text-white rounded-bl-none"
              } p-2 rounded-xl m-2`}
            >
              {message.message}
            </div>
          </div>
        ))}
      </div>

      <div id="chatInputContainer" className="flex absolute bottom-0 w-full">
        <input
          value={messageToSend}
          onChange={(e) => setMessageToSend(e.target.value)}
          id="chatInput"
          type="text"
          placeholder="Type your message here..."
          className="w-full h-12 bg-cyan-900 text-white px-4"
        />
        <button
          onClick={sendMessage}
          id="chatSendButton"
          className="w-32 h-12 bg-cyan-800 text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
