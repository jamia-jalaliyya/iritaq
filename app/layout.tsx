import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IRITAQ - Institute of Qur'anic Studies",
  description: "Advancing Knowledge Through Excellence in Qur'anic Studies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#faf8f5] text-slate-800">
        {/* Navbar will appear at the top of every page */}
        <Navbar />
        
        {/* Main page content will render here */}
        <main className="flex-1">{children}</main>

        {/* Footer will appear at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}