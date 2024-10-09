import React from "react";
import { FormDescription } from "../ui/form";
import { displayFormatter } from "@/lib/utils";

interface DisplayBalanceProps {
  balance: number;
  symbol: string;
  decimals: number;
  isFetchingBalance: boolean;
}

const DisplayBalance = ({
  balance,
  symbol,
  decimals,
  isFetchingBalance,
}: DisplayBalanceProps) => {
  const formatted =
    balance === 0
      ? 0
      : balance % 1 === 0
      ? displayFormatter(balance, 0)
      : displayFormatter(balance, decimals);

  return (
    <FormDescription>
      {isFetchingBalance ? "Fetching balance..." : `${formatted} $${symbol}`}
    </FormDescription>
  );
};

export default DisplayBalance;
