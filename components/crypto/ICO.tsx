"use client";

import { generateAxiosInstance } from "@/lib/axios-client";
import { useAccount } from "@particle-network/connectkit";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useFeed } from "@/hooks/useFeed";
import IcoWidgets from "./IcoWidgets";
import { redirect } from "next/navigation";
import Loader from "../shared/Loader";
import Unauthenticated from "../shared/unauthenticated";
import { useTokenDetails } from "@/hooks/useTokenDetails";

/*
The flow:
1. Check the user if it's registered. If not, show a message to verify as a user.
2. Get the user's ATA and it's amount for USDT and USDC. If they don't have any or only 0, disable buy button.
3. Limit the form max input to the user's ATA amount.
4. Convert current ICO price to USDT and USDC.
5. Calculate preview amount of buying the token based on the user's input.
6. Initiate the transaction.
*/

interface ICOProps {
  currentPrice: number;
  targetAmount: number;
  raisedAmount: number;
  until: string;
}

const ICO = ({ currentPrice, targetAmount, raisedAmount, until }: ICOProps) => {
  const { address } = useAccount();
  const { solprice, usdcprice, usdtprice } = useFeed();
  const { isConnected } = useAccount();
  const { tokenDetails } = useTokenDetails();

  const { data: users, isLoading } = useQuery({
    queryKey: ["get-user-details", address],
    queryFn: async () => {
      if (!address) return [];
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/users?limit=10&page=1&&address=${address}`
      );
      const users = data.data.users as UserResponse[];
      return users;
    },
    enabled: !!address,
  });

  useEffect(() => {
    if (!isLoading) {
      if (
        users?.length === 0 ||
        (users && users[0]?.kyc?.status !== "APPROVED")
      ) {
        redirect("/kyc");
      }
    }
  }, [isLoading, users]);

  // useEffect(() => {
  //   console.log("SOL", solprice?.Price);
  //   console.log("USDC", usdcprice?.Price);
  //   console.log("USDT", usdtprice?.Price);
  // }, [solprice, usdcprice, usdtprice]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full space-y-2">
      <div className="flex flex-col space-y-5 w-full h-full items-center justify-center">
        {!isConnected ? (
          <Unauthenticated />
        ) : isLoading ? (
          <Loader size="50" />
        ) : !tokenDetails ? (
          <Loader size="50" />
        ) : (
          users &&
          users.length !== 0 &&
          users[0]?.kyc &&
          users[0].kyc.status === "APPROVED" && (
            <IcoWidgets
              currentPrice={currentPrice}
              solprice={solprice?.Price ?? 0}
              usdcprice={usdcprice?.Price ?? 0}
              usdtprice={usdtprice?.Price ?? 0}
              targetAmount={targetAmount}
              raisedAmount={raisedAmount}
              until={until}
              userAllocation={!users ? 0 : users[0]?.allocation}
              tokenDetails={tokenDetails}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ICO;
