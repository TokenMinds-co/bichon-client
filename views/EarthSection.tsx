import BgOverlayTop from "@/components/shared/BgOverlayTop";
import Footer from "@/components/shared/Footer";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EarthSection() {
  const socialMedia = [
    {
      name: "twitter",
      icon: "/assets/icons/twitter.svg",
      link: "https://x.com/bichondefender",
    },
    {
      name: "telegram",
      icon: "/assets/icons/telegram.svg",
      link: "https://t.me/bichondefenderOfficial",
    },
    {
      name: "instagram",
      icon: "/assets/icons/instagram.svg",
      link: "https://www.instagram.com/bichondefender",
    },
  ];

  return (
    <section className="relative overflow-x-hidden bg-bottom bg-cover bg-earth w-full min-h-screen px-5">
      <BgOverlayTop />
      <div className="z-30 flex flex-col items-center gap-10 pt-[50%] sm:pt-[30%] lg:pt-[12.5%]">
        <div
          data-aos="fade-down"
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-full sm:w/3/4 2xl:w-[45%] text-center mx-auto xl:leading-[4.5rem]"
        >
          JOIN OTHER TO EXPERIENCE AN EXTRAORDINARY GALAXY
        </div>
        <div data-aos="fade-up" className="flex flex-row gap-5 text-white">
          {socialMedia.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="opacity-90 hover:opacity-100 ease-in-out duration-300"
            >
              <Image
                src={item.icon}
                alt="social-icon"
                width={item.name === "twitter" ? 41 : 40}
                height={item.name === "twitter" ? 41 : 40}
              />
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </section>
  );
}
