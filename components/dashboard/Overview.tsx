import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coins, HandCoins, ChartNoAxesCombined } from "lucide-react";

export default function Overview() {
  const totalTokens = 1000;
  const totalSpent = 2500;
  const tokenPrice = 2.5;

  return (
    <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0 shadow-xl overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:from-purple-500 hover:to-indigo-600">
        <CardHeader className="border-b border-white/20 pb-3">
          <CardTitle className="text-lg font-medium text-purple-100">
            Total Tokens
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                {totalTokens.toLocaleString()} BCH
              </div>
              <p className="text-sm text-purple-200 mt-1">
                +150 from last transaction
              </p>
            </div>
            <div className="bg-purple-500/30 p-3 rounded-full">
              <Coins className="h-6 w-6 text-purple-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-emerald-700 border-0 shadow-xl overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:from-green-400 hover:to-emerald-600">
        <CardHeader className="border-b border-white/20 pb-3">
          <CardTitle className="text-lg font-medium text-green-100">
            Total Spent (USD)
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                ${totalSpent.toLocaleString()}
              </div>
              <p className="text-sm text-green-200 mt-1">
                +$75 from last transaction
              </p>
            </div>
            <div className="bg-green-500/30 p-3 rounded-full">
              <HandCoins className="h-6 w-6 text-green-100" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500 to-rose-700 border-0 shadow-xl overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:from-pink-400 hover:to-rose-600">
        <CardHeader className="border-b border-white/20 pb-3">
          <CardTitle className="text-lg font-medium text-pink-100">
            Current Token Price
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                ${tokenPrice.toLocaleString()}
              </div>
              <p className="text-sm text-pink-200 mt-1">
                +$0.5 from last batch
              </p>
            </div>
            <div className="bg-pink-500/30 p-3 rounded-full">
              <ChartNoAxesCombined className="h-6 w-6 text-pink-100" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
