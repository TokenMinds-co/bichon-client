"use client";

import { useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkewButton from "../shared/SkewButton";
import Image from "next/image";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import StatusKYC from "./StatusKYC";

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

  const { data: users } = useQuery({
    queryKey: ["get-types", address],
    queryFn: async () => {
      if (!address) return [];
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/users?limit=10&page=1&&address=${address}`
      );
      const users = data.data.users as UserResponse[];
      return users;
    },
    enabled: !!address,
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
        users && users[0]?.kyc !== null ? (
          <StatusKYC status={users[0]?.kyc?.status} />
        ) : (
          <>
            <div className="text-white text-center text-xl mb-10">
              Before participating in ICO, you should complete KYC
            </div>

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
                onChange={(e) =>
                  setUser({ ...userData, email: e.target.value })
                }
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
                customClasses="skew-buy-widgets"
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
        )
      ) : (
        <h1 className="text-2xl text-white text-center h-full">
          Connect Wallet To Continue
        </h1>
      )}
    </div>
  );
};

export default FormKYC;
