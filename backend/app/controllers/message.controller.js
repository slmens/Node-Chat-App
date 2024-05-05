import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import User from "../models/user.model.js";
import { ObjectId } from "mongodb";

const PAGE_SIZE = 20;

export const createMessage = async (req, res) => {
  try {
    const { message, conversationId } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        members: [senderId, receiverId],
        unreadMessages: 1, // Yeni konuşma oluşturulduğunda okunmamış mesaj sayısını 1 olarak başlat
      });
      await conversation.save();
    } else {
      conversation.unreadMessages++; // Konuşma varsa okunmamış mesaj sayısını artır
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      conversationId,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);

      await Promise.all([newMessage.save(), conversation.save()]);

      const user = await User.findById(receiverId);

      if (user) {
        const unreadMessagesIndex = user.unreadMessages.findIndex(
          (unreadMessage) =>
            unreadMessage.conversationId.toString() === conversationId
        );

        if (unreadMessagesIndex !== -1) {
          user.unreadMessages[unreadMessagesIndex].count++;
        } else {
          user.unreadMessages.push({ conversationId, count: 1 });
        }

        await user.save();
      }

      const receiverSocketId = getReceiverSocketId(receiverId);

      const senderSocketId = getReceiverSocketId(senderId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      if (senderSocketId) {
        io.to(senderSocketId).emit("sentMessage", newMessage);
      }

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
    const { page } = req.query;

    if (!receiverId)
      return res.status(400).json({ message: "Invalid receiver" });

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      options: {
        limit: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE, // page, kullanıcının talep ettiği sayfa numarası
      },
    });

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUnreadMessages = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { conversationId } = req.params;

    const user = await User.findById(loggedInUserId);

    const objectConversationId = ObjectId.createFromHexString(conversationId);

    const unreadMessage = user.unreadMessages.find(
      (unreadMessage) =>
        unreadMessage.conversationId.toString() ==
        objectConversationId.toString()
    );

    if (unreadMessage) {
      res.status(200).json(unreadMessage.count);
    } else {
      res.status(200).json(0);
    }
  } catch (error) {
    console.error("Error getting unread messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUnreadMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const loggedInUserId = req.user._id;

    const user = await User.findById(loggedInUserId);

    const updatedUnreadMessages = user.unreadMessages.filter(
      (unreadMessage) =>
        unreadMessage.conversationId.toString() !== conversationId
    );

    user.unreadMessages = updatedUnreadMessages;
    await user.save();

    res.status(200).json({ message: "Unread messages deleted" });
  } catch (error) {
    console.error("Error deleting unread messages:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
