import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TranscationRow from "./TranscationRow";
import { useTokenDetails } from "@/hooks/useTokenDetails";
import Loader from "../shared/Loader";

export default function TransactionHistory({
  transactions,
  sort,
  setSort,
}: TransactionHistoryProps) {
  const { tokenDetails } = useTokenDetails();

  return (
    <Card className="bg-gradient-to-br mt-8 from-gray-700 to-gray-800 border-gray-600 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-gray-100">
          Transaction History
        </CardTitle>

        <Select defaultValue={sort} onValueChange={(value) => setSort(value)}>
          <SelectTrigger className="w-[180px] text-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Latest</SelectItem>
            <SelectItem value="asc">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="border-gray-700 whitespace-nowrap">
              <TableHead className="text-gray-300">Date & Time</TableHead>
              <TableHead className="text-gray-300 text-center">
                Method
              </TableHead>
              <TableHead className="text-gray-300 text-center">
                Amount
              </TableHead>
              <TableHead className="text-gray-300 text-center">Price</TableHead>
              <TableHead className="text-gray-300 text-center">Total</TableHead>
              <TableHead className="text-gray-300 text-center">State</TableHead>
              <TableHead className="text-gray-300 text-center">
                Reference
              </TableHead>
            </TableRow>
          </TableHeader>

          {transactions?.length <= 0 ? (
            <TableBody>
              <TableRow>
                <td colSpan={7} className="text-center py-4 text-white">
                  No transactions found
                </td>
              </TableRow>
            </TableBody>
          ) : !tokenDetails ? (
            <TableBody>
              <TableRow>
                <td colSpan={7} className="text-center py-4 text-white">
                  <Loader size="20" />
                </td>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {transactions?.map((tx) => (
                <TranscationRow
                  key={tx.id}
                  tx={tx}
                  ticker={tokenDetails.ticker}
                />
              ))}
            </TableBody>
          )}
        </Table>
      </CardContent>
    </Card>
  );
}
