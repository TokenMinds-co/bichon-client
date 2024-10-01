"use client";

import React, { useEffect, useState } from "react";
import { ConnectButton, useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";

interface UserData {
  email: string;
  address: string;
}

const AppConnectButton = () => {
  const router = useRouter();
  const { isConnected, address, chainId } = useAccount();

  const [userData, setUser] = useState<UserData>({
    email: "",
    address: address || "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentAddress = address;
    // push to /verify and set the email and address in the query params
    router.push(
      `/verify?email=${encodeURIComponent(
        userData.email
      )}&address=${currentAddress}`
    );
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-3">
      <ConnectButton label="Connect Wallet" />;
      {isConnected && (
        <div className="text-white text-left mt-10">
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>

          <form
            id="sumsub_form"
            onSubmit={handleSubmit}
            className="flex flex-col w-full h-full items-center justify-center space-y-3 text-black"
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2"
              value={userData.email}
              onChange={(e) => setUser({ ...userData, email: e.target.value })}
              required
            />
            <button type="submit" className="w-1/2 p-2 bg-blue-500 text-white">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppConnectButton;
