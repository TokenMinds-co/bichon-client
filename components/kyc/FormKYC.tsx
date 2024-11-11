"use client";

import { useAccount } from "@particle-network/connectkit";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import Loader from "../shared/Loader";
import RenderKYC from "./RenderKYC";

const FormKYC = () => {
  const { address, isConnected } = useAccount();

  const { data: users, isLoading } = useQuery({
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
    <div className="flex flex-col w-full items-center justify-center text-white">
      {!isConnected ? (
        <h1 className="text-2xl text-white text-center h-full">
          Connect Wallet To Continue
        </h1>
      ) : (
        <>
          {isLoading || !address ? (
            <Loader size="50" />
          ) : (
            <RenderKYC address={address} users={users ? users : []} />
          )}
        </>
      )}
    </div>
  );
};

export default FormKYC;
