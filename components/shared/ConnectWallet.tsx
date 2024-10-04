"use client";

import React from "react";
import { useModal, useAccount } from "@particle-network/connectkit";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon } from "lucide-react";

const ConnectWallet = ({ label }: { label: string }) => {
  const { setOpen } = useModal();
  const { status, address } = useAccount();

  const truncatedAddress =
    address && `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Button
      type="button"
      className="flex flex-row gap-3 py-5 items-center justify-center duration-200 ease-in-out"
      onClick={() => setOpen(true)}
    >
      {status === "connected" ? (
        <>
          <Avatar className="h-6 w-6">
            <AvatarImage
              src="https://s2.coinmarketcap.com/static/img/coins/200x200/5426.png"
              alt="solana-logo"
              className="rounded-full object-cover"
            />
            <AvatarFallback>SOL</AvatarFallback>
          </Avatar>
          <div>{truncatedAddress}</div>
          <EllipsisVerticalIcon size={13} color="#8B8EA1" />
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default ConnectWallet;
