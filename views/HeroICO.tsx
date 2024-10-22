import IcoCounter from "@/components/crypto/IcoCounter";
import SkewButton from "@/components/shared/SkewButton";
import { displayFormatter } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface HeroICOProps {
  tokenName: string;
  tokenDecimal: number;
  tokenTicker: string;
  tokenRemain: number;
  validUntil: string;
  totalRaised: number;
  targetAmount: number;
}

const HeroICO = ({
  targetAmount,
  tokenDecimal,
  tokenTicker,
  tokenRemain,
  tokenName,
  totalRaised,
  validUntil,
}: HeroICOProps) => {
  const percentage =
    totalRaised >= targetAmount ? 100 : (totalRaised / targetAmount) * 100;
  return (
    <div
      className="flex-col space-y-10 p-10 w-full h-full max-w-lg flex items-center justify-center text-white bg-gray-700/20 skew-widgets"
      data-aos="fade-left"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex flex-col space-y-1 uppercase">
          <h1 className="text-3xl font-bold text-center">{tokenName}</h1>
          <p className="text-base font-bold text-center mb-8">ICO is Live!</p>
        </div>
        <IcoCounter
          until={validUntil || new Date().toISOString()}
          className="gap-10"
        />
        <div className="flex flex-col space-y-2">
          <div className="flex justify-center text-base font-jakarta">
            <p>
              USD RAISED: $
              <span className="font-bold">
                {displayFormatter(totalRaised, 2)}
              </span>
            </p>

            <span className="px-2 font-bold"> / </span>
            <span className="font-bold">
              ${displayFormatter(targetAmount, tokenDecimal)}
            </span>
          </div>

          <div className="flex flex-row space-x-2 items-center justify-center font-jakarta">
            <p className="text-sm">Available ${tokenTicker} to purchase </p>
            <p className="text-sm font-bold">
              {displayFormatter(tokenRemain, tokenDecimal)}
            </p>
          </div>

          <div className="w-full bg-white/90 rounded-full h-4">
            <div
              className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 h-4 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex w-full h-full pt-5">
          <Link href="/ico" className="w-full">
            <SkewButton
              data-aos-delay="750"
              type="button"
              className="w-full uppercase"
              customClasses="skew-buy-widgets"
            >
              BUY {tokenTicker}
            </SkewButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroICO;