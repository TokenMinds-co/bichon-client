"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { shortenTx } from "@/lib/utils";
import { format } from "date-fns";
import { getExplorer } from "@/providers/connectkit";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface TransactionRowProps {
  tx: UserTransactionResponse;
  ticker: string;
}

export default function TranscationRow({ tx, ticker }: TransactionRowProps) {
  const { env, explorer } = getExplorer();
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  let link = `${explorer}/tx/${tx.reference}`;
  if (tx.method !== "FIAT" && env === "development") {
    link += "?cluster=devnet";
  }

  return (
    <TableRow className="border-gray-700">
      <TableCell className="text-gray-300">
        {format(tx.createdAt, "MMMM dd, yyyy hh:mm a")}
      </TableCell>
      <TableCell className="text-gray-300 text-center">{tx.method}</TableCell>
      <TableCell className="text-gray-300 text-center">
        {tx.amount.toLocaleString()} {ticker}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${(tx.totalPrice / tx.amount).toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${tx.totalPrice.toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        <Badge
          className={
            tx.state === "COMPLETED"
              ? "bg-green-500"
              : tx.state === "PENDING"
              ? "bg-orange-500"
              : "bg-red-500"
          }
        >
          {tx.state}
        </Badge>
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        {tx.method === "FIAT" ? (
          <div
            className="hover:underline cursor-pointer"
            onClick={() => copyToClipboard(tx.reference)}
          >
            {shortenTx(tx.reference)}
          </div>
        ) : (
          <Link
            href={link}
            target="_blank"
            className="hover:underline cursor-pointer text-blue-500"
          >
            {shortenTx(tx.reference)}
          </Link>
        )}
      </TableCell>
    </TableRow>
  );
}
