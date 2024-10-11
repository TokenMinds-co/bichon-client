import PartnerCard from "@/components/landing/PartnerCard";
import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import {
  AxeIcon,
  BananaIcon,
  BellElectric,
  ChartCandlestick,
  DnaIcon,
  DogIcon,
  EggIcon,
  GemIcon,
  OmegaIcon,
  WineIcon,
} from "lucide-react";
import React from "react";

export default function PartnerSection() {
  const partners = [
    { name: "BananaSwap", icon: <BananaIcon /> },
    { name: "ElectricBell", icon: <BellElectric /> },
    { name: "CryptoAxe", icon: <AxeIcon /> },
    { name: "PuppyDEX", icon: <DogIcon /> },
    { name: "WineAirdrop", icon: <WineIcon /> },
    { name: "GlobalChart", icon: <ChartCandlestick /> },
    { name: "CryptoDNA", icon: <DnaIcon /> },
    { name: "Eggpad", icon: <EggIcon /> },
    { name: "TreasuryGem", icon: <GemIcon /> },
    { name: "HorseExchange", icon: <OmegaIcon /> },
  ];

  return (
    <section className="relative bg-partner bg-center bg-cover bg-earth w-full min-h-screen text-white flex justify-center items-center">
      <BgOverlayTop />

      <div className="z-30 flex flex-col gap-16 sm:gap-24 w-full sm:w-[75%] mx-auto items-center">
        <h1
          data-aos="fade-down"
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-center"
        >
          OUR PARTNERS
        </h1>

        <div className="flex flex-row gap-5 sm:gap-10 flex-wrap items-center justify-center">
          {partners.map((partner, index) => (
            <PartnerCard key={index} name={partner.name} icon={partner.icon} />
          ))}
        </div>
      </div>

      <BgOverlayBottom />
    </section>
  );
}
