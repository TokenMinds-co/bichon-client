"use client";

import React, { useEffect, useRef } from "react";

const CardStack = () => {
  const observerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = observerRefs.current.map((ref) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (ref) {
            if (entry.isIntersecting) {
              ref.classList.remove("scale-75", "opacity-50");
            } else {
              ref.classList.add("scale-75", "opacity-50");
            }
          }
        },
        { threshold: 0.5 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);
  return (
    <div className="w-full px-10 flex flex-col absolute lg:relative container mx-auto items-start justify-start my-10 z-20">
      <ul
        className="list-none p-0 grid grid-cols-1 gap-[2vw] pb-[calc(6*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(6, 30vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div
            ref={(el) => {
              observerRefs.current[0] = el;
            }}
            className="bg-gray-400 p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">Bichon Defender AI wallet</h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[12.5em]">
          <div
            ref={(el) => {
              observerRefs.current[1] = el;
            }}
            className="bg-gray-500  p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">
              Bichon Defenders Next-Level Security Innovation
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13.5em]">
          <div
            ref={(el) => {
              observerRefs.current[2] = el;
            }}
            className="bg-gray-600  p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">
              Bichon Defender AI Trading Bot
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div
            ref={(el) => {
              observerRefs.current[3] = el;
            }}
            className="bg-gray-700  p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">
              Governance Structure of the Defenders DAO
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[15.5em]">
          <div
            ref={(el) => {
              observerRefs.current[4] = el;
            }}
            className="bg-gray-800  p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">
              Bichon Defender Exclusive NFTs
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16.5em]">
          <div
            ref={(el) => {
              observerRefs.current[5] = el;
            }}
            className="bg-gray-900  p-[30px] skew-widgets shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-lg xl:text-2xl">
              Metaverse Land Acquisition and City Creation
            </h2>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardStack;
