import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ParticleConnectkit } from "@/providers/connectkit";
import Navbar from "@/components/shared/Navbar";
// import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bichon Defender",
  description: "Solana Presale Bichon Defender",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800`}
      >
        <ParticleConnectkit>
          <Navbar />
          {children}
        </ParticleConnectkit>
      </body>
    </html>
  );
}
