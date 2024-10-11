import type { Metadata } from "next";
import "./globals.css";
import { ParticleConnectkit } from "@/providers/connectkit";
import Navbar from "@/components/shared/Navbar";
import ReactQueryProvider from "@/providers/tanstack";
import { Toaster } from "@/components/ui/sooner";
import { Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AOSInit } from "@/components/shared/AOS";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
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
        className={`${plusJakartaSans.variable} ${spaceMono.variable} antialiased bg-[#000A19]`}
      >
        <ParticleConnectkit>
          <ReactQueryProvider>
            <AOSInit />
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
            <Toaster />
            <Navbar />
            {children}
          </ReactQueryProvider>
        </ParticleConnectkit>
      </body>
    </html>
  );
}
