import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ParticleConnectkit } from "@/providers/connectkit";

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
        <ParticleConnectkit>{children}</ParticleConnectkit>
      </body>
    </html>
  );
}
