"use client";
import { ConnectButton, useAccount } from "@particle-network/connectkit";

export default function Home() {
  const { address, isConnected, chainId } = useAccount();

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800">
      <ConnectButton label="Connect Wallet" />

      {isConnected && (
        <div className="text-white text-left mt-10">
          <h2>Address: {address}</h2>
          <h2>Chain ID: {chainId}</h2>
        </div>
      )}
    </main>
  );
}
