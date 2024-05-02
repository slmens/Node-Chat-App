import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  console.log("protectRoute");
  try {
    //const token = req.cookies["token"];

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found!" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.error("Error protecting route:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { protectRoute };
