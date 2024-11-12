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

export const dynamic = "force-dynamic";

const TicketSupportPage = () => {
  return (
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-center bg-sky min-h-screen">
      <Support />
    </main>
  );
};

export default TicketSupportPage;
