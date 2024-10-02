import AppConnectButton from "@/components/shared/AppConnectButton";
import FormSupport from "@/components/support/FormSupport";
import React from "react";

const TicketSupportPage = () => {
  return (
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-start bg-gray-800 p-5">
      <h1 className="text-white text-2xl">Ticket Support Page</h1>
      <AppConnectButton />
      <FormSupport />
    </main>
  );
};

export default TicketSupportPage;
