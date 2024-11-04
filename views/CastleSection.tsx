import React from "react";
import Image from "next/image";
import ClientParallax from "@/components/shared/ClientParallax";

export default function CastleSection() {
  return (
    <section className="relative bg-sky bg-center bg-cover w-full h-fit xl:h-screen text-white flex flex-col">
      <ClientParallax
        translateY={[40, -100]}
        className="h-full hidden xl:flex absolute justify-self-center self-center w-[1000px] mt-[300px] z-0 pl-20 aspect-square"
      >
        <Image // FLOATING CASTLE
          className="w-full h-full animate-float"
          alt="floating-castle"
          width={50}
          height={50}
          src="/assets/floating/castle.svg"
        />
      </ClientParallax>

      <div className="flex flex-col justify-around h-full xl:pl-56 md:px-20 px-10 py-16">
        <ClientParallax
          translateY={[200, -50]}
          opacity={[0, 1]}
          className="text-base sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl self-start w-[70%] sm:w-1/2 lg:w-[40%] border-b-[1px] pb-2 xl:pb-6"
        >
          Lorem ipsum color dot sit
        </ClientParallax>

        <ClientParallax
          translateY={[100, -30]}
          opacity={[0, 1]}
          className="w-full h-full mb-[100px] xl:mb-0"
        >
          <Image // FLOATING CASTLE SMALL SCREEN
            className="xl:hidden justify-self-center self-center w-[2000px] aspect-square animate-float"
            alt="floating-castle"
            width={50}
            height={50}
            src="/assets/floating/castle.svg"
          />
        </ClientParallax>

        <ClientParallax
          translateY={[200, -50]}
          opacity={[0, 1]}
          className="text-base sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl self-end w-[70%] sm:w-1/2 lg:w-[40%] border-b-[1px] pb-2 xl:pb-6"
        >
          Earn a pasive income instant.
        </ClientParallax>
      </div>
    </section>
  );
}
