"use client";

import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { shortenTx } from "@/lib/utils";
import { format } from "date-fns";

interface Transaction {
  id?: number;
  date: Date;
  amount: number;
  price: number;
  total: number;
  reference: string;
}

export default function Transcation({ tx }: { tx: Transaction }) {
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    alert("Copied to clipboard!"); // Notify the user
  };

  return (
    <TableRow className="border-gray-700">
      <TableCell className="text-gray-300">
        {format(tx.date, "MMMM dd, yyyy hh:mm a")}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        {tx.amount.toLocaleString()} BCH
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${tx.price.toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        ${tx.total.toFixed(2)}
      </TableCell>
      <TableCell className="text-gray-300 text-center">
        <div className="hover:underline cursor-pointer" onClick={() => copyToClipboard(tx.reference)}>
          {shortenTx(tx.reference)}
        </div>
      </TableCell>
    </TableRow>
  );
}
