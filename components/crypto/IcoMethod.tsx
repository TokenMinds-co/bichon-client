import React from "react";
import Image from "next/image";
import { TransactionMethod } from "@/types/Response";
import { CreditCard } from "lucide-react";

interface IcoMethod {
  method: TransactionMethod;
  src: string;
  label: string;
  handleClick: (string: TransactionMethod) => void;
  active: string;
  isFiat?: boolean;
}

const IcoMethod = ({
  active,
  handleClick,
  src,
  label,
  method,
  isFiat,
}: IcoMethod) => {
  const isActive = active === method;
  return (
    <button
      className={`flex-1 ${
        isActive ? "bg-gray-700" : "bg-[#1e2128]"
      } py-2 rounded-md flex items-center justify-center gap-2`}
      id={method}
      onClick={() => handleClick(method as TransactionMethod)}
    >
      {isFiat ? (
        <CreditCard className="w-5 h-5" />
      ) : (
        <Image src={src} width={20} height={20} alt={label} />
      )}
      <p className="tracking-wider">{label}</p>
    </button>
  );
};

export default IcoMethod;
