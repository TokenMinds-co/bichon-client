import { displayFormatter } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";
import Loader from "../shared/Loader";

interface IcoInfoProps {
  raised: number;
  total: number;
  purchased: number | undefined;
  stakeable: number;
  price: number;
  symbol: string;
  isFetchingBalance: boolean;
  bichon_symbol: string;
  bichon_decimal: number;
  bichon_available: number;
}

const IcoInfo = ({
  raised,
  total,
  purchased,
  price,
  symbol,
  isFetchingBalance,
  bichon_decimal,
  bichon_symbol,
  bichon_available,
}: IcoInfoProps) => {
  const percentage = raised >= total ? 100 : (raised / total) * 100;

  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="space-y-2">
        <div className="flex justify-center text-base font-jakarta">
          <p>
            USD RAISED: $
            <span className="font-bold">{displayFormatter(raised, 2)}</span>
          </p>
          {total > 0 && (
            <>
              <span className="px-2 font-bold"> / </span>
              <span className="font-bold">${displayFormatter(total, 2)}</span>
            </>
          )}
        </div>

        <div className="flex flex-row space-x-2 items-center justify-center">
          <p className="text-sm">Available ${bichon_symbol} to purchase </p>
          <p className="text-sm font-bold">
            {displayFormatter(bichon_available, bichon_decimal)}
          </p>
        </div>

        {total > 0 && (
          <div className="w-full bg-white/90 rounded-full h-4">
            <div
              className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>

      <div className="space-y-2 text-base font-jakarta font-medium">
        <div className="flex items-center justify-center">
          <div className="flex flex-col space-y-2 items-center justify-center">
            <p className="text-sm">Your purchased ${bichon_symbol}</p>
            {purchased === undefined ? (
              <Loader size="20" />
            ) : (
              <p className="text-sm font-bold">
                {purchased % 1 === 0
                  ? displayFormatter(purchased, 0)
                  : displayFormatter(purchased, bichon_decimal)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <Separator className="flex-1" />
        <div className="flex flex-row text-center whitespace-nowrap space-x-2 mx-2">
          1 <span className="font-semibold px-2">${bichon_symbol}</span> ={" "}
          {isFetchingBalance ? <Loader size="20" /> : `${price} `}
          {!isFetchingBalance && (
            <span className="font-semibold">${symbol}</span>
          )}
        </div>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};

export default IcoInfo;
