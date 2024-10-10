import FormKYC from "@/components/kyc/FormKYC";
import React from "react";

export default function KYCPage() {
  return (
    <section className="w-full px-5 bg-sky min-h-screen font-spaceMono pt-28 flex flex-col items-center justify-center">
      <div className="text-white text-center text-xl mb-10">Before participating in ICO, you should complete KYC</div>
      <FormKYC />
    </section>
  );
}
