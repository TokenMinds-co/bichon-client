import { useState, useEffect } from "react";
import { Bitcoin, CreditCard } from "lucide-react";
import Image from "next/image";

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
    <div className="min-h-screen flex items-center justify-center text-white p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          LOREM IPSUM COLOR!
        </h1>

        <div className="bg-[#1e2128] rounded-xl p-4 flex justify-between">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-3xl font-mono">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm capitalize">{key}</div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>USDT RAISED: $549,213.31</span>
            <span>$3,163,452</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: "17%" }}
            ></div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Your purchased $LOREMIPSUM= 0</span>
            <span className="text-blue-400">ⓘ</span>
          </div>
          <div className="flex justify-between">
            <span>Your stakeable $LOREMIPSUM= 0</span>
            <span className="text-blue-400">ⓘ</span>
          </div>
        </div>

        <div className="text-center">1 LOREM = $0.0312</div>

        <div className="flex justify-between gap-2">
          <button className="flex-1 bg-gray-700 py-2 rounded-md flex items-center justify-center gap-2">
            <Bitcoin className="w-5 h-5" />
            ETH
          </button>
          <button className="flex-1 bg-[#1e2128] py-2 rounded-md flex items-center justify-center gap-2">
            <Image
              src="/placeholder.svg?height=20&width=20"
              width={20}
              height={20}
              alt="USDT"
            />
            USDT
          </button>
          <button className="flex-1 bg-[#1e2128] py-2 rounded-md flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            CARD
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
              <Bitcoin className="w-5 h-5" />
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
                src="/placeholder.svg?height=20&width=20"
                width={20}
                height={20}
                alt="LOREM"
              />
            </div>
          </div>
        </div>

        <button className="w-full bg-blue-600 py-3 rounded-md font-bold">
          CONNECT WALLET
        </button>

        <div className="text-center">
          <a href="#" className="text-sm underline">
            Don&apos;t have a wallet?
          </a>
        </div>

        <div className="text-center text-sm text-gray-500">
          powered by Web3Payments
        </div>
      </div>
    </div>
  );
}
