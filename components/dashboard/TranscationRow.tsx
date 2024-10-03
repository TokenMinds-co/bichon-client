"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { shortenTx } from "@/lib/utils";
import { format } from "date-fns";

export default function TranscationRow({ tx }: { tx: UserTransactionResponse }) {
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!"); // Notify the user
  };

  return (
    <TableRow className="border-gray-700">
      <TableCell className="text-gray-300">
        {format(tx.createdAt, "MMMM dd, yyyy hh:mm a")}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        {tx.amount.toLocaleString()} BCH
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${(tx.totalPrice / tx.amount).toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${tx.totalPrice.toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        <div
          className="hover:underline cursor-pointer"
          onClick={() => copyToClipboard(tx.reference)}
        >
          {shortenTx(tx.reference)}
        </div>
      </TableCell>
    </TableRow>
  );
}
