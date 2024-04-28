import Conversation from "../models/conversation.model.js";

export const getConversations = async (req, res) => {
  try {
    const { id: userId } = req.params;

    if (userId) {
      const conversations = await Conversation.find({
        members: { $in: [userId] },
      });

      res.status(200).json(conversations);
    } else {
      res.status(400).json({ message: "Invalid user ID" });
    }
  } catch (error) {
    console.error("Error getting conversations:", error);
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};
