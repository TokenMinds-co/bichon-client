import SkewButton from "@/components/shared/SkewButton";
import Image from "next/image";
import React from "react";

export default function SaturnSection() {
  return (
    <section className="relative bg-cover bg-sky2 w-full min-h-screen flex flex-col justify-center">
      <Image // FLOATING DOG
        className="absolute top-0 w-[500px] pl-10 sm:pl-48 aspect-square animate-float"
        alt="floating-dog"
        width={50}
        height={50}
        src="/assets/floating/dog.svg"
      />

      <div className="z-30 flex flex-col items-center gap-10 pt-24 sm:pt-0">
        <div className="text-white text-4xl lg:text-5xl xl:text-6xl w-3/4 2xl:w-1/2 text-center mx-auto">
          EXPLORE MORE UNIVERSES WITH EXTRAORDINARY NUANCES
        </div>
        <div className="flex flex-row gap-5">
          <SkewButton>Button CTA</SkewButton>
          <SkewButton variant="secondary">Read more</SkewButton>
        </div>
      </div>

      <Image // SATURN
        className="absolute w-[750px] 2xl:w-[1000px] right-[-200px] bottom-[-150px] 2xl:right-[-300px] 2xl:bottom-[-250px]"
        alt="floating-saturn"
        width={50}
        height={50}
        src="/assets/floating/saturn.svg"
      />
    </section>
  );
}
