import ICO from "@/components/crypto/ICO";
import { Metadata } from "next";
import React from "react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bichon Defender | Crypto Payment",
  description: "Solana Presale Bichon Defender Crypto Payment",
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
    title: "Bichon Defender | Crypto Payment",
    description: "Solana Presale Bichon Defender Crypto Payment",
  },
};

const CryptoPaymentPage = async () => {
  return (
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-center bg-sky min-h-screen">
      <ICO />
    </main>
  );
};

export default CryptoPaymentPage;
