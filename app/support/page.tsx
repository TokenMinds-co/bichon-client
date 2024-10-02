import FormSupport from "@/components/support/FormSupport";
import React from "react";

const TicketSupportPage = () => {
  return (
    <main className="flex flex-col space-y-5 w-full h-full items-center justify-start bg-gray-800 p-5">
      <h1 className="text-white text-2xl">Ticket Support Page</h1>
      <p className="text-white text-sm">
        Only for registered users. Please verify as user candidate to submit a
        ticket.
      </p>
      <FormSupport />
    </main>
  );
};

export default TicketSupportPage;
