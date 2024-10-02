import Link from "next/link";
import React from "react";
import AppConnectButton from "./AppConnectButton";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 p-5">
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
        <AppConnectButton />
      </div>
    </nav>
  );
};

export default Navbar;
