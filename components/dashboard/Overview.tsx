import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Coins, HandCoins, ChartNoAxesCombined } from "lucide-react";
import {
  SolanaChain,
  useAccount,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { useQuery } from "@tanstack/react-query";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useTokenDetails } from "@/hooks/useTokenDetails";

export default function Overview() {
  const publicClient = usePublicClient<SolanaChain>();
  const [primaryWallet] = useWallets();
  const { address, chain } = useAccount();
  const { tokenDetails } = useTokenDetails();

  const { data: overview } = useQuery<OverviewProps | null>({
    queryKey: ["get-overview", address],
    queryFn: async () => {
      if (!address) return null;
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/users/overview?address=${address}`
      );

      const overview = data.data;
      return overview;
    },
    enabled: !!address,
  });

  const { data: balance } = useQuery({
    queryKey: ["get-balance", chain],
    queryFn: async () => {
      const wallet = primaryWallet?.getWalletClient<SolanaChain>();
      const balance = await publicClient?.getBalance(wallet.publicKey);
      return Number(balance) / 10 ** 9;
    },
    enabled: !!address,
  });

  return (
    <div className="w-full grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 border-0 shadow-xl overflow-hidden transition-all cursor-pointer duration-300 ease-in-out hover:shadow-2xl hover:scale-105 hover:from-purple-500 hover:to-indigo-600">
        <CardHeader className="border-b border-white/20 pb-3">
          <CardTitle className="text-lg font-medium text-purple-100">
            Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                {balance || 0} SOL
              </div>
              <p className="text-sm mt-2 text-purple-200 mt-1">
                Amount of available solana token
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
            Token Bought
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white items-center flex">
                {overview?.totalToken || 0} {tokenDetails?.ticker || "BDF"}{" "}
                <span className="ml-4 text-base font-normal text-white/75">+2% bonus reward</span>
              </div>
              <p className="text-sm mt-2 text-green-200 mt-1">
                Amount of token bought on presale
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
            Token Price
          </CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold text-white">
                ${overview?.tokenPrice || 0}
              </div>
              <p className="text-sm mt-2 text-pink-200 mt-1">
                Token price on current batch
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
