"use client";

import React from "react";
import Image from "next/image";
import { displayFormatter } from "@/lib/utils";
import { BICHON_TOKEN } from "@/constant/common";

interface BuyFormProps {
  isFetchingBalance: boolean;
  decimals: number;
  balance: number;
  symbol: string;
  logo: string;
}

const BuyForm = ({
  isFetchingBalance,
  balance,
  decimals,
  symbol,
  logo,
}: BuyFormProps) => {
  const formattedBalance =
    balance % 1 === 0
      ? displayFormatter(balance, 0)
      : displayFormatter(balance, decimals);
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-1">
        <div className="bg-[#1e2128] rounded-md p-2 flex justify-between items-center">
          <input
            type="number"
            placeholder="0"
            className="bg-transparent w-full outline-none"
            min={0.000001}
            step={0.000001}
            max={balance}
          />
          {logo === "" ? (
            <p className="whitespace-nowrap">$ USD</p>
          ) : (
            <Image src={logo} width={20} height={20} alt={symbol} />
          )}
        </div>
        <label className="text-sm text-blue-400">
          Available:
          {isFetchingBalance
            ? "Calculating..."
            : `${formattedBalance} $${symbol}`}
        </label>
      </div>
      <div className="flex-1 space-y-1">
        <div className="bg-[#1e2128] rounded-md p-2 flex justify-between items-center">
          <input
            type="number"
            placeholder="0"
            className="bg-transparent w-full outline-none"
          />
          <p className="whitespace-nowrap">$ {BICHON_TOKEN.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;
