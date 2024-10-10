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

  return (
    transactions && (
      <div className="flex flex-col pb-8">
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
