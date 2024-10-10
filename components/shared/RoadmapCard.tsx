import React from "react";

export default function RoadmapCard({ title, desc, time }: RoadmapCardProps) {
  return (
    <div className="animate-fadeLeft bg-gradient-to-r w-full sm:w-[450px] from-white/75 from-[10%] via-blue-500 via-[20%] to-white/10 to-[70%] p-[1px]">
      <div className="flex flex-col h-full text-white">
        <div className="p-4 bg-[#000A19] ">
          <p className="text-2xl sm:text-3xl">{time}</p>
          <p className="text-gray-400 mt-1 sm:mt-2 text-base">{title}</p>
        </div>

        <div className="bg-gray-800 px-4 py-5 rounded text-base sm:text-lg">
          {desc}
        </div>
      </div>
    </div>
  );
}
