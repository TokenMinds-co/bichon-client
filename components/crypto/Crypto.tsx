"use client";

import { generateAxiosInstance } from "@/lib/axios-client";
import { useAccount } from "@particle-network/connectkit";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import FormCrypto from "./FormCrypto";

/*
The flow:
1. Check the user if it's registered. If not, show a message to verify as a user.
2. Get the user's ATA and it's amount for USDT and USDC. If they don't have any or only 0, disable buy button.
3. Limit the form max input to the user's ATA amount.
4. Convert current ICO price to USDT and USDC.
5. Calculate preview amount of buying the token based on the user's input.
6. Initiate the transaction.
*/

interface CryptoProps {
  currentPrice: number;
}

const Crypto = ({ currentPrice }: CryptoProps) => {
  const { address } = useAccount();

  const { data: users } = useQuery({
    queryKey: ["get-types", address],
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

  return (
    <div className="flex flex-col space-y-2 w-full h-full items-center justify-center">
      {users && users.length > 0 ? (
        <FormCrypto currentPrice={currentPrice} />
      ) : (
        <div className="flex flex-col space-y-3 w-full h-full items-center justify-center">
          <p className="text-white text-sm">
            Unfortunately, you are not a registered user. Please verify as user
            candidate to join the presale now.
          </p>
          <Link href="/">
            <Button className="text-white text-sm" variant="default">
              Go to Verify Page
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Crypto;
