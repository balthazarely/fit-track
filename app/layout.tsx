import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
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
      <body className="r">
        {currentUser ? (
          <Navbar currentUser={currentUser}>{children}</Navbar>
        ) : (
          <LoginPage />
        )}
        <RegisterModal />
        <LoginModal />
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
