"use client";

import React, { useState } from "react";
import Image from "next/image";
import SkewButton from "@/components/shared/SkewButton";
import { ArrowLeft } from "lucide-react";
import RoadmapCard from "@/components/shared/RoadmapCard";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import ClientParallax from "@/components/shared/ClientParallax";

export default function RoadmapSection() {
  const roadmapStep = [
    {
      step: 1,
      time: "Phase 1",
      title: "Foundation and Community Building",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 2,
      time: "Phase 2",
      title: "AI and Security Enhancements",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 3,
      time: "Phase 3",
      title: "Exchange Listing and Expansion",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 4,
      time: "Phase 4",
      title: "Community Testing and DAO Development",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
    {
      step: 5,
      time: "Phase 5",
      title: "Metaverse Expansion and DAO Rollout",
      desc: "Lorem ipsum dolor sit amet conceteur. codimentum arcu ut posuere in ut ec volutpat proin estiam.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = (currentIndex / (roadmapStep.length - 1)) * 100;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < roadmapStep.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <section
      id="roadmap"
      className="relative w-full bg-right-top min-h-screen flex flex-col scroll-mt-28"
    >
      <BgOverlayTop />

      <Image // OVERLAY GRID
        className="absolute right-0 top-0 z-[5]"
        src="/assets/bg/grid.png"
        alt="grid"
        width={1400}
        height={1400}
      />

      <div
        data-aos="fade-down"
        className="flex flex-col md:px-20 px-10 pt-20 z-20"
      >
        {/* TITLE & PAGINATE */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-12 sm:mb-20">
          <h1 className="text-5xl xl:text-6xl text-white">ROADMAP BICHON</h1>
          <div className="flex flex-row gap-4 mt-12 sm:mt-0">
            <SkewButton
              onClick={goToPrevious}
              className="px-8 py-6"
              variant="secondary"
            >
              <ArrowLeft className="rotate-[-45deg]" />
            </SkewButton>
            <SkewButton onClick={goToNext} className="px-8 py-6">
              <ArrowLeft className="rotate-[135deg]" />
            </SkewButton>
          </div>
        </div>

        {/* ROADMAP CONTENT */}
        <div data-aos="fade-up">
          {roadmapStep.map(
            (step, index) =>
              currentIndex === index && (
                <RoadmapCard
                  key={index}
                  time={step.time}
                  desc={step.desc}
                  title={step.title}
                />
              )
          )}

          <div className="relative">
            {roadmapStep.map((_, index) => (
              <div
                key={index}
                className={`absolute left-0 top-[-6px] z-10 w-4 h-4 rounded-full border-2 border-white ${
                  index <= currentIndex ? "bg-blue-500" : "bg-gray-700"
                }`}
                style={{
                  left: `calc(${(index / (roadmapStep.length - 1)) * 100}%)`,
                }}
              />
            ))}

            <div className="mt-16 sm:mt-28 relative h-[6px] bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 via-blue-600 to-blue-600 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <ClientParallax
        translateY={[-60, 30]}
        className="absolute w-[500px] 2xl:w-[750px] left-[-200px] bottom-[-150px] 2xl:left-[-225px] 2xl:bottom-[-300px]"
      >
        <Image // FLOATING ROCK
          className="w-[500px] 2xl:w-[750px] animate-fly"
          alt="floating-rock"
          width={50}
          height={50}
          src="/assets/floating/rock.svg"
        />
      </ClientParallax>
    </section>
  );
}
