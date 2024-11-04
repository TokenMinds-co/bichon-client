import { axiosInstance } from "@/lib/axios";
import CastleSection from "@/views/CastleSection";
import EarthSection from "@/views/EarthSection";
import HeroSection from "@/views/HeroSection";
import SaturnSection from "@/views/SaturnSection";
import Image from "next/image";
import FAQSection from "@/views/FAQSection";
import RoadmapSection from "@/views/RoadmapSection";

export default async function Home() {
  const { data: icoRes } = await axiosInstance.get("/ico/current");
  const { data: tokenRes } = await axiosInstance.get("/token");
  const ico = icoRes.data as IcoResponse;
  const token = tokenRes.data as TokenDetailsResponse;

  if (!ico) {
    return (
      <div className="bg-[#000A19] font-spaceMono overflow-x-hidden">
        <Image // FIXED TIME FRAME
          className="w-auto h-[70vh] fixed hidden xl:block left-32 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 object-cover"
          alt="time-frame"
          width={10}
          height={10}
          src="/assets/time.svg"
        />

        <HeroSection
          targetAmount={0}
          tokenDecimal={6}
          tokenRemain={0}
          tokenName={"Bichon Defender"}
          tokenTicker={"BDF"}
          tokenPrice={0}
          totalRaised={token?.totalRaised ?? 0}
          validUntil={new Date().toISOString()}
        />
        <CastleSection />
        <SaturnSection />
        <RoadmapSection />
        <FAQSection />
        <EarthSection />
      </div>
    );
  }

  return (
    <div className="bg-[#000A19] font-spaceMono overflow-x-hidden">
      <Image // FIXED TIME FRAME
        className="w-auto h-[70vh] fixed hidden xl:block left-32 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 object-cover"
        alt="time-frame"
        width={10}
        height={10}
        src="/assets/time.svg"
      />

      <HeroSection
        targetAmount={ico.targetAmount}
        tokenDecimal={token.decimal}
        tokenName={token.name}
        tokenRemain={ico.maxAmount - ico.purchased}
        tokenTicker={token.ticker}
        tokenPrice={ico.currentPrice}
        totalRaised={ico.raisedAmount}
        validUntil={ico.validUntil}
      />
      <CastleSection />
      <SaturnSection />
      <RoadmapSection />
      <FAQSection />
      <EarthSection />
    </div>
  );
}
