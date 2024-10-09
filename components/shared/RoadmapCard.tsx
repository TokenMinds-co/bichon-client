import React from "react";

interface RoadmapCardProps {
  title: string;
  desc: string;
  time: string;
}

export default function RoadmapCard({ title, desc, time }: RoadmapCardProps) {
  return (
    <div className="bg-gradient-to-r w-[450px] from-white/75 from-[10%] via-blue-500 via-[20%] to-white/10 to-[70%] p-[1px]">
      <div className="flex flex-col h-full text-white">
        <div className="p-4 bg-[#000A19] ">
          <p className="text-3xl">{time}</p>
          <p className="text-gray-400 mt-2">{title}</p>
        </div>

        <div className="bg-gray-800 px-4 py-5 rounded text-lg">{desc}</div>
      </div>
    </div>
  );
}
