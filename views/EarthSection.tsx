import BgOverlayTop from "@/components/shared/BgOverlayTop";
import Footer from "@/components/shared/Footer";
import SkewButton from "@/components/shared/SkewButton";
import React from "react";

export default function EarthSection() {
  return (
    <section className="relative bg-bottom bg-cover bg-earth w-full min-h-screen ">
      <BgOverlayTop />

      <div className="z-30 flex flex-col items-center gap-10 pt-[40%] sm:pt-[20%] lg:pt-[12.5%]">
        <div
          data-aos="fade-down"
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-full sm:w/3/4 2xl:w-[45%] text-center mx-auto xl:leading-[4.5rem]"
        >
          JOIN OTHER TO EXPERIENCE AN EXTRAORDINARY GALAXY
        </div>
        <SkewButton data-aos="fade-up" variant="secondary">
          Read more
        </SkewButton>
        <Footer />
      </div>
    </section>
  );
}
