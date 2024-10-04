import BuyTokenForm from "@/components/buy-token-form";
import React from "react";

export default function PaymentPage() {
  return (
    <main className="w-screen min-h-screen pt-28 flex flex-col items-center justify-center bg-gray-800 gap-10">
      <BuyTokenForm />
    </main>
  );
}
