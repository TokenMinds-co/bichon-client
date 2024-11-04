import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import ReactQueryProvider from "@/providers/tanstack";
import { Toaster } from "@/components/ui/sooner";
import { Space_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { AOSInit } from "@/components/shared/AOS";
import { ParticleConnectkit } from "@/providers/connectkit";

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
  authors: {
    name: "TokenMinds",
    url: "https://tokenminds.co",
  },
  creator: "TokenMinds",
  publisher: "TokenMinds",
  keywords: ["Solana", "Presale", "Bichon", "Defender"],
  openGraph: {
    title: "Bichon Defender",
    description: "Solana Presale Bichon Defender",
    url: "https://bichondefender.io",
    locale: "en_US",
    type: "website",
    siteName: "Bichon Defender",
    images: [
      {
        url: "/images/bg/hero.png",
        width: 800,
        height: 600,
        alt: "Bichon Defender",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta httpEquiv="Permissions-Policy" content="accelerometer=(self)" />
      </Head>

      <body
        className={`${plusJakartaSans.variable} ${spaceMono.variable} antialiased bg-bgDark`}
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
