"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { displayFormatter } from "@/lib/utils";
import { BICHON_TOKEN } from "@/constant/common";

interface BuyDetails {
  isDirty: boolean;
  amount: string;
  getAmount: string;
  usdAmount: string;
}
interface BuyFormProps {
  isFetchingBalance: boolean;
  usdPrice: number;
  price: number;
  rawPrice: number;
  decimals: number;
  balance: number;
  symbol: string;
  logo: string;
  buyDetails: BuyDetails;
  setBuyDetails: (details: BuyDetails) => void;
}

const BuyForm = ({
  isFetchingBalance,
  balance,
  decimals,
  symbol,
  logo,
  usdPrice,
  rawPrice,
  price,
  buyDetails,
  setBuyDetails,
}: BuyFormProps) => {
  const formattedBalance =
    balance % 1 === 0
      ? displayFormatter(balance, 0)
      : displayFormatter(balance, decimals);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!buyDetails.isDirty) {
      setBuyDetails({
        ...buyDetails,
        isDirty: true,
      });
    }

    const amount = e.target.value;
    const amountGet =
      logo === "" ? Number(amount) / Number(usdPrice) : Number(amount) / price;
    const usdAmount = Number(amount) * rawPrice;

    setBuyDetails({
      ...buyDetails,
      amount,
      isDirty: true,
      getAmount: displayFormatter(amountGet, BICHON_TOKEN.decimals),
      usdAmount: displayFormatter(usdAmount, 2),
    });
  };

  // Monitor if the method is changed
  useEffect(() => {
    setBuyDetails({
      ...buyDetails,
      isDirty: false,
      amount: "",
      getAmount: "",
      usdAmount: "",
    });
  }, [logo]);

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
            disabled={isFetchingBalance}
            max={logo !== "" ? balance : undefined}
            value={buyDetails.amount}
            onChange={handleAmountChange}
          />
          {logo === "" ? (
            <p className="whitespace-nowrap">$ USD</p>
          ) : (
            <Image src={logo} width={20} height={20} alt={symbol} />
          )}
        </div>
        <label className="text-sm text-blue-400">
          {logo !== "" && (
            <>
              Available:{" "}
              {isFetchingBalance
                ? "Calculating..."
                : `${formattedBalance} $${symbol}`}
            </>
          )}
        </label>
      </div>
      <div className="flex-1 space-y-1">
        <div className="bg-[#1e2128] rounded-md p-2 flex justify-between items-center">
          <input
            type="number"
            placeholder="0"
            value={buyDetails.getAmount}
            className="bg-transparent w-full outline-none"
          />
          <p className="whitespace-nowrap">{BICHON_TOKEN.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default BuyForm;
