import React from "react";

export default function PartnerCard({ icon, name }: PartnerCardProps) {
  return (
    <div className="flex flex-row gap-3 p-5 bg-black/80 text-white items-center justify-center font-bold text-base sm:text-lg hover:bg-black cursor-pointer ease-linear duration-200">
      {icon} {name}
    </div>
  );
}
