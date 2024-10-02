import React from "react";
import Transcation from "./Transcation";
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

export default function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      date: new Date("2024-10-01"),
      amount: 150,
      price: 0.5,
      total: 75,
      reference:
        "MgyR1jAMpQxc3jNTjMnSDxJrrAkDrm8SjN8ghG8Xk1kSKRE4M3ytUCRbj1nRrpyU1L6y3crCyoLjoKQqtnY3EEa",
    },
    {
      id: 2,
      date: new Date("2024-10-02"),
      amount: 50,
      price: 0.48,
      total: 24,
      reference:
        "3sYZc6Lpekvwf98q8QSvyGBcZ4pUNFjbyZbDobSiq49cEuebgTTHwmBdMmprcbkor4A9MSv9n5b76ahPk5Rmw2vr",
    },
    {
      id: 3,
      date: new Date("2024-10-03"),
      amount: 150,
      price: 0.45,
      total: 67.5,
      reference:
        "3sYZc6Lpekvwf98q8QSvyGBcZ4pUNFjbyZbDobSiq49cEuebgTTHwmBdMmprcbkor4A9MSv9n5b76ahPk5Rmw2vr",
    },
    {
      id: 4,
      date: new Date("2024-10-04"),
      amount: 50,
      price: 0.4,
      total: 20,
      reference:
        "2fqyZeTxY8MCBUq2kQq3fvixYVvzix2ouAhzrxPk79HD3JTzpg4GER5q6ZZ5vntZNRNfL4KhQWJXNgRHxTo4pmjB",
    },
    {
      id: 5,
      date: new Date("2024-10-05"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "5Fp5MyWtBwjdBX9jjqUMQa4ySsuDPDx8GzW95hkMLCKK6HBqRovq8y874tBnt462VfkMEoevAJBeMy4Xx4RJivNa",
    },
    {
      id: 6,
      date: new Date("2024-10-06"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "3sYZc6Lpekvwf98q8QSvyGBcZ4pUNFjbyZbDobSiq49cEuebgTTHwmBdMmprcbkor4A9MSv9n5b76ahPk5Rmw2vr",
    },
    {
      id: 7,
      date: new Date("2024-10-07"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "2fqyZeTxY8MCBUq2kQq3fvixYVvzix2ouAhzrxPk79HD3JTzpg4GER5q6ZZ5vntZNRNfL4KhQWJXNgRHxTo4pmjB",
    },
    {
      id: 8,
      date: new Date("2024-10-08"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "3sYZc6Lpekvwf98q8QSvyGBcZ4pUNFjbyZbDobSiq49cEuebgTTHwmBdMmprcbkor4A9MSv9n5b76ahPk5Rmw2vr",
    },
    {
      id: 9,
      date: new Date("2024-10-09"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "5Fp5MyWtBwjdBX9jjqUMQa4ySsuDPDx8GzW95hkMLCKK6HBqRovq8y874tBnt462VfkMEoevAJBeMy4Xx4RJivNa",
    },
    {
      id: 10,
      date: new Date("2024-10-10"),
      amount: 150,
      price: 0.35,
      total: 52.5,
      reference:
        "MgyR1jAMpQxc3jNTjMnSDxJrrAkDrm8SjN8ghG8Xk1kSKRE4M3ytUCRbj1nRrpyU1L6y3crCyoLjoKQqtnY3EEa",
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-xl text-gray-100">
          Transaction History
        </CardTitle>

        <Select >
          <SelectTrigger className="w-[180px] text-white">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Latest</SelectItem>
            <SelectItem value="dark">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent> 
        <Table className="overflow-x-auto">
          <TableHeader>
            <TableRow className="border-gray-700 whitespace-nowrap">
              <TableHead className="text-gray-300">Date & Time</TableHead>
              <TableHead className="text-gray-300 text-center">
                Amount
              </TableHead>
              <TableHead className="text-gray-300 text-center">Price</TableHead>
              <TableHead className="text-gray-300 text-center">Total</TableHead>
              <TableHead className="text-gray-300 text-center">
                Reference
              </TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {transactions.map((tx) => (
              <Transcation key={tx.id} tx={tx} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
