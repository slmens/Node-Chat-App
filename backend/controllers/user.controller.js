import User from "../models/user.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const conversations = await Conversation.find({
      members: { $all: [loggedInUserId] },
    });

    // Tüm konuşmalara ait üye ID'lerini topla
    const allMemberIds = conversations.flatMap(
      (conversation) => conversation.members
    );
    // Kendi ID'sini ve tekrar edenleri çıkar
    const uniqueMemberIds = Array.from(
      new Set(allMemberIds.filter((memberId) => memberId !== loggedInUserId))
    );

    // Bu uniqueMemberIds dizisinde bulunan kullanıcıları al
    const users = await User.find({ _id: { $in: uniqueMemberIds } });

    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ message: "Users not found" });
    }
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
