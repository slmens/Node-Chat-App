import axios from "axios";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default AxiosInstance;
