import getCurrentUser from "./actions/getCurrentUser";
import Navbar from "./components/navigation/Navbar";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import LoginPage from "./components/UI/LoginPage";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <head />
      <body>
        {currentUser ? (
          <Navbar currentUser={currentUser}>{children}</Navbar>
        ) : (
          <LoginPage />
        )}
        <Toaster position="top-center" toastOptions={toastConfig} />
      </body>
    </html>
  );
}

const toastConfig = {
  success: {
    iconTheme: {
      primary: "#a991f7",
      secondary: "white",
    },
    style: {
      background: "#3d4451",
      color: "white",
      zIndex: 100,
    },
  },
};
