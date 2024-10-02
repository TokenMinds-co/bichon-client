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
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-start bg-gray-800 p-5">
      <h1 className="text-white text-2xl">Ticket Support Page</h1>
      <p className="text-white text-sm">
        Only for registered users. Please verify as user candidate to submit a
        ticket.
      </p>
      <Support />
    </main>
  );
};

export default TicketSupportPage;
