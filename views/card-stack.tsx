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
    <div className="w-full flex flex-col absolute lg:relative container mx-auto items-start justify-start my-10 z-20">
      <ul
        className="list-none p-0 grid grid-cols-1 gap-[4vw] pb-[calc(4*1.5em)] mb-[4vw]"
        style={{ gridTemplateRows: "repeat(4, 25vh)" }}
      >
        <li className="sticky top-0 pt-[11.5em]">
          <div
            ref={(el) => {
              observerRefs.current[0] = el;
            }}
            className="bg-[#5898ab] p-[30px] rounded-[50px] shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[13em]">
          <div
            ref={(el) => {
              observerRefs.current[1] = el;
            }}
            className="bg-[#e5a36f] p-[30px] rounded-[50px] shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-2xl">
              The quick brown fox jumps over the lazy dog.
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[14.5em]">
          <div
            ref={(el) => {
              observerRefs.current[2] = el;
            }}
            className="bg-[#9cadce] p-[30px] rounded-[50px] shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-2xl">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </h2>
          </div>
        </li>
        <li className="sticky top-0 pt-[16em]">
          <div
            ref={(el) => {
              observerRefs.current[3] = el;
            }}
            className="bg-[#d4afb9] p-[30px] rounded-[50px] shadow-lg h-40 flex items-center justify-start transition-all duration-500"
          >
            <h2 className="text-2xl">
              The quick brown fox jumps over the lazy dog.
            </h2>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default CardStack;
