"use client";

import { generateAxiosInstance } from "@/lib/axios-client";
import { useAccount } from "@particle-network/connectkit";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FormSupport from "./FormSupport";
import { redirect } from "next/navigation";

const Support = () => {
  const { address, isConnected } = useAccount();
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
  if (users?.length === 0 || (users && users[0]?.kyc?.status !== "APPROVED")) {
    redirect("/kyc");
  }

  return isConnected ? (
    <div className="flex flex-col space-y-2 w-full h-full items-center justify-center">
      {users && users.length > 0 && <FormSupport email={users[0].email} />}
    </div>
  ) : (
    <h1 className="text-2xl text-center h-full">Connect Wallet To Continue</h1>
  );
};

export default Support;
