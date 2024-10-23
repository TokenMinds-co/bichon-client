import SkewButton from "@/components/shared/SkewButton";
import React from "react";
import HeroICO from "./HeroICO";

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
      className="bg-hero bg-cover bg-top w-full min-h-screen h-full pt-32 lg:pt-36 text-white  "
    >
      <div className="z-30 w-full h-full flex flex-col justify-between xl:pl-56 md:px-20 px-10 space-y-10">
        <div className="flex flex-col lg:flex-row items-start justify-between space-y-5 lg:space-y-0">
          <div className="flex flex-col gap-y-12">
            <div data-aos="fade-down" className="text-lg">
              LOREM IPSUM COLOR SIT DOLOR.
            </div>
            <h1
              data-aos="fade-down"
              data-aos-delay="500"
              className="text-5xl md:text-6xl xl:text-7xl xl:leading-[5rem]"
            >
              EXPLORE THE BICHON UNIVERSE
            </h1>
            <div className="flex flex-col sm:flex-row gap-5">
              <SkewButton data-aos="fade-left" data-aos-delay="750">
                Button CTA
              </SkewButton>
              <SkewButton
                data-aos="fade-left"
                data-aos-delay="1000"
                variant="secondary"
              >
                Read more
              </SkewButton>
            </div>
          </div>
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

        <div
          className="w-full sm:w-fit pb-20 z-20 sm:pb-36"
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
        </div>
      </div>
    </section>
  );
}
