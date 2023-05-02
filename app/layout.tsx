import getCurrentUser from "./actions/getCurrentUser";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import Navbar from "./components/navigation/Navbar";
import "./globals.css";

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
        <Navbar currentUser={currentUser} />
        <div>{children}</div>
        <RegisterModal />
        <LoginModal />
      </body>
    </html>
  );
}
