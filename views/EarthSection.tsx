import BgOverlayTop from "@/components/shared/BgOverlayTop";
import Footer from "@/components/shared/Footer";
import SkewButton from "@/components/shared/SkewButton";
import React from "react";

export default function EarthSection() {
  return (
    <section className="relative bg-bottom bg-cover bg-earth w-full min-h-screen ">
      <BgOverlayTop />

      <div className="z-30 flex flex-col items-center gap-10 pt-[20%] lg:pt-[12.5%]">
        <div className="text-white text-4xl lg:text-5xl xl:text-6xl w-3/4 2xl:w-[45%] text-center mx-auto xl:leading-[4.5rem]">
          JOIN OTHER TO EXPERIENCE AN EXTRAORDINARY GALAXY
        </div>
        <SkewButton variant="secondary">Read more</SkewButton>
        <Footer />
      </div>
    </section>
  );
}
