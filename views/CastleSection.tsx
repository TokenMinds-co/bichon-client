import React from "react";
import CardStack from "./card-stack";

export default function CastleSection() {
  return (
    <section className="bg-sky overflow-x-hidden bg-center bg-cover w-full h-full text-white flex flex-col">
      {/* <BgOverlayTop /> */}

      <CardStack />
      
      {/* <ClientParallax
        translateY={[70, -5]}
        className="h-full hidden xl:flex absolute justify-self-center self-center w-[1000px] mt-[300px] z-0 pl-20 aspect-square right-0"
      >
        <Image // FLOATING CASTLE
          className="w-full h-full animate-float"
          alt="floating-castle"
          width={50}
          height={50}
          src="/assets/floating/castle.svg"
        />
      </ClientParallax> */}

      {/* <div className="flex flex-col justify-start h-full xl:pl-44 md:px-20 px-10 py-16">
        <ClientParallax
          translateY={[100, -30]}
          opacity={[0, 1]}
          className="w-full h-full mb-[100px] xl:mb-0"
        >
          <Image // FLOATING CASTLE SMALL SCREEN
            className="xl:hidden justify-self-center self-center w-[2000px] aspect-square animate-float"
            alt="floating-castle"
            width={50}
            height={50}
            src="/assets/floating/castle.svg"
          />
        </ClientParallax>
      </div> */}

      {/* <BgOverlayBottom /> */}
    </section>
  );
}
