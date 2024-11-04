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
      title: "Lorem ipsum dolor sit amet consectetur. Sagittis id.",
      desc: "Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac. Ornare amet ligula ornare lacus aliquam aenean. Eu lacus imperdiet urna amet congue ",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sagittis id.",
      desc: "Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac. Ornare amet ligula ornare lacus aliquam aenean. Eu lacus imperdiet urna amet congue ",
    },
    {
      title: "Lorem ipsum dolor sit amet consectetur. Sagittis id.",
      desc: "Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac. Ornare amet ligula ornare lacus aliquam aenean. Eu lacus imperdiet urna amet congue ",
    },
  ];

  return (
    <section className="relative bg-faq bg-cover w-full min-h-screen text-white flex justify-center items-center">
      <BgOverlayTop />

      <div className="z-30 flex flex-col gap-16 sm:gap-24 w-full sm:w-[75%] mx-auto items-center">
        <h1
          data-aos="fade-down"
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-center"
        >
          FAQ
        </h1>

        <div className="flex w-full flex-row gap-5 sm:gap-10 flex-wrap items-center justify-center">
          <Accordion
            defaultValue="item-1"
            type="single"
            collapsible
            className="w-[90%] sm:w-full xl:w-[90%] flex flex-col gap-5"
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
