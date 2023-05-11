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
    <html
      lang="en"
      data-theme={currentUser?.colorMode ? currentUser?.colorMode : "halloween"}
    >
      <head />
      <body>
        {currentUser ? (
          <Navbar currentUser={currentUser}>{children}</Navbar>
        ) : (
          <LoginPage />
        )}
        <Toaster
          position="top-right"
          toastOptions={
            currentUser?.colorMode === "halloween"
              ? toastConfigDark
              : toastConfigLight
          }
        />
      </body>
    </html>
  );
}

const toastConfigDark = {
  success: {
    iconTheme: {
      primary: "#a9dd3d",
      secondary: "#212121",
    },
    style: {
      background: "#3d4451",
      color: "white",
      zIndex: 100,
    },
  },
};

const toastConfigLight = {
  success: {
    iconTheme: {
      primary: "#a9dd3d",
      secondary: "#212121",
    },
    style: {
      background: "#ededed",
      color: "black",
      zIndex: 100,
    },
  },
};
