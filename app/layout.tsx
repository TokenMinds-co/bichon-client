import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ParticleConnectkit } from "@/providers/connectkit";
import Link from "next/link";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="flex items-center justify-between bg-gray-800 p-5">
          <Link href="/" className="text-white text-2xl">
            Bichon Defender
          </Link>
          <div className="flex items-center space-x-5">
            <Link
              href="/dashboard"
              className="text-white hover:underline"
              aria-label="Dashboard"
            >
              Dashboard
            </Link>
            <Link
              href="/support"
              className="text-white hover:underline"
              aria-label="Support"
            >
              Support
            </Link>
          </div>
        </nav>
        <ParticleConnectkit>{children}</ParticleConnectkit>
      </body>
    </html>
  );
}
