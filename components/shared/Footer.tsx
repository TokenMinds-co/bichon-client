import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-white z-20 py-12 text-xs lg:text-sm font-spaceMono absolute bottom-0 bg-transparent flex flex-row items-center justify-between container px-5 lg:px-0 gap-3 lg:gap-0">
      <div className="flex gap-y-0 gap-3 sm:gap-4 lg:gap-8 flex-wrap">
        <Link className="hover:underline" href={"#"}>
          Privacy Policy
        </Link>
        <Link className="hover:underline" href={"#"}>
          Sitemap
        </Link>
        <Link className="hover:underline" href={"#"}>
          Terms of Use
        </Link>
      </div>

      <div>Bichon © 2024, All Right Reserved</div>
    </footer>
  );
}
