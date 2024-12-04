import Navbar from "@/components/Navbar";
import "./globals.css";
import { RootLayoutClient } from "@/components/RootLayoutClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <RootLayoutClient>
          <ToastContainer theme="dark" />
          <Navbar />
          <main className="flex-grow">{children}</main> <Footer />
        </RootLayoutClient>
      </body>
    </html>
  );
}
