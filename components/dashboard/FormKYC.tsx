"use client";

import { useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkewButton from "../shared/SkewButton";

interface UserData {
  email: string;
  address: string;
}

const FormKYC = () => {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [isSubmitting, setSubmitting] = useState(false);
  const [userData, setUser] = useState<UserData>({
    email: "",
    address: address || "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    const currentAddress = address;
    // push to /verify and set the email and address in the query params
    router.push(
      `/verify?email=${encodeURIComponent(
        userData.email
      )}&address=${currentAddress}`
    );
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      {isConnected ? (
        <form
          id="sumsub_form"
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full max-w-md items-center justify-center space-y-3 text-black"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2"
            value={userData.email}
            onChange={(e) => setUser({ ...userData, email: e.target.value })}
            required
          />
          <SkewButton className="px-8" disabled={isSubmitting} type="submit" variant="primary">
            {isSubmitting ? "Submitting..." : "Submit"}
          </SkewButton>
        </form>
      ) : (
        <h1 className="text-white">Connect your wallet to proceed with KYC</h1>
      )}
    </div>
  );
};

export default FormKYC;
