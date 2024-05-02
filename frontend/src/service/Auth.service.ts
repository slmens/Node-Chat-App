import axios from "axios";
import { useSocketContext } from "../context/SocketContext";
import AxiosInstance from "./AxiosInstance";

export const Login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<boolean> => {
  try {
    const response = await AxiosInstance.post("auth/login", {
      username,
      password,
    });

    if (response.status === 200) {
      if (response.data.userId) {
        const exValue = localStorage.getItem("userId");
        if (!exValue) {
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          return true;
        } else {
          return false;
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const Register = async ({
  fullname,
  username,
  password,
  passwordConfirm,
}: {
  fullname: string;
  username: string;
  password: string;
  passwordConfirm: string;
}): Promise<boolean> => {
  try {
    const response = await AxiosInstance.post("auth/signup", {
      fullname,
      username,
      password,
      passwordConfirm,
    });

    if (response.status === 201) {
      if (response.data.userId.length > 0) {
        const exValue = localStorage.getItem("userId");
        if (!exValue) {
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);
          return true;
        } else {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const Logout = async () => {
  try {
    const response = await AxiosInstance.post("auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("userId");
      localStorage.removeItem("token");

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
