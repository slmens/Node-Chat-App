import type { Metadata } from "next";
import "./globals.css";
import { SocketContextProvider } from "@/context/SocketContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

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
        <SocketContextProvider>{children}</SocketContextProvider>
      </body>
    </html>
  );
}
