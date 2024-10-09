import React from "react";
import Image from "next/image";
import SkewButton from "@/components/shared/SkewButton";
import { ArrowLeft } from "lucide-react";
import RoadmapCard from "@/components/shared/RoadmapCard";

export default function RoadmapSection() {
  const roadmapStep = [
    {
      step: 1,
      time: "Q4 2024",
      title: "Founding of Bichon",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 2,
      time: "Q2 2024",
      title: "Presale Start",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 3,
      time: "Q3 2024",
      title: "Partnership Start",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 4,
      time: "Q4 2024",
      title: "Airdorp Start",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
  ];

  return (
    <section className="relative w-full bg-right-top min-h-screen flex flex-col">
      <Image // OVERLAY GRID
        className="absolute right-0 top-0"
        src="/assets/bg/grid.png"
        alt="grid"
        width={1400}
        height={1400}
      />

      <div className="flex flex-col xl:pl-60 md:px-20 px-10 pt-20">
        {/* TITLE & PAGINATE */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-12 sm:mb-20">
          <h1 className="text-6xl text-white">ROADMAP BICHON</h1>
          <div className="flex flex-row gap-4 mt-12 sm:mt-0">
            <SkewButton className="px-8 py-6" variant="secondary">
              <ArrowLeft className="rotate-[-45deg]" />
            </SkewButton>
            <SkewButton className="px-8 py-6">
              <ArrowLeft className="rotate-[135deg]" />
            </SkewButton>
          </div>
        </div>

        {/* ROADMAP CONTENT */}
        <div className="">
          <RoadmapCard
            time={roadmapStep[0].time}
            desc={roadmapStep[0].desc}
            title={roadmapStep[0].title}
          />
        </div>
      </div>

      <Image // FLOATING ROCK
        className="absolute w-[500px] 2xl:w-[750px] left-[-200px] bottom-[-150px] 2xl:left-[-225px] 2xl:bottom-[-300px] animate-fly"
        alt="floating-rock"
        width={50}
        height={50}
        src="/assets/floating/rock.svg"
      />
    </section>
  );
}
