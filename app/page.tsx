import CastleSection from "@/views/CastleSection";
import EarthSection from "@/views/EarthSection";
import HeroSection from "@/views/HeroSection";
import RoadmapSection from "@/views/RoadmapSection";
import SaturnSection from "@/views/SaturnSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-[#000A19] font-spaceMono overflow-x-hidden">
      <Image // FIXED TIME FRAME
        className="w-fit h-[70vh] fixed hidden xl:block left-32 top-1/2 transform -translate-x-1/2 -translate-y-[45%] z-30 object-cover"
        alt="time-frame"
        width={10}
        height={10}
        src="/assets/time.svg"
      />

      <HeroSection />
      <CastleSection />
      <SaturnSection />
      <RoadmapSection/>
      <EarthSection />
    </div>
  );
}
