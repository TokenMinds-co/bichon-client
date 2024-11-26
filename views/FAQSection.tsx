import BgOverlayBottom from "@/components/shared/BgOverlayBottom";
import BgOverlayTop from "@/components/shared/BgOverlayTop";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

export default function FAQSection() {
  const faqs = [
    {
      title: "Staking APY & Compound Interest",
      desc: "Bichon Defenders staking program offers a 289% APY, compounded semi-annually. This high yield encourages long-term holding, with rewards growing exponentially over the staking period",
    },
    {
      title: "Estimated Example Scenario with 1000 Tokens",
      desc: "If a community member purchases 1000 BDF tokens and stakes them, with an APY of 289% compounded semi-annually, they will earn approximately 5978.03 BDF tokens after 12 months",
    },
   
  ];

  return (
    <section
      id="faq"
      className="relative bg-faq bg-top bg-cover w-full min-h-screen text-white flex justify-center items-center"
    >
      <BgOverlayTop />

      <div className="z-30 flex flex-col gap-16 sm:gap-24 w-[90%] sm:w-[75%] mx-auto items-center">
        <h1
          data-aos="fade-down"
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-center"
        >
           Staking
        </h1>

        <div className="flex  md:w-full flex-row gap-5 sm:gap-10 flex-wrap items-center justify-center">
          <Accordion
            defaultValue="item-1"
            type="single"
            collapsible
            className="w-full flex flex-col gap-5"
            data-aos="fade-up"
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger>{faq.title}</AccordionTrigger>
                <AccordionContent>{faq.desc}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <BgOverlayBottom />
    </section>
  );
}
