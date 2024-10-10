"use client";

import React, { ButtonHTMLAttributes } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface SkewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function SkewButton({
  children,
  variant = "primary",
  className,
  ...props
}: SkewButtonProps) {
  const buttonClasses = {
    primary:
      "bg-gradient-to-r border-blue-800 from-blue-500 to-blue-700 opacity-95 hover:opacity-100",
    secondary: "border-white bg-white/10",
  };

  return (
    <Button
      {...props}
      className={cn(
        "custom-button border-[1px] text-sm font-spaceMono font-semibold rounded-none text-white px-5",
        buttonClasses[variant],
        className
      )}
    >
      {children}
    </Button>
  );
}
