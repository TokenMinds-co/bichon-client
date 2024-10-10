"use client";

import Image from "next/image";
import ConnectWallet from "../shared/ConnectWallet";
import IcoCounter from "./IcoCounter";
import IcoInfo from "./IcoInfo";
import IcoMethod from "./IcoMethod";
import { useState } from "react";
import { TransactionMethod } from "@/types/Response";

export default function IcoWidgets() {
  const [activeMethod, setActiveMethod] =
    useState<TransactionMethod>("CRYPTO_SOLANA");

  const handleMethod = (method: TransactionMethod) => {
    setActiveMethod(method);
  };
  return (
    <div className="w-full h-full max-w-lg flex items-center justify-center text-white p-4 bg-black skew-widgets">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-spaceMono font-bold text-center mb-8">
          LOREM IPSUM COLOR!
        </h1>

        <IcoCounter until="2024-10-13T23:59:59" />
        <IcoInfo
          raised={1549213.31}
          total={3163452}
          purchased={241}
          stakeable={50}
          price={1.000476}
          symbol={"USDT"}
        />

        <div className="flex justify-between gap-2 font-spaceMono font-bold">
          <IcoMethod
            src="/assets/icons/solana.svg"
            label="SOL"
            method="CRYPTO_SOLANA"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src="/assets/icons/usdt.svg"
            label="USDT"
            method="CRYPTO_USDT"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src="/assets/icons/usdc.svg"
            label="USDC"
            method="CRYPTO_USDC"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src=""
            label="CARD"
            method="FIAT"
            handleClick={handleMethod}
            active={activeMethod}
            isFiat
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-1">
            <label className="text-sm text-blue-400">ETH you pay</label>
            <div className="bg-[#1e2128] rounded-md p-2 flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                className="bg-transparent w-full outline-none"
              />
              <Image
                src="/assets/icons/usdc.svg"
                width={20}
                height={20}
                alt="usdc"
              />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm text-blue-400">
              MAX $LOREM you receive
            </label>
            <div className="bg-[#1e2128] rounded-md p-2 flex justify-between items-center">
              <input
                type="number"
                placeholder="0"
                className="bg-transparent w-full outline-none"
              />
              <Image
                src="/assets/icons/usdt.svg"
                width={20}
                height={20}
                alt="LOREM"
              />
            </div>
          </div>
        </div>

        <ConnectWallet label="Connect Wallet" />

        <div className="text-center">
          <a
            href="#"
            className="text-base underline underline-offset-4 font-jakarta"
          >
            Don&apos;t have a wallet?
          </a>
        </div>
      </div>
    </div>
  );
}
