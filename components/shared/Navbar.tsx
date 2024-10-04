import Link from "next/link";
import React from "react";
import AppConnectButton from "./AppConnectButton";

const Navbar = () => {
  return (
    <nav className="flex fixed top-0 w-full items-center justify-center bg-gray-900 shadow-lg p-5">
      <div className="container flex flex-row justify-between">
        <Link href="/" className="text-white text-2xl">
          Bichon Defender
        </Link>
        <div className="flex items-center space-x-5">
          <Link
            href="/dashboard"
            className="text-white hover:underline"
            aria-label="Dashboard"
          >
            Dashboard
          </Link>
          <Link
            href="/support"
            className="text-white hover:underline"
            aria-label="Support"
          >
            Support
          </Link>
          <Link
            href="/payment"
            className="text-white hover:underline"
            aria-label="Payment"
          >
            Payment
          </Link>
          <AppConnectButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
