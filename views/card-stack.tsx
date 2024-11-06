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

  const list = [
    {
      title: "Bichon Defender AI wallet",
      content: (
        <ul className="list-disc ml-4">
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
    },
    {
      title: " Bichon Defenders Next-Level Security Innovation",
      content: (
        <ul className="list-disc ml-4">
          <li>Ngrave Zero for Key Management (Air-Gapped Cold Storage)</li>
          <li>Squads: Multisig on Solana</li>
          <li>Ngrave Graphene Backup</li>
        </ul>
      ),
      tailwindBg: "bg-gray-500",
    },
    {
      title: "Bichon Defender AI Trading Bot",
      content: (
        <ul className="list-disc ml-4">
          <li>Real-Time Analytics for Market Trends</li>
          <li>Continuous Market Adaptation</li>
          <li>Real-Time Analytics and Reporting</li>
          <li>24/7 Operation and Risk Management</li>
        </ul>
      ),
      tailwindBg: "bg-gray-600",
    },
    {
      title: "Governance Structure of the Defenders DAO",
      content: (
        <ul className="list-disc ml-4">
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
    },
    {
      title: "Bichon Defender Exclusive NFTs",
      content: (
        <ul className="list-disc ml-4">
          <li>Direct Access Pass - Basic Level (Total 5,000 NFTs)</li>
          <li>Elite Competitor NFT (Total 2,500 NFTs)</li>
          <li>Grandmaster NFT (Total 10 NFTs)</li>
          <li>Regular Gaming NFTs (Total 1,500 NFTs)</li>
        </ul>
      ),
      tailwindBg: "bg-gray-800",
    },
    {
      title: "Metaverse Land Acquisition and City Creation",
      content: (
        <ul className="list-disc ml-4">
          <li>Initial Land Allocation & Zoning</li>
          <li>Zoning Regulations</li>
          <li>Committee Formation and Governance</li>
          <li>Autonomy for City Design</li>
          <li>Land Expansion Planning and Scalability</li>
          <li>Governance and Dispute Resolution</li>
        </ul>
      ),
      tailwindBg: "bg-gray-900",
    },
  ];

  return (
    <div className="flex h-[2600px] overflow-hidden container mx-auto">
      <div className="h-full w-full">
        <div className="w-full container flex flex-col absolute px-10 items-start justify-start my-10 z-20">
          <ul
            className="list-none p-0 grid gap-32 grid-cols-1 pb-[calc(6*1.5em)] mb-[4vw] w-full"
            style={{ gridTemplateRows: "repeat(6, 30vh)" }}
          >
            {list.map((item, index) => (
              <li
                key={index}
                className={`sticky top-0 pt-[${11.5 + index * 1}em] h-full`}
              >
                <div
                  ref={(el) => {
                    observerRefs.current[index] = el;
                  }}
                  className={`${item.tailwindBg} flex-col gap-5 p-10 skew-widgets shadow-lg h-[400px] sm:h-[325px] flex transition-all duration-500`}
                >
                  <h2 className="text-lg xl:text-2xl text-left">
                    {item.title}
                  </h2>
                  {item.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardStack;
