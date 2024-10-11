import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-white w-full z-20 py-10 text-xs lg:text-sm absolute bottom-0 flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-0 xl:pl-44 px-4 md:px-20">
      <div className="flex gap-y-0 gap-3 sm:gap-4 lg:gap-8 flex-wrap justify-center items-center">
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
