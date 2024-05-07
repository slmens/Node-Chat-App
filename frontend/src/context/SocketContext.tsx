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
  //const { user } = useAuthContext();
  const [socket, setSocket] = useState<any>(null);
  const [user, setUser] = useState<any>(() => {
    if (typeof window !== "undefined") {
      // Access localStorage only in the client-side context
      return localStorage.getItem("userId") || null;
    }
    return null; // Provide a default value for SSR or server-side execution
  });
  const [onlineUsers, setOnlineUsers] = useState<any>([]);

  useEffect(() => {
    const api =
      process.env.NEXT_PUBLIC_NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_SOCKET_URL
        : process.env.NEXT_PUBLIC_LOCAL_SOCKET_URL;
    if (!socket && user && api) {
      const socket = io(api, {
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
