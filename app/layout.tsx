import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ParticleConnectkit } from "@/providers/connectkit";
import Navbar from "@/components/shared/Navbar";
import ReactQueryProvider from "@/providers/tanstack";
import { Toaster } from "@/components/ui/sooner";
import { Space_Mono } from "next/font/google";
// import Link from "next/link";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-mono",
});

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
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased bg-gray-800`}
      >
        <ParticleConnectkit>
          <ReactQueryProvider>
            <Toaster />
            <Navbar />
            {children}
          </ReactQueryProvider>
        </ParticleConnectkit>
      </body>
    </html>
  );
}
