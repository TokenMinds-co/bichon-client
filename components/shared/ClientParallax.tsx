"use client";

import React from "react";
import { Parallax, ParallaxProps } from "react-scroll-parallax";

interface ClientParallaxProps extends ParallaxProps {
  children: React.ReactNode;
}

const ClientParallax = (props: ClientParallaxProps) => {
  return <Parallax {...props}>{props.children}</Parallax>;
};

export default ClientParallax;
