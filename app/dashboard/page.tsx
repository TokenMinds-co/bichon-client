import FormKYC from "@/components/dashboard/FormKYC";
import AppConnectButton from "@/components/shared/AppConnectButton";
import React from "react";

const DashboardPage = async () => {
  return (
    <main className="flex flex-col w-full h-screen items-center justify-center space-y-5 bg-gray-800 p-5">
      <AppConnectButton />
      <FormKYC />
    </main>
  );
};

export default DashboardPage;
