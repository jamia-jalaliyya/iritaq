import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  metadataBase: new URL('https://iritaq.info'),
  title: {
    default: ' IRITAQ ',
    template: '%s | INTERNATIONAL RESEARCH INSTITUTE FOR TAFSIR AL-QURAN',
  },
  description: 'The International Research Institute for Tafsir al-Quran (IRITAQ) is a premier international academic and research institution established under the auspices of Al-Jamia Al-Jalaliyya in Kerala, India. As a flagship initiative of the Syed Muhammad Ali Shihab Thangal Research Consortium',
  alternates: {
    canonical: './',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
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