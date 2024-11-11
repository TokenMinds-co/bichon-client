"use client";

import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import TransactionHistory from "./TransactionHistory";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@particle-network/connectkit";
import TablePagination from "../shared/TablePagination";
import Unauthenticated from "../shared/unauthenticated";
import Loader from "../shared/Loader";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("desc");
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

  useEffect(() => {
    if (!isLoading) {
      if (
        users?.length === 0 
        // ||
        // (users && users[0]?.kyc?.status !== "APPROVED")
      ) {
        redirect("/register");
      }
    }
  }, [isLoading, users]);

  return !isConnected ? (
    <div className="absolute h-screen w-full flex items-center justify-center">
      <Unauthenticated />
    </div>
  ) : isLoading ? (
    <div className="absolute h-screen w-full flex items-center justify-center">
      <Loader size="50" />
    </div>
  ) : (
    users &&
    users.length !== 0 &&
    users[0]?.kyc &&
    users[0].kyc.status === "APPROVED" && (
      <div className="flex flex-col pb-8 pt-24 container mx-auto px-5 md:px-0">
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
    )
  );
}
