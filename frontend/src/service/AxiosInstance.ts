import axios from "axios";

const token = localStorage.getItem("token");

const AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export default AxiosInstance;
