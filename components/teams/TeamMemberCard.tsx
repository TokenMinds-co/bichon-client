import Image from "next/image";
import React from "react";
import SeeMoreDetail from "./SeeMoreDetail";

export default function TeamMemberCard({
  index,
  selected,
  setSelected,
  member,
}: TeamMemberCardProps) {
  return (
    <div
      data-aos="fade-left"
      data-aos-delay={`${index * 100}`}
      className={`w-[325px] cursor-pointer ${index == 6 && "col-span-1 lg:col-span-2 xl:col-span-3"}`}
      onClick={() => {
        setSelected(member.name);
      }}
    >
      <div
        className={`skew-profile h-[350px] pl-[1px] pt-[1px] pr-p[1px] ${
          selected == member.name &&
          "bg-gradient-to-r from-white/70 from-[30%] to-white/10 to-[70%]"
        }`}
      >
        <Image
          src={member.imageUrl}
          width={500}
          height={500}
          className="w-full h-full object-cover object-center"
          alt={`${member.name}-avatar`}
        />
      </div>

      <div
        className={`py-4 flex flex-row justify-between px-5 text-white ${
          selected == member.name &&
          "bg-gradient-to-r from-blue-500 to-blue-700"
        }`}
      >
        <div>
          <h2 className="text-xl font-bold">{member.name}</h2>
          <i className="font-light font-sans">{member.position}</i>
        </div>

        <SeeMoreDetail member={member} />
      </div>
    </div>
  );
}
