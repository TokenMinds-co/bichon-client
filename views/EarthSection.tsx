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
      size: 41,
    },
    {
      name: "telegram",
      icon: "/assets/icons/telegram.svg",
      link: "https://t.me/bichondefenderOfficial",
      size: 40,
    },
    {
      name: "instagram",
      icon: "/assets/icons/instagram.svg",
      link: "https://www.instagram.com/bichondefender_",
      size: 41,
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
        <div className="flex flex-row gap-5 text-white">
          {socialMedia.map((item, index) => (
            <Link
              data-aos="fade-up"
              data-aos-delay={`${index * 200}`}
              key={index}
              href={item.link}
              className="opacity-90 hover:opacity-100 ease-in-out duration-300"
            >
              <Image
                src={item.icon}
                alt="social-icon"
                width={item.size}
                height={item.size}
              />
            </Link>
          ))}
        </div>
        <Footer />
      </div>
    </section>
  );
}
