"use client";

import { BICHON_TOKEN } from "@/constant/common";
import { displayFormatter } from "@/lib/utils";
import { useEffect } from "react";

interface ConversionRateProps {
  currentprice: number;
  price: number;
  isDirty: boolean;
  amount: string;
  decimals: number;
  symbol: string;
  isFetchingBalance: boolean;
  setBoughtAmount: (amount: number) => void;
  setUsdAmount: (amount: number) => void;
}

const ConversionRate = ({
  currentprice,
  price,
  isDirty,
  decimals,
  amount,
  symbol,
  isFetchingBalance,
  setBoughtAmount,
  setUsdAmount,
}: ConversionRateProps) => {
  const formatted = !isDirty
    ? currentprice
    : price % 1 === 0
    ? displayFormatter(1 / price, 0)
    : displayFormatter(1 / price, decimals);

  const amountToGet = !isDirty
    ? displayFormatter(Number(amount) / currentprice, 0)
    : displayFormatter(Number(amount) * price, BICHON_TOKEN.decimals);
  const usdAmount = !isDirty
    ? Number(amount) * currentprice
    : Number(amount) * Number(formatted);

  useEffect(() => {
    if (amount !== "") {
      setBoughtAmount(Number(amountToGet));
      setUsdAmount(usdAmount);
    }
  }, [amount, amountToGet, setBoughtAmount, setUsdAmount, usdAmount]);

  return (
    <div className="flex flex-col items-start justify-start py-5 space-y-3 text-black">
      <p className="text-sm">
        1 ${BICHON_TOKEN.symbol} ={" "}
        {isFetchingBalance
          ? "Calculating..."
          : `${formatted.toString()} $${symbol}`}
      </p>

      {Number(amount) > 0 && (
        <div className="flex flex-col space-y-2">
          <p className="text-sm">
            You&apos;ll pay: {amount} ${symbol}
          </p>
          <p className="text-sm">
            You&apos;ll get: {amountToGet} ${BICHON_TOKEN.symbol}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversionRate;
