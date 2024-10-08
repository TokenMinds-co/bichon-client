import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import SkewButton from "@/components/shared/SkewButton";
import React from "react";

export default function HeroSection() {
  return (
    <section className="bg-hero bg-cover bg-top w-full h-screen pt-40 text-white  ">
      <div className="z-30 xl:w-[70%] w-[80%] h-full 50 flex flex-col justify-between xl:pl-56 md:px-20 px-10">
        <div className="flex flex-col gap-y-12">
          <div className="text-lg">LOREM IPSUM COLOR SIT DOLOR.</div>
          <h1 className="text-6xl xl:text-7xl">EXPLORE THE BICHON UNIVERSE</h1>
          <div className="flex flex-row gap-5">
            <SkewButton>Button CTA</SkewButton>
            <SkewButton variant="secondary">Read more</SkewButton>
          </div>
        </div>

        <div className="w-fit pb-28">
          <hr />
          <div className="flex flex-row gap-5 pt-5 whitespace-nowrap">
            <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10">
              <div className="text-xs md:text-sm">Project</div>
              <div className="text-xl md:text-2xl">250+</div>
            </div>

            <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10 border-l-[1px] border-r-[1px] border-white">
              <div className="text-xs md:text-sm ">Client Success</div>
              <div className="text-xl md:text-2xl">2000+</div>
            </div>

            <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10">
              <div className="text-xs md:text-sm">Profit</div>
              <div className="text-xl md:text-2xl">1000 USD</div>
            </div>
          </div>
        </div>
      </div>

      <BgOverlayBottom />
    </section>
  );
}
