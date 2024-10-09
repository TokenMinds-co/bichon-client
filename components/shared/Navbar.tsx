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
      href: "/",
    },
    {
      name: "ABOUT US",
      href: "#",
    },
    {
      name: "BUY TOKENS",
      href: "/payment",
    },
    {
      name: "DASHBOARD",
      href: "/dashboard",
    },
    {
      name: "SUPPORT",
      href: "/support",
    },
  ];

  return (
    <nav
      className={`flex fixed top-0 w-full items-center justify-center py-4 px-20 z-30 ease-in-out duration-300 ${
        isScrolled ? "bg-[#000A19]/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex flex-row justify-between">
        <Link href="/" className="text-white text-2xl">
          <Image
            src="/assets/bichon.png"
            alt="bichon"
            height={55}
            width={55}  
          />
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

          <ConnectWallet label="Connect" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
