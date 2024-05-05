import React from "react";

// eğer bir conversationdaki mesajın senderidsi localstorage'ımdaki ile aynı ise gönderilmiş şekilde gösterilecek
// değilse alınmış şekilde gösterilecek

function Message({ message, userId }: { message: any; userId: string | null }) {
  return (
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
  );
}

export default Message;
