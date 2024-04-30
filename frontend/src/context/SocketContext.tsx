"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";

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
    if (!socket && user) {
      const socket = io("http://localhost:5000", {
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
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
