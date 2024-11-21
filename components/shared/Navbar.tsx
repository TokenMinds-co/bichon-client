"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";
import Image from "next/image";
import { Button } from "../ui/button";
import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navMenu = [
    {
      name: "HOME",
      href: "/#home",
    },
    {
      name: "ROADMAP",
      href: "/#roadmap ",
    },
    {
      name: "FAQ",
      href: "/#faq",
    },
    {
      name: "WHITEPAPER",
      href: "https://bichondefender.gitbook.io/bichondefender-docs",
    },
    {
      name: "ICO",
      href: "/ico",
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

  return (
    <nav
      className={`flex fixed top-0 w-full items-center justify-center py-4 px-5 md:px-16 lg:px-20 z-50 ease-in-out duration-300 ${
        isScrolled ? "bg-[#000A19]/75 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="w-full flex flex-row justify-between">
        <Link href="/#home" className="text-white text-2xl hidden lg:block">
          <Image src="/assets/bichon.png" alt="bichon" height={55} width={55} />
        </Link>

        {/* SMALL NAV MENU */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="link">
              <AlignJustify color="white" className="block lg:hidden" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] text-white bg-[#000A19] border-white/50"
          >
            <nav className="flex flex-col gap gap-4 mt-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl self-center mb-10"
              >
                <Image
                  src="/assets/bichon.png"
                  alt="bichon"
                  height={100}
                  width={100}
                />
              </Link>

              {navMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-lg font-spaceMono hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex gap-16 items-center">
          <div className="flex-row gap-8 hidden lg:flex">
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
