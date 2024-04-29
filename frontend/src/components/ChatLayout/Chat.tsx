"use client";
import React, { useEffect, useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { createMessage, getMessages } from "@/service/Message.service";
import { ListenIncomingMessages } from "@/service/SocketService";

function Chat() {
  const userId = localStorage.getItem("userId");

  ListenIncomingMessages();

  const { currentConversation, setCurrentConversation } = useChatContext();
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = async () => {
    if (messageToSend === "") return;
    // Send message to the current chat

    if (!currentConversation.selectedConversationId) return;

    const messageResult = await createMessage(
      messageToSend,
      currentConversation.selectedConversationId
    );

    if (messageResult) {
      // Message sent successfully
      setMessageToSend("");
    }
  };

  useEffect(() => {
    const fetchMessagesResult = async () => {
      if (currentConversation.selectedConversationId == null) return;

      const result = await getMessages(
        currentConversation.selectedConversationId
      );

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

    console.log(currentConversation);
  }, [currentConversation.selectedConversationId]);

  // chat açıldığı anda currentConversationın idsini kullanarak mesajları çekecek
  // ve currentConversationın mesajlarına atacak
  // bu sayede chat açıldığı anda mesajlar görünecek
  // ve mesaj atıldığı zaman bu mesajlar hem dbye hem de birbirimize gidicek

  // mesaj atıldığı zaman bütün chatleri yenilemek yerine sadece o chati yenilemek daha mantıklı olabilir
  // bu yüzden her mesaj atıldığı zaman bu conversationın mesajlarını çekeyim
  // sonra global conversationdaki bu conversationı bulup yeni conversationı veya mesajlarını koyayım
  // bu sayede şuanki conversation güncellenmiş olur ve diğer conversationların mesajları boşu boşuna tekrar çekilmez

  return (
    <div className="h-full bg-cyan-950 w-full flex flex-col relative">
      <h1>{currentConversation.selectedConversationId || ""}</h1>

      <div
        id="chatScrollContainer"
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
                  ? "bg-cyan-800 text-white rounded-br-none"
                  : "bg-cyan-700 text-black rounded-bl-none"
              } p-2 rounded-lg m-2`}
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
