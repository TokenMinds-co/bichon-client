import { BICHON_TOKEN_DECIMALS, BICHON_TOKEN_SYMBOL } from "@/constant/common";
import { displayFormatter } from "@/lib/utils";
import React from "react";

interface ConversionRateProps {
  currentprice: number;
  price: number;
  isDirty: boolean;
  amount: string;
  decimals: number;
  symbol: string;
  isFetchingBalance: boolean;
}

const ConversionRate = ({
  currentprice,
  price,
  isDirty,
  decimals,
  amount,
  symbol,
  isFetchingBalance,
}: ConversionRateProps) => {
  const formatted = !isDirty
    ? currentprice
    : price % 1 === 0
    ? displayFormatter(1 / price, 0)
    : displayFormatter(1 / price, decimals);

  const amountToGet = !isDirty
    ? displayFormatter(Number(amount) / currentprice, 0)
    : displayFormatter(
        (Number(amount) * price) / Number(formatted),
        BICHON_TOKEN_DECIMALS
      );

  return (
    <div className="flex flex-col items-start justify-start py-5 space-y-3 text-black">
      <p className="text-sm">
        1 ${BICHON_TOKEN_SYMBOL} ={" "}
        {isFetchingBalance ? "Calculating..." : `$${formatted} ${symbol}`}
      </p>

      {Number(amount) > 0 && (
        <div className="flex flex-col space-y-2">
          <p className="text-sm">
            You&apos;ll pay: {amount} ${symbol}
          </p>
          <p className="text-sm">
            You&apos;ll get: {amountToGet} ${BICHON_TOKEN_SYMBOL}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConversionRate;
