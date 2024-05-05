import type { Metadata } from "next";
import "./globals.css";
import { SocketContextProvider } from "@/context/SocketContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Chat App",
  description: "Created with NextJS",
};

if (process.env.NODE_ENV == "production") {
  disableReactDevTools();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <SocketContextProvider>{children}</SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
