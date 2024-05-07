"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

let API_URL: string | undefined;

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

export const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }

  return context;
};

export const SocketContextProvider = ({ children }: any) => {
  //const { user } = useAuthContext();
  const [socket, setSocket] = useState<any>(null);
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only in the client-side context
      return localStorage.getItem("userId") || null;
    }
    return ""; // Provide a default value for SSR or server-side execution
  });
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    if (!socket && user && API_URL) {
      const socket = io(API_URL, {
        query: {
          userId: user,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users: any) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }

      return () => {};
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
