"use client";

import React, { useState } from "react";
import Image from "next/image";
import SkewButton from "@/components/shared/SkewButton";
import { ArrowLeft } from "lucide-react";
import RoadmapCard from "@/components/shared/RoadmapCard";

export default function RoadmapSection() {
  const roadmapStep = [
    {
      step: 1,
      time: "Q1 2024",
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
          <h1 className="text-6xl text-white">ROADMAP BICHON {currentIndex}</h1>
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
        <div className="">
          <RoadmapCard
            time={roadmapStep[currentIndex].time}
            desc={roadmapStep[currentIndex].desc}
            title={roadmapStep[currentIndex].title}
          />

          <div className="relative">
            {/* {roadmapStep.map((_, index) => (
              <div
                key={index}
                className={`absolute top-1/2 transform -translate-y-[-6px] z-10 w-4 h-4 rounded-full border-2 border-white ${
                  index <= currentIndex ? "bg-blue-500" : "bg-gray-700"
                }`}
                style={{
                  left: `calc(${(index / (roadmapStep.length - 1)) * 82.5}%)`,
                }}
              />
            ))} */}

            <div className="mt-10 relative h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
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
