"use client";
import React, { useEffect, useState, useRef } from "react";
import { useChatContext } from "@/context/ChatContext";
import { createMessage, getMessages } from "@/service/Message.service";
import { deleteConversation } from "@/service/Conversation.service";
import { ListenIncomingMessages } from "@/service/SocketService";
import Message from "../Reusables/Message";
import { RiDeleteBinFill } from "react-icons/ri";

function Chat() {
  const userId = localStorage.getItem("userId");
  const chatScrollContainerRef = useRef(null);
  const [screenWidth] = useState(window.innerWidth);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [isDeletingConversation, setIsDeletingConversation] = useState(false);
  const [messageToSend, setMessageToSend] = useState("");

  ListenIncomingMessages();

  const {
    currentConversation,
    setCurrentConversation,
    setUpdateConversations,
    setShowDropdown,
    showDropdown,
    currentPage,
  } = useChatContext();

  const sendMessage = async () => {
    if (!isSendingMessage && messageToSend.trim() !== "") {
      // Check if message is being sent and if the message is not empty
      setIsSendingMessage(true); // Set the sending message state to true

      try {
        const messageResult = await createMessage(
          messageToSend,
          currentConversation.selectedConversationId,
          currentConversation.receiverId
        );

        if (messageResult) {
          setMessageToSend(""); // Clear the message input
          setUpdateConversations((prev: any) => !prev); // Update conversation to fetch new messages
        }
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsSendingMessage(false); // Reset the sending message state
      }
    }
  };

  const handleDeleteChat = async () => {
    if (!currentConversation.selectedConversationId || isDeletingConversation)
      return;
    setIsDeletingConversation(true);

    try {
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
    } catch (error) {
      console.error("Error deleting conversation:", error);
    } finally {
      setIsDeletingConversation(false);
    }
  };

  const handleDropdown = async () => {
    const dropdown = document.getElementById("chatNavigationContainer");

    if (dropdown) {
      if (showDropdown) {
        setShowDropdown(false);
        dropdown.style.display = "none";
      } else {
        setShowDropdown(true);
        dropdown.style.display = "flex";
        dropdown.style.position = "absolute";
        dropdown.style.zIndex = "3";
        dropdown.style.top = "0";
        dropdown.style.left = "0";
      }
    }
  };

  useEffect(() => {
    const fetchMessagesResult = async () => {
      if (currentConversation.selectedConversationId == null) return;

      const result = await getMessages(
        currentConversation.receiverId,
        currentPage
      );

      if (result) {
        // Set the messages to the current conversation
        setCurrentConversation((prev: any) => ({
          ...prev,
          messages: prev.messages.concat(result),
        }));
      } else {
        console.log("Failed to fetch messages");
      }
    };

    fetchMessagesResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {screenWidth < 768 && (
        <div>
          <button
            onClick={handleDropdown}
            className="absolute top-0 left-0 text-xl bg-black text-white p-2 rounded-br-2xl rounded-lg-2xl"
          >
            {">"}
          </button>
        </div>
      )}

      <div className="w-fit flex justify-center items-center gap-4 px-10 bg-black py-2 rounded-b-2xl rounded-lg-2xl">
        {currentConversation.receiverId && (
          <h1 id="currentChatReceiver" className="">
            {currentConversation.conversationName}
          </h1>
        )}

        {currentConversation.selectedConversationId && (
          <button
            disabled={isDeletingConversation}
            id="currentChatDeleteBtn"
            onClick={handleDeleteChat}
            className="text-2xl"
          >
            <RiDeleteBinFill />
          </button>
        )}
      </div>

      <div
        id="chatScrollContainer"
        ref={chatScrollContainerRef}
        className="h-full w-full px-10 overflow-y-auto mb-16"
      >
        {currentConversation.messages.map((message: any) => (
          <Message key={message._id} message={message} userId={userId} />
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
          className="w-32 h-12 bg-cyan-900 text-white"
          disabled={isSendingMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
