import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Go - Find Your Future",
  description: "Book your college admission today.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" />
        </NextAuthProvider>
      </body>
    </html>
  );
}