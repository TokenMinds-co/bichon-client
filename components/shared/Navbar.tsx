"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navMenu = [
    {
      name: "HOME",
      href: "#",
    },
    {
      name: "CRYPTO",
      href: "/crypto",
    },
    {
      name: "PAYMENTS",
      href: "/payment",
    },
    {
      name: "SUPPORT",
      href: "/support",
    },
    {
      name: "DASHBOARD",
      href: "/dashboard",
    },
  ];

  return (
    <nav
      className={`flex fixed top-0 w-full items-center justify-center p-4 z-20 ease-in-out duration-300 ${
        isScrolled ? "bg-gray-900/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container flex flex-row justify-between">
        <Link href="/" className="text-white text-2xl">
          <Image src="/assets/bichon.png" alt="bichon" height={60} width={60} />
        </Link>

        <div className="flex gap-16 items-center">
          <div className="flex flex-row gap-8">
            {navMenu.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-white/90 font-spaceMono text-sm text-nowrap hover:underline"
                aria-label={item.name}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <ConnectWallet label="Sign In" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
