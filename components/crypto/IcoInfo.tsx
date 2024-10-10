import { BICHON_TOKEN } from "@/constant/common";
import { displayFormatter } from "@/lib/utils";
import React from "react";
import { Separator } from "../ui/separator";

interface IcoInfoProps {
  raised: number;
  total: number;
  purchased: number;
  stakeable: number;
  price: number;
  symbol: string;
}

const IcoInfo = ({
  raised,
  total,
  purchased,
  stakeable,
  price,
  symbol,
}: IcoInfoProps) => {
  const percentage = (raised / total) * 100;
  return (
    <div className="flex flex-col w-full h-full space-y-5">
      <div className="space-y-2">
        <div className="flex justify-center text-base font-jakarta">
          <span>USD RAISED: ${displayFormatter(raised, 2)}</span>
          <span className="px-2"> / </span>
          <span>${displayFormatter(total, 2)}</span>
        </div>
        <div className="w-full bg-white/90 rounded-full h-4">
          <div
            className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 text-base font-jakarta font-medium">
        <div className="flex items-center justify-center">
          <span>
            Your purchased ${BICHON_TOKEN.symbol}= {purchased}
          </span>
          <span className="text-blue-400 px-2">ⓘ</span>
        </div>
        <div className="flex items-center justify-center">
          <span>
            Your stakeable ${BICHON_TOKEN.symbol}= {stakeable}
          </span>
          <span className="text-blue-400 px-2">ⓘ</span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <Separator className="flex-1" />
        <p className="text-center whitespace-nowrap mx-2">
          1 <span className="font-semibold">${BICHON_TOKEN.symbol}</span> ={" "}
          {price} <span className="font-semibold">${symbol}</span>
        </p>
        <Separator className="flex-1" />
      </div>
    </div>
  );
};

export default IcoInfo;