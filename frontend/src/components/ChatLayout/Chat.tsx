"use client";
import React, { useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import { createMessage, getMessages } from "@/service/Message.service";

function Chat() {
  const userId = localStorage.getItem("userId");

  const { currentChatId, setConversations, conversations } = useChatContext();
  const [messageToSend, setMessageToSend] = useState("");

  const sendMessage = async () => {
    if (messageToSend === "") return;
    // Send message to the current chat

    const messageResult = await createMessage(messageToSend, currentChatId);

    if (messageResult) {
      // Message sent successfully
      setMessageToSend("");
    }
  };

  // mesaj atıldığı zaman bütün chatleri yenilemek yerine sadece o chati yenilemek daha mantıklı olabilir
  // bu yüzden her mesaj atıldığı zaman bu conversationın mesajlarını çekeyim
  // sonra global conversationdaki bu conversationı bulup yeni conversationı veya mesajlarını koyayım
  // bu sayede şuanki conversation güncellenmiş olur ve diğer conversationların mesajları boşu boşuna tekrar çekilmez

  return (
    <div className="h-full bg-cyan-950 w-full flex flex-col relative">
      <h1>{currentChatId}</h1>

      <div id="chatScrollContainer" className="h-full w-full px-10"></div>

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
