import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: process.env.NODE_ENV == "development" ? false : true,
    sameSite: process.env.NODE_ENV == "development" ? "none" : "Strict",
    secure: process.env.NODE_ENV == "development" ? false : true,
  };

  res.cookie("token", token, options);
};

export default generateTokenAndSetCookie;
