import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Cursor from "@/components/ui/Cursor";
import BackgroundOrbs from "@/components/ui/BackgroundOrbs";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockVerdict | Clarity before you invest",
  description: "AI-powered stock analysis platform helping you decide whether to BUY, HOLD, or AVOID.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans relative">
        <BackgroundOrbs />
        <Cursor />
        <Navbar />
        <main className="flex-grow pt-24 z-10 w-full">{children}</main>
      </body>
    </html>
  );
}
