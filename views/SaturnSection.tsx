import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import ClientParallax from "@/components/shared/ClientParallax";
import SkewButton from "@/components/shared/SkewButton";
import Image from "next/image";
import React from "react";

export default function SaturnSection() {
  return (
    <section className="relative bg-cover bg-sky2 w-full min-h-screen flex flex-col justify-center">
      <BgOverlayTop />

      <ClientParallax
        translateY={[-10, 40]}
        className="w-full h-full mb-[100px] xl:mb-0 absolute top-0 left-0 z-10"
      >
        <Image // FLOATING DOG
          className="w-[475px] xl:pl-36 aspect-square animate-fly"
          alt="floating-dog"
          width={50}
          height={50}
          src="/assets/floating/dog.svg"
        />
      </ClientParallax>

      <div className="z-30 flex flex-col items-center gap-10 pt-24 sm:pt-0">
        <div
          data-aos="fade-down"
          className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl w-3/4 2xl:w-1/2 text-center mx-auto xl:leading-[4.5rem]"
        >
          EXPLORE MORE UNIVERSES WITH EXTRAORDINARY NUANCES
        </div>
        <div className="flex flex-row gap-5">
          <SkewButton data-aos="fade-right">Button CTA</SkewButton>
          <SkewButton data-aos="fade-left" variant="secondary">
            Read more
          </SkewButton>
        </div>
      </div>

      <ClientParallax
        translateY={[30, -10]}
        className="absolute w-[725px] 2xl:w-[1000px] right-[-470px] md:right-[-400px] bottom-[-80px] sm:bottom-[-150px] 2xl:right-[-300px] 2xl:bottom-[-250px] mb-[100px]"
      >
        <Image // SATURN
          className="w-[500px] lg:w-[725px] 2xl:w-[1000px] h-full animate-flyReverse"
          alt="floating-saturn"
          width={50}
          height={50}
          src="/assets/floating/saturn.svg"
        />
      </ClientParallax>

      <BgOverlayBottom />
    </section>
  );
}
