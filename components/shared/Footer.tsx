"use client";

import Link from "next/link";
import React from "react";

export default function Footer() {
  // const googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  // };

  // useEffect(() => {
  //   const addScript = document.createElement("script");
  //   addScript.src =
  //     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  //   document.body.appendChild(addScript);

  //   window.googleTranslateElementInit = googleTranslateElementInit;

  //   return () => {
  //     document.body.removeChild(addScript);
  //   };
  // }, []);

  return (
    <footer className="text-white z-20 py-10 text-xs lg:text-sm absolute bottom-0 flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-0 w-full px-10 xl:px-20">
      <div
        data-aos="fade-right"
        className="flex gap-y-0 gap-3 sm:gap-4 lg:gap-8 flex-wrap justify-center items-center"
      >
        <Link className="hover:underline" href={"#"}>
          Privacy Policy
        </Link>
        <Link
          className="hover:underline"
          href={"https://bichondefender.com/sitemap.xml"}
        >
          Sitemap
        </Link>
        <Link
          className="hover:underline"
          href={"https://bichondefender.gitbook.io/bichondefender-docs#"}
        >
          Whitepaper
        </Link>
      </div>
      {/* <div className="text-white" id="google_translate_element" /> */}

      <div data-aos="fade-left">Bichon © 2024, All Right Reserved</div>
    </footer>
  );
}
