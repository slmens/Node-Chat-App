import axios from "axios";

let API_URL;

const getServerSideProps = async () => {
  API_URL =
    process.env.NODE_ENV === "production"
      ? process.env.BACKEND_URL
      : process.env.LOCAL_BACKEND_URL;

  return {
    props: {
      data: "data",
    },
  };
};

getServerSideProps();

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : null;

const AxiosInstance = axios.create({
  baseURL: "https://node-chat-app-3cox.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  },
});

export default AxiosInstance;
