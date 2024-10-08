import CastleSection from "@/views/CastleSection";
import EarthSection from "@/views/EarthSection";
import HeroSection from "@/views/HeroSection";

export default function Home() {
  return (
    <div className="bg-[#000A19]">
      <HeroSection />
      <CastleSection />
      <EarthSection />
    </div>
  );
}
