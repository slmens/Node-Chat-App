import React, { useState } from "react";
import { useChatContext } from "@/context/ChatContext";
import toast from "react-hot-toast";

const NewConversationForm = ({
  createConversation,
  setShowNewChatForm,
  createrId,
}: {
  createConversation: any;
  setShowNewChatForm: any;
  createrId: string | null;
}) => {
  const [receiverId, setReceiverId] = useState("");
  const [conversationName, setConversationName] = useState("");
  const { setUpdateConversations, setCurrentConversation } = useChatContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (receiverId && createrId) {
        const createResult = await createConversation(
          createrId,
          receiverId,
          conversationName
        );
        if (createResult) {
          await setCurrentConversation({
            selectedConversationId: createResult,
            receiverId: receiverId,
            messages: [],
          });
          toast.success("Successfully created new conversation!");
          setUpdateConversations((prev: any) => !prev);
          setShowNewChatForm(false); // Kullanıcının formu kapatmasını sağlar
        } else {
          toast.error(
            "Failed to create conversation! Input must be a valid receiver ID and it shouldn't be your or existing conversation ID!"
          );
          console.log(
            "Failed to create conversation. Input must be a valid receiver ID."
          );
        }
      }
    } catch (error) {
      toast.error("Failed to create conversation!");
      console.error("Error creating conversation:", error);
    }
  };

  return (
    <div className="z-10 absolute top-[36%] left-[4%] px-5 py-10  bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-gray-300 rounded-lg p-8 shadow-lg ">
      <div className="flex flex-col relative">
        <span
          className="cursor-pointer text-4xl absolute top-[-25px] right-[-10px]"
          onClick={() => setShowNewChatForm(false)}
        >
          &times;
        </span>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <label className="font-bold text-xl">Enter Receiver ID</label>
          <input
            className="w-60 text-black px-2 py-1 border-2 border-black rounded-md hover:border-blue-500 focus:border-blue-500"
            type="text"
            value={receiverId}
            onChange={(e) => setReceiverId(e.target.value)}
          />
          <label className="font-bold text-xl">Enter Conversation Name</label>
          <input
            className="w-60 text-black px-2 py-1 border-2 border-black rounded-md hover:border-blue-500 focus:border-blue-500"
            type="text"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />

          <button
            type="submit"
            className="text-lg border-2 border-black font-semibold px-4 py-1 rounded-md hover:bg-black hover:text-white hover:border-transparent transition-all duration-300 ease-in-out"
          >
            Create Conversation
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewConversationForm;
