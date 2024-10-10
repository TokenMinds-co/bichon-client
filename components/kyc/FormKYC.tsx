"use client";

import { useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkewButton from "../shared/SkewButton";
import Image from "next/image";

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
    <div className="flex flex-col w-full items-center justify-center ">
      {isConnected ? (
        <>
          <form
            id="sumsub_form"
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full rounded-md max-w-md items-center justify-center gap-4 text-black bg-gray-700/30 p-10 z-20"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none active:border-blue-500 focus:border-blue-500"
              value={userData.email}
              onChange={(e) => setUser({ ...userData, email: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Address"
              readOnly
              className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none"
              value={address}
            />

            <SkewButton
              className="px-8 mt-6 w-full"
              disabled={isSubmitting}
              type="submit"
              variant="primary"
            >
              {isSubmitting ? "Submitting..." : "Start KYC"}
            </SkewButton>
          </form>

          <Image // FLOATING DOG
            className="absolute bottom-0 right-[20%] z-[10] w-[400px] aspect-square animate-fly"
            alt="floating-dog"
            width={50}
            height={50}
            src="/assets/floating/dog.svg"
          />
        </>
      ) : (
        <h1 className="text-white">Connect your wallet to proceed with KYC</h1>
      )}
    </div>
  );
};

export default FormKYC;