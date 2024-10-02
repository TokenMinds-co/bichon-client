"use client";

import React, { useEffect } from "react";
import { useAccount } from "@particle-network/connectkit";
import { usePathname, useRouter } from "next/navigation";
import ConnectWallet from "./ConnectWallet";

const AppConnectButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isConnected, address, chainId } = useAccount();

  useEffect(() => {
    if (isConnected) {
      if (pathname === "/") {
        router.push("/dashboard");
      }
    } else {
      router.push("/");
    }
  }, [isConnected, pathname, router]);

  return (
    <div className="flex flex-col w-full h-full items-center justify-center space-y-3">
      <ConnectWallet label="Connect Wallet" />

      {isConnected && (
        <div className="text-white text-left mt-10">
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>
        </div>
      )}
    </div>
  );
};

export default AppConnectButton;
