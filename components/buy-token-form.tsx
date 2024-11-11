"use client";

import { generateAxiosInstance } from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAccount } from "@particle-network/connectkit";
import ConnectWallet from "./shared/ConnectWallet";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function BuyTokenForm() {
  const [quantity, setQuantity] = useState<number>(0);
  const { address, isConnected } = useAccount();
  const router = useRouter();

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

  const buyTokenViaFiat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (quantity <= 0) {
      alert("Invalid quantity!");
      return;
    }

    const axiosInstance = await generateAxiosInstance(undefined);
    const res = await axiosInstance
      .post(`/transactions/stripe/payment`, {
        quantity,
        address: address,
      })
      .catch((error) => {
        if (error.response.data.message instanceof Array) {
          alert(error.response.data.message[0]);
        } else {
          alert(error.response.data.message);
        }
      });

    if (res && res.data.statusCode === 200) {
      const url = res.data.data.paymentUrl;
      router.push(url);
    }
  };

  return users && users.length > 0 ? (
    <form
      onSubmit={isConnected ? buyTokenViaFiat : () => {}}
      className="flex flex-col gap-4 w-[500px] bg-white rounded-lg shadow-lg p-10"
    >
      <div className="text-center font-semibold text-lg">
        STRIPE BUY TOKEN WITH FIAT
      </div>
      <Input
        type="number"
        value={quantity}
        placeholder="Quantity"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      {isConnected ? (
        <Button type="submit">Checkout</Button>
      ) : (
        <ConnectWallet label="Connect Wallet" />
      )}
    </form>
  ) : (
    <div className="text-white flex flex-col gap-4">
      <div>
        Wallet address is not verified! <br />
        Verify your account first to start buying token.
      </div>
      <Link href="/register">
        <Button className="text-white text-sm underline">
          Go to Verify Page
        </Button>
      </Link>
    </div>
  );
}
