import SkewButton from "@/components/shared/SkewButton";
import React from "react";
import HeroICO from "./HeroICO";
import BgOverlayBottom from "@/components/shared/BgOverlayBottom";

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
      className="bg-hero overflow-x-hidden relative bg-[center_left_-20rem] sm:bg-cover sm:bg-left w-full min-h-screen h-full pt-32 lg:pt-36 text-white bg-no-repeat"
    >
      <div className="z-30 w-full h-full flex flex-col xl:flex-row pr-0 pb-32 xl:pb-0">
        <div className="pt-4 flex w-full xl:w-[55%] flex-col justify-between xl:pl-24 2xl:pl-44 md:px-20 px-10 space-y-10">
          <div className="flex flex-col lg:flex-row items-start justify-between space-y-5 lg:space-y-0">
            <div className="flex flex-col gap-y-10">
              <div data-aos="fade-down" className="text-md">
                STEP INTO A NEW DIMENSION WHERE SECURITY MEETS INNOVATION
              </div>
              <h1
                data-aos="fade-down"
                data-aos-delay="500"
                className="text-4xl xl:text-5xl xl:leading-[4rem]"
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

          {/* <div
            className="w-full sm:w-fit pt-24 z-20 sm:pt-36"
            data-aos="fade-up"
            data-aos-delay="1250"
          >
            <hr className="hidden sm:block" />
            <div className="flex  flex-col sm:flex-row gap-5 pt-5 whitespace-nowrap">
              <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10">
                <div className="text-xs md:text-sm">Project</div>
                <div className="text-xl md:text-2xl">250+</div>
              </div>

              <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10 py-5 sm:py-0 border-t-[1px] border-b-[1px] sm:border-t-[0px] sm:border-b-[0px] sm:border-l-[1px] sm:border-r-[1px] border-white">
                <div className="text-xs md:text-sm ">Client Success</div>
                <div className="text-xl md:text-2xl">2000+</div>
              </div>

              <div className="flex flex-col gap-1 text-center px-3 sm:px-5 md:px-10">
                <div className="text-xs md:text-sm">Profit</div>
                <div className="text-xl md:text-2xl">1000 USD</div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex w-full xl:w-[47%] h-full items-center justify-center pt-24 px-5 xl:px-0">
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

      <BgOverlayBottom />
    </section>
  );
}
