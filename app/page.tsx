import { axiosInstance } from "@/lib/axios";
import CastleSection from "@/views/CastleSection";
import EarthSection from "@/views/EarthSection";
import HeroSection from "@/views/HeroSection";
import SaturnSection from "@/views/SaturnSection";
// import FAQSection from "@/views/FAQSection";
import RoadmapSection from "@/views/RoadmapSection";
import FAQSection from "@/views/FAQSection";
// import TeamSection from "@/views/TeamSection";
import CollabSection from "@/views/CollabSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: icoRes } = await axiosInstance.get("/ico/current");
  const { data: tokenRes } = await axiosInstance.get("/token");
  const ico = icoRes.data as IcoResponse;
  const token = tokenRes.data as TokenDetailsResponse;

  if (!ico || !token) {
    return (
      <div className="bg-[#000A19] font-spaceMono overflow-hidden">
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
        <FAQSection />
        <CastleSection />
        <SaturnSection />
        <RoadmapSection />
        {/* <TeamSection /> */}
        <CollabSection />
        <EarthSection />
      </div>
    );
  }

  return (
    <div className="font-spaceMono bg-[#000A19] overflow-hidden">
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
      <FAQSection />
      <CastleSection />
      <SaturnSection />
      <RoadmapSection />
      {/* <TeamSection /> */}
      <CollabSection />
      <EarthSection />
    </div>
  );
}
