import React from "react";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import Image from "next/image";
import { Cross } from "lucide-react";
import Link from "next/link";

export default function CollabSection() {
  return (
    <section
      id="team"
      className="relative w-full bg-cover bg-sky2 bg-right-top min-h-screen flex flex-col scroll-mt-28 items-center justify-center"
    >
      <BgOverlayTop />

      <div className="flex gap-16 flex-col md:px-20 px-10 z-20">
        <h1
          data-aos="fade-down"
          className="text-5xl xl:text-6xl text-center text-white"
        >
          STRATEGIC COLLABORATION
        </h1>

        <div
          data-aos="fade-up"
          className="flex flex-row gap-8 items-center justify-center"
        >
          <Image
            src="/assets/bichon.png"
            alt="bichon-defender"
            className="w-24 cursor-pointer"
            height={500}
            width={500}
          />

          <Cross className="text-accent rotate-45" />
          <Link href="https://tokenminds.co" target="_blank">
            <Image
              src="/assets/tokenminds.png"
              alt="tokenminds"
              className="w-40 cursor-pointer"
              height={500}
              width={500}
            />
          </Link>
        </div>

        <div
          data-aos="fade-up"
          className="flex self-center w-full xl:w-[70%] text-xl text-white"
        >
          BichonDefender has partnered with TokenMinds, a leading Web3
          consulting firm, to enhance our project&apos;s development and market
          presence. TokenMinds brings extensive expertise development, strategic
          consulting, and marketing, providing valuable insights and resources
          to our project. Their proficiency in Web3 development, smart contract
          creation, and AI integration ensures that BichonDefender&apos;s
          platform is both innovative and secure. By leveraging
          TokenMinds&apos;s comprehensive services, we are poised to deliver a
          robust, user-centric experience that addresses the pressing challenges
          in the cryptocurrency sector.
        </div>
      </div>

      <BgOverlayBottom />
    </section>
  );
}
