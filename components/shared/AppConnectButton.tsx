"use client";

import React, { useEffect } from "react";
import { ConnectButton, useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";

const AppConnectButton = () => {
  const router = useRouter();
  const { isConnected, address, chainId } = useAccount();

  useEffect(() => {
    if (isConnected) {
      console.log("Connected");
      router.push("/dashboard");
    } else {
      console.log("Not connected");
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <>
      <ConnectButton label="Connect Wallet" />;
      {isConnected && (
        <div className="text-white text-left mt-10">
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>
        </div>
      )}
    </>
  );
};

export default AppConnectButton;
