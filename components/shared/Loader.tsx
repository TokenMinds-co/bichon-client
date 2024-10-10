"use client";

import React, { useEffect } from "react";

interface LoaderProps {
  size?: string;
  speed?: string;
  color?: string;
}

const Loader = ({
  size = "40",
  speed = "1.75",
  color = "white",
}: LoaderProps) => {
  useEffect(() => {
    const getLoader = async () => {
      const { tailChase } = await import("ldrs");
      tailChase.register();
    };
    getLoader();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <l-tail-chase size={size} speed={speed} color={color} />
    </div>
  );
};

export default Loader;
