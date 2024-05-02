import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV == "production"
      ? "https://node-chat-app-3cox.onrender.com"
      : "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default AxiosInstance;
