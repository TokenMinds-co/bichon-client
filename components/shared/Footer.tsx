import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="text-white z-20 py-12 text-sm font-spaceMono absolute bottom-0 bg-transparent flex flex-row items-center justify-between container">
      <div className="flex gap-8">
        <Link href={"#"}>Privacy Policy</Link>
        <Link href={"#"}>Sitemap</Link>
        <Link href={"#"}>Terms of Use</Link>
      </div>

      <div>Bichon © 2024, All Right Reserved</div>
    </footer>
  );
}
