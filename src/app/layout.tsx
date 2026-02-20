import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { TopNav } from "@/components/navigation/TopNav";

export const metadata: Metadata = {
  title: "RoboShare | Robot Sharing Platform",
  description: "Rent, lend, and collectively fund robots. Why own a whole robot when you can share 1/10th of one?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col h-screen bg-background text-foreground">
          <TopNav />
          {children}
        </div>
      </body>
    </html>
  );
}
