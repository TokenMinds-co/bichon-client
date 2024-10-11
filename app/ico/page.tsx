import Crypto from "@/components/crypto/Crypto";
import { axiosInstance } from "@/lib/axios";
import { Metadata } from "next";
import React from "react";

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
  const { data: res } = await axiosInstance.get("/ico/current");
  const ico = res.data as IcoResponse;

  return (
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-center bg-sky min-h-screen p-5 pt-28">
      <Crypto currentPrice={ico?.currentPrice ?? 0} />
    </main>
  );
};

export default CryptoPaymentPage;
