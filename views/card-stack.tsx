"use client";
import { cn } from "@/lib/utils";
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
  const list = [
    {
      title: "Bichon Defender AI wallet",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Ultimate security-focused Solana wallet</li>
          <li>Storage Vault for Long-Term Asset Protection</li>
          <li>Integrated Token Swap Feature</li>
          <li>Airdrop Scam Detection and Monitoring Tools</li>
          <li>Comprehensive 2FA and Anti-Man-in-the-Middle Protection</li>
          <li>
            Dedicated Wallet compartments like Airdrop and Burner compartments
          </li>
        </ul>
      ),
      tailwindBg: "bg-gray-400",
      pt: "pt-[11.5em]",
    },
    {
      title: " Bichon Defenders Next-Level Security Innovation",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Ngrave Zero for Key Management (Air-Gapped Cold Storage)</li>
          <li>Squads: Multisig on Solana</li>
          <li>Ngrave Graphene Backup</li>
        </ul>
      ),
      tailwindBg: "bg-gray-500",
      pt: "pt-[12.5em]",
    },
    {
      title: "Bichon Defender AI Trading Bot",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Real-Time Analytics for Market Trends</li>
          <li>Continuous Market Adaptation</li>
          <li>Real-Time Analytics and Reporting</li>
          <li>24/7 Operation and Risk Management</li>
        </ul>
      ),
      tailwindBg: "bg-gray-600",
      pt: "pt-[13.5em]",
    },
    {
      title: "Governance Structure of the Defenders DAO",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Establish the Defenders DAO Governance Structure</li>
          <li>Proposal and Voting Mechanism</li>
          <li>DAO Membership and Compensation</li>
          <li>Treasury Management and Fund Allocation</li>
          <li>Implementation of Proposals</li>
          <li>Community Engagement and Growth</li>
          <li>First Order of Business for the Defenders DAO</li>
        </ul>
      ),
      tailwindBg: "bg-gray-700",
      pt: "pt-[14.5em]",
    },
    {
      title: "Bichon Defender Exclusive NFTs",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Direct Access Pass - Basic Level (Total 5,000 NFTs)</li>
          <li>Elite Competitor NFT (Total 2,500 NFTs)</li>
          <li>Grandmaster NFT (Total 10 NFTs)</li>
          <li>Regular Gaming NFTs (Total 1,500 NFTs)</li>
        </ul>
      ),
      tailwindBg: "bg-gray-800",
      pt: "pt-[15.5em]",
    },
    {
      title: "Metaverse Land Acquisition and City Creation",
      content: (
        <ul className="list-disc ml-4 text-sm sm:text-base">
          <li>Initial Land Allocation & Zoning</li>
          <li>Zoning Regulations</li>
          <li>Committee Formation and Governance</li>
          <li>Autonomy for City Design</li>
          <li>Land Expansion Planning and Scalability</li>
          <li>Governance and Dispute Resolution</li>
        </ul>
      ),
      tailwindBg: "bg-gray-900",
      pt: "pt-[16.5em]",
    },
  ];

  let padding:
    | "pt-[11.5em]"
    | "pt-[12.5em]"
    | "pt-[13.5em]"
    | "pt-[14.5em]"
    | "pt-[15.5em]"
    | "pt-[16.5em]";

  return (
    <div className="flex h-[2600px] lg:h-[2800px] overflow-hidden container mx-auto">
      <div className="h-full w-full">
        <div className="w-full container flex flex-col absolute px-10 items-start justify-start my-10 z-20">
          <ul
            className="list-none p-0 grid gap-32 grid-cols-1 pb-[calc(6*1.5em)] mb-[4vw] w-full"
            style={{ gridTemplateRows: "repeat(6, 30vh)" }}
          >
            {list.map((item, index) => {
              padding = item.pt as
                | "pt-[11.5em]"
                | "pt-[12.5em]"
                | "pt-[13.5em]"
                | "pt-[14.5em]"
                | "pt-[15.5em]"
                | "pt-[16.5em]";

              return (
                <li key={index} className={cn("sticky top-0 h-full", padding)}>
                  <div
                    ref={(el) => {
                      observerRefs.current[index] = el;
                    }}
                    className={`${item.tailwindBg} flex-col gap-5 p-10 skew-widgets shadow-lg h-[400px] sm:h-[325px] flex transition-all duration-500`}
                  >
                    <h2 className="text-base sm:text-lg xl:text-2xl text-left">
                      {item.title}
                    </h2>
                    {item.content}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardStack;
