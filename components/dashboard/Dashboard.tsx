"use client";

import React, { useState } from "react";
import Overview from "./Overview";
import TransactionHistory from "./TransactionHistory";
import { generateAxiosInstance } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "@particle-network/connectkit";
import Link from "next/link";
import { Button } from "../ui/button";
import TablePagination from "../shared/TablePagination";

export default function Dashboard() {
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<string>("desc");
  const { address } = useAccount();

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

  return overview ? (
    <div className="flex flex-col pb-8">
      <Overview
        tokenPrice={overview?.tokenPrice || "0"}
        totalToken={overview?.totalToken || "0"}
      />
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
    <div className="text-white flex flex-col gap-4">
      <div>
        Wallet address is not verified! <br />
        Verify your account first to access the user dashboard.
      </div>
      <Link href="/kyc">
        <Button className="text-white text-sm underline">
          Go to Verify Page
        </Button>
      </Link>
    </div>
  );
}
