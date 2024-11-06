import SkewButton from "@/components/shared/SkewButton";
import React from "react";
import HeroICO from "./HeroICO";
import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import Image from "next/image";

interface HeroSectionProps {
  tokenName: string;
  tokenDecimal: number;
  tokenTicker: string;
  tokenRemain: number;
  tokenPrice: number;
  validUntil: string;
  totalRaised: number;
  targetAmount: number;
}

export default function HeroSection(props: HeroSectionProps) {
  return (
    <section
      id="home"
      className="bg-hero overflow-hidden relative bg-[center_left_-20rem] sm:bg-cover sm:bg-left w-full min-h-screen h-full  pt-32 lg:pt-36 text-white bg-no-repeat pb-0 md:pb-48 xl:pb-0"
    >
      <div className="z-30 w-full h-full flex flex-col xl:flex-row pr-0 pb-32 xl:pb-0">
        <div className="pt-4 flex w-full xl:w-[50%] flex-col justify-between space-y-10 pr-10 md:px-20 px-10">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-5 lg:space-y-0">
            <div className="flex flex-col gap-y-16 md:gap-y-12">
              <div data-aos="fade-down" className="text-md">
                STEP INTO A NEW DIMENSION WHERE SECURITY MEETS INNOVATION
              </div>
              <h1
                data-aos="fade-down"
                data-aos-delay="500"
                className="text-4xl xl:text-4xl xl:leading-[3rem]"
              >
                DISCOVER A UNIVERSE BUILT ON BLOCKCHAIN TECHNOLOGY AND PROTECTED
                BY THE BICHON DEFENDER
              </h1>
              <div className="flex flex-col sm:flex-row gap-5">
                <SkewButton data-aos="fade-left" data-aos-delay="750">
                  Start Journey
                </SkewButton>
                <SkewButton
                  data-aos="fade-left"
                  data-aos-delay="1000"
                  variant="secondary"
                >
                  Discover More
                </SkewButton>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full xl:w-[50%] h-full xl:justify-end xl:items-start items-center justify-center pt-24 xl:pt-0 px-2 xl:pl-0 xl:pr-20">
          <HeroICO
            targetAmount={props.targetAmount}
            tokenDecimal={props.tokenDecimal}
            tokenName={props.tokenName}
            tokenRemain={props.tokenRemain}
            tokenTicker={props.tokenTicker}
            tokenPrice={props.tokenPrice}
            totalRaised={props.totalRaised}
            validUntil={props.validUntil}
          />
        </div>
      </div>

      <div className="absolute hidden md:block md:bottom-[-150px] xl:bottom-[-225px] 2xl:bottom-[-275px] left-1/2 transform -translate-x-1/2">
        <Image 
          className="animate-float w-full 2xl:w-[900px]"
          alt="floating-castle"
          width={50}
          height={50}
          src="/assets/floating/castle.svg"
        />
      </div>

      <BgOverlayBottom />
    </section>
  );
}
