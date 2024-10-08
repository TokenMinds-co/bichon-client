import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-hero bg-cover bg-top w-full min-h-screen pt-28 flex flex-col items-center justify-center">
      <BgOverlayBottom />
    </section>
  );
}
