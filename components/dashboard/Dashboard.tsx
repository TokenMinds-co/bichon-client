"use client";

import React, { useState } from "react";
import Overview from "./Overview";
import TransactionHistory from "./TransactionHistory";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@particle-network/connectkit";
import TablePagination from "../shared/TablePagination";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("desc");
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

  const { data: transactions } = useQuery({
    queryKey: ["get-transactions", address, sort, page],
    queryFn: async () => {
      if (!address) return null;
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/users/transactions?address=${address}&sort=${sort}&page=${page}&limit=10`
      );
      return data;
    },
    enabled: !!address,
  });

  return isConnected ? (
    <div className="flex flex-col pb-8 pt-28 container mx-auto">
      <div className="flex flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">User Dashboard</h1>
      </div>

      <Overview />
      
      <TransactionHistory
        sort={sort}
        setSort={setSort}
        transactions={
          transactions?.data?.transactions as UserTransactionResponse[]
        }
      />

      <TablePagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={transactions?.metadata?.totalPage || 0}
      />
    </div>
  ) : (
    <h1 className="absolute w-screen h-screen text-2xl text-white font-spaceMono text-center flex justify-center items-center">Connect Wallet To Continue</h1>
  );
}
