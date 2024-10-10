"use client";

import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import { BICHON_TOKEN } from "@/constant/common";
import { Separator } from "../ui/separator";
import ConnectWallet from "../shared/ConnectWallet";

export default function ICO() {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 14,
    minutes: 54,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full max-w-lg flex items-center justify-center text-white p-4 bg-black skew-widgets">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-spaceMono font-bold text-center mb-8">
          LOREM IPSUM COLOR!
        </h1>

        <div className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 opacity-95 hover:opacity-100 rounded-md p-4 flex justify-between">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-spaceMono font-semibold">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm capitalize">{key}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-center text-base font-jakarta">
            <span>USD RAISED: $549,213.31</span>
            <span className="px-2"> / </span>
            <span>$3,163,452</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div
              className="bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 h-4 rounded-full"
              style={{ width: "50%" }}
            />
          </div>
        </div>

        <div className="space-y-2 text-base font-jakarta font-medium">
          <div className="flex items-center justify-center">
            <span>Your purchased ${BICHON_TOKEN.symbol}= 0</span>
            <span className="text-blue-400 px-2">ⓘ</span>
          </div>
          <div className="flex items-center justify-center">
            <span>Your stakeable ${BICHON_TOKEN.symbol}= 0</span>
            <span className="text-blue-400 px-2">ⓘ</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center w-full">
          <Separator className="flex-1" />
          <p className="text-center whitespace-nowrap mx-2">
            1 ${BICHON_TOKEN.symbol} = $0.0312
          </p>
          <Separator className="flex-1" />
        </div>

        <div className="flex justify-between gap-2 font-spaceMono font-bold">
          <button className="flex-1 bg-gray-700 py-2 rounded-md flex items-center justify-center gap-2">
            <Image
              src="/assets/icons/solana.svg"
              width={20}
              height={20}
              alt="solana"
            />
            <p className="tracking-wider">SOL</p>
          </button>
          <button className="flex-1 bg-[#1e2128] py-2 rounded-md flex items-center justify-center gap-2">
            <Image
              src="/assets/icons/usdt.svg"
              width={20}
              height={20}
              alt="usdt"
            />
            <p className="tracking-wider">USDT</p>
          </button>
          <button className="flex-1 bg-[#1e2128] py-2 rounded-md flex items-center justify-center gap-2">
            <Image
              src="/assets/icons/usdc.svg"
              width={20}
              height={20}
              alt="usdc"
            />
            <p className="tracking-wider">USDC</p>
          </button>
          <button className="flex-1 bg-[#1e2128] py-2 rounded-md flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            <p className="tracking-wider">CARD</p>
          </button>
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
