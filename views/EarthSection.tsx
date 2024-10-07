import Footer from "@/components/shared/Footer";
import SkewButton from "@/components/shared/SkewButton";
import React from "react";

export default function EarthSection() {
  return (
    <section className="relative bg-bottom bg-cover bg-earth w-full min-h-screen flex flex-col items-center gap-10 pt-[12.5%]">

      <div className="text-white font-spaceMono text-6xl w-full lg:w-[40%] text-center mx-auto">JOIN OTHER TO EXPERIENCE AN EXTRAORDINARY GALAXY</div>
      <SkewButton variant="secondary">Read more</SkewButton>

      <Footer />
    </section>
  );
}
