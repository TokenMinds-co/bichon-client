import Dashboard from "@/components/dashboard/Dashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bichon Defender | Dashboard",
  description: "Solana Presale Bichon Defender User Dashboard",
  keywords: [
    "Bichon Defender",
    "Solana",
    "Presale",
    "Bichon",
    "Solana Presale",
    "Solana Bichon Defender",
    "Solana Presale Bichon Defender",
  ],
  authors: {
    name: "Bichon Defender",
    url: "https://bichondefender.com",
  },
  creator: "Tokenminds",
  publisher: "Tokenminds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bichondefender.com",
    siteName: "Bichon Defender",
    title: "Bichon Defender | Support",
    description: "Solana Presale Bichon Defender Support",
  },
};

const DashboardPage = () => {
  
  return (
    <main className="bg-sky min-h-screen flex flex-col">
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
