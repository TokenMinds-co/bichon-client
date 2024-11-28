"use client";

import React, { useState } from "react";
import Image from "next/image";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import TeamMemberCard from "@/components/teams/TeamMemberCard";
import { teamMembers } from "@/constant/team";

export default function TeamSection() {
  const [selected, setSelected] = useState<string>("Bobby Lee");

  return (
    <section
      id="roadmap"
      className="relative w-full bg-right-top min-h-screen flex flex-col scroll-mt-28"
    >
      <BgOverlayTop />
      <Image // OVERLAY GRID
        className="absolute right-left top-0 z-[5]"
        src="/assets/bg/grid-2.png"
        alt="grid"
        width={1400}
        height={1400}
      />

      <div className="flex flex-col md:px-20 px-10 z-20">
        <h1
          data-aos="fade-up"
          className="text-5xl xl:text-6xl text-center text-white"
        >
          OUR TEAM
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-20 place-items-center justify-between mt-24 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => {
            return (
              <TeamMemberCard
                key={index}
                index={index}   
                member={member}
                selected={selected}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
