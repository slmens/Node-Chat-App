"use client";
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

const AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
