import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SocketContextProvider } from "@/context/SocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "Created with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SocketContextProvider>{children}</SocketContextProvider>
      </body>
    </html>
  );
}
