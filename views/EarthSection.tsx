import BgOverlayTop from "@/components/shared/BgOverlayTop";
import Footer from "@/components/shared/Footer";
import SkewButton from "@/components/shared/SkewButton";
import Link from "next/link";
import React from "react";

export default function EarthSection() {
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
        <div className="flex flex-row gap-3 text-white">
          <SkewButton
            data-aos="fade-right"
            data-aos-delay="1000"
            variant="secondary"
          >
            <Link href="https://x.com/bichondefender" target="_blank">
              Twitter
            </Link>
          </SkewButton>
          <SkewButton
            data-aos="fade-left"
            data-aos-delay="1000"
            variant="secondary"
          >
            <Link href="https://t.me/bichondefenderOfficial" target="_blank">
              Telegram
            </Link>
          </SkewButton>
          <SkewButton
            data-aos="fade-left"
            data-aos-delay="1000"
            variant="secondary"
          >
            <Link
              href="https://www.instagram.com/bichondefender_/"
              target="_blank"
            >
              Instagram
            </Link>
          </SkewButton>
        </div>
        <Footer />
      </div>
    </section>
  );
}
