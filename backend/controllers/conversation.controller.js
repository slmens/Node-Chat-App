import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// get all conversation without messages
export const getConversations = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (userId) {
      // Define projection to exclude the 'messages' field
      const projection = { messages: 0 };

      // Fetch conversations without populating the 'messages' field
      const conversations = await Conversation.find(
        { members: { $in: [userId] } },
        projection // Apply projection to exclude the 'messages' field
      );

      res.status(200).json(conversations);
    } else {
      res.status(400).json({ message: "Invalid user ID" });
    }
  } catch (error) {
    console.error("Error getting conversations:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// get spesific conversation with messages

export const getConversation = async (req, res) => {};

export const deleteConversation = async (req, res) => {
  try {
    const { receiverId, senderId } = req.params;

    if (receiverId && senderId) {
      // Conversation'ı sil
      const conversation = await Conversation.findOneAndDelete({
        members: { $all: [receiverId, senderId] },
      });

      if (conversation) {
        // Conversation silindi, şimdi ilişkili mesajları bul ve sil
        const messageIds = conversation.messages.map((message) => message.$oid);
        await Message.deleteMany({ _id: { $in: messageIds } });

        res
          .status(200)
          .json({ message: "Conversation and related messages deleted" });
      } else {
        res.status(404).json({ message: "Conversation not found" });
      }
    }
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createConversation = async (req, res) => {
  try {
    // oluşturan kişinin idsi ve alıcı kişinin idsi
    const { createrId, receiverId } = req.body;

    if (createrId && receiverId) {
      if (createrId === receiverId) {
        res
          .status(400)
          .json({ message: "You cannot create a conversation with yourself" });
      } else {
        const conversationExists = await Conversation.findOne({
          members: { $all: [createrId, receiverId] },
        });

        if (conversationExists) {
          return res
            .status(400)
            .json({ message: "Conversation already exists" });
        }

        const conversation = await Conversation.create({
          members: [createrId, receiverId],
        });

        await conversation.save();

        res.status(201).json(conversation);
      }
    } else {
      res.status(400).json({ message: "Invalid data" });
    }
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({
      message:
        "Input must be a 24 character hex string, 12 byte Uint8Array, or an integer",
    });
  }
};
