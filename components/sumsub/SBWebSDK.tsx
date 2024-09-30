"use client";

import SumsubWebSdk from "@sumsub/websdk-react";
import React from "react";

interface SBWebSDKProps {
  accessToken: string;
}

const SBWebSDK = ({ accessToken }: SBWebSDKProps) => {
  return (
    <SumsubWebSdk
      accessToken={accessToken}
      expirationHandler={() => accessToken}
      config={{
        lang: "en", //language of WebSDK texts and comments (ISO 639-1 format)
        email: "graita@purpleminds.co",
        phone: "+6281335488360",
        theme: "dark",
      }}
      options={{ addViewportTag: true, adaptIframeHeight: true }}
      style={{
        width: "100%",
      }}
      onError={(error: unknown) => console.error("Sumsub error", error)}
      onMessage={(message: unknown) => console.log("Sumsub message}", message)}
    />
  );
};

export default SBWebSDK;
