import type { Metadata } from "next";
import "./globals.css";
import { SocketContextProvider } from "@/context/SocketContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { AuthContextProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

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
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              style: {
                background: "#363636",
                color: "#fff",
              },
            },
            error: {
              duration: 6000,
              style: {
                textAlign: "center",
                background: "#363636",
                color: "#fff",
              },
            },
          }}
        />
        <AuthContextProvider>
          <SocketContextProvider>{children}</SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
