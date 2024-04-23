import Conversation from "../models/Conversation.js";
import Message from "../models/message.model";

export const createMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
      });
      await conversation.save();
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);

      await Promise.all([newMessage.save(), conversation.save()]);

      res.status(201).json(newMessage);
    } else {
      res.status(400).json({ message: "Message could not be sent" });
    }
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
