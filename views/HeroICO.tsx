import IcoCounter from "@/components/crypto/IcoCounter";
import SkewButton from "@/components/shared/SkewButton";
import { Separator } from "@/components/ui/separator";
import { displayFormatter } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface HeroICOProps {
  tokenName: string;
  tokenDecimal: number;
  tokenTicker: string;
  tokenRemain: number;
  tokenPrice: number;
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
  tokenPrice,
  totalRaised,
  validUntil,
}: HeroICOProps) => {
  const isPresaleEnded = new Date() > new Date(validUntil);
  const percentage =
    totalRaised >= targetAmount ? 100 : (totalRaised / targetAmount) * 100;
  return (
    <div
      className="flex-col h-fit space-y-10 p-8 md:p-12 py-16 max-w-lg flex items-center justify-center text-white bg-black/50 skew-widgets"
      data-aos="fade-left"
      data-aos-delay="1000"
    >
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1 uppercase">
          <h1 className="text-3xl font-bold text-center">{tokenName}</h1>
          {isPresaleEnded ? (
            <p className="text-base font-bold text-center mb-8">
              ICO has not started!
            </p>
          ) : (
            <p className="text-base font-bold text-center mb-8">ICO is Live!</p>
          )}
        </div>
        <IcoCounter
          until={validUntil || new Date().toISOString()}
          className="gap-10"
        />
        {isPresaleEnded ? (
          <div className="flex justify-center text-base font-jakarta">
            <p>
              USD RAISED: $
              <span className="font-bold">
                {displayFormatter(totalRaised, 2)}
              </span>
            </p>
          </div>
        ) : (
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
                ${displayFormatter(targetAmount, 2)}
              </span>
            </div>

            <div className="flex flex-row items-center justify-center w-full font-jakarta">
              <Separator className="flex-1" />
              <div className="flex flex-row text-center whitespace-nowrap space-x-2 mx-2">
                1 <span className="font-semibold px-2">${tokenTicker}</span> ={" "}
                <span className="font-semibold px-2">${tokenPrice}</span>
              </div>
              <Separator className="flex-1" />
            </div>

            <div className="w-full bg-white/90 rounded-full h-4">
              <div
                className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 h-4 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )}

        {!isPresaleEnded && (
          <div className="flex flex-row space-x-2 items-center justify-center font-jakarta">
            <p className="text-sm">Available to purchase</p>
            <p className="text-sm font-bold">
              {tokenRemain % 1 === 0
                ? displayFormatter(tokenRemain, 0)
                : displayFormatter(tokenRemain, tokenDecimal)}{" "}
              ${tokenTicker}
            </p>
          </div>
        )}

        <div className="flex w-full h-full pt-5">
          <Link
            href={isPresaleEnded ? "/dashboard" : "/ico"}
            className="w-full"
          >
            <SkewButton
              data-aos-delay="750"
              type="button"
              className="w-full uppercase"
              customClasses="skew-buy-widgets"
            >
              {isPresaleEnded ? "Check Your Allocation" : `BUY ${tokenTicker}`}
            </SkewButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroICO;
