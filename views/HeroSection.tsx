import SkewButton from "@/components/shared/SkewButton";
import React from "react";
import HeroICO from "./HeroICO";
import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import Image from "next/image";
import Link from "next/link";

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
      className="bg-hero overflow-hidden relative bg-cover bg-[center_left_-35rem] sm:bg-cover sm:bg-left w-full min-h-screen h-full pt-32 lg:pt-36 text-white bg-no-repeat pb-24 md:pb-48 xl:pb-0"
    >
      <div className="z-30 w-full h-full flex flex-col xl:flex-row pr-0 pb-32 xl:pb-0">
        <div className="pt-4 flex w-full xl:w-[50%] flex-col justify-between space-y-10 pr-10 md:px-20 px-10">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-5 lg:space-y-0">
            <div className="flex flex-col gap-y-16 md:gap-y-12 items-center xl:items-start">
              <div data-aos="fade-down" className="text-md">
                STEP INTO A NEW DIMENSION WHERE SECURITY MEETS INNOVATION
              </div>
              <h1
                data-aos="fade-down"
                data-aos-delay="500"
                className="text-4xl xl:text-4xl xl:leading-[3rem] text-center xl:text-start"
              >
                DISCOVER A UNIVERSE BUILT ON BLOCKCHAIN TECHNOLOGY AND PROTECTED
                BY THE BICHON DEFENDER
              </h1>
              <div className="flex flex-col sm:flex-row gap-5">
                <SkewButton data-aos="fade-left" data-aos-delay="750">
                  <Link href="/ico">Start Journey</Link>
                </SkewButton>
                <SkewButton
                  data-aos="fade-left"
                  data-aos-delay="1000"
                  variant="secondary"
                >
                  <Link
                    href="https://bichondefender.gitbook.io/bichondefender-docs"
                    target="_blank"
                  >
                    Discover More
                  </Link>
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

      {/* <div className="absolute bottom-[0px] md:bottom-[-100px] xl:bottom-[-225px] 2xl:bottom-[-275px] left-1/2 transform -translate-x-1/2"> */}

      <div className="w-screen flex justify-center h-[200px] lg:h-[100px]">
        <Image
          className="animate-float absolute bottom-0 xs:bottom-[-125px] md:bottom-[-100px] lg:bottom-[-225px] w-full xs:max-w-lg sm:max-w-xl md:max-w-xl lg:max-w-xl 2xl:max-w-2xl"
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
