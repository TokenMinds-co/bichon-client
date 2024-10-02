import Overview from "@/components/dashboard/Overview";
import TransactionHistory from "@/components/dashboard/TransactionHistory";
import React from "react";

const DashboardPage = async () => {
  return (
    <main className="container mx-auto p-5 flex flex-col gap-8">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-white">User Dashboard</h1>
      </div>
      <Overview />
      <TransactionHistory />
    </main>
  );
};

export default DashboardPage;
