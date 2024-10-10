import Support from "@/components/support/Support";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Bichon Defender | Support",
  description: "Solana Presale Bichon Defender Support",
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

const TicketSupportPage = () => {
  return (
    <main className="bg-sky font-spaceMono text-white flex flex-col space-y-5 w-full min-h-screen h-full items-center justify-start p-5 pt-24">
      <Support />
    </main>
  );
};

export default TicketSupportPage;
