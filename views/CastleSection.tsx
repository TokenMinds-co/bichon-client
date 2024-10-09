import React from "react";
import Image from "next/image";

export default function CastleSection() {
  return (
    <section className="relative bg-sky bg-center bg-cover w-full h-fit xl:h-screen text-white flex flex-col">
      <Image // FLOATING CASTLE
        className="hidden xl:block absolute justify-self-center self-center w-[1000px] pl-20 aspect-square animate-float"
        alt="floating-castle"
        width={50}
        height={50}
        src="/assets/floating/castle.svg"
      />

      <div className="flex flex-col justify-between h-full xl:pl-56 md:px-20 px-10 py-16">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl self-start w-1/2 lg:w-[40%] border-b-[1px] pb-2 xl:pb-6">
          Lorem ipsum color dot sit
        </div>

        <Image // FLOATING CASTLE SMALL SCREEN
          className="xl:hidden justify-self-center self-center w-[1000px] aspect-square animate-float"
          alt="floating-castle"
          width={50}
          height={50}
          src="/assets/floating/castle.svg"
        />

        <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl 2xl:text-5xl self-end w-1/2 lg:w-[40%] border-b-[1px] pb-2 xl:pb-6">
          Earn a pasive income instant.
        </div>
      </div>
    </section>
  );
}
