"use client";

import { Onfido } from "onfido-sdk-ui";
import React, { useEffect, useState } from "react";

interface OnfindoSdkProps {
  token: string;
  workflowRundId: string;
}

export default function OnfindoSDK({ token, workflowRundId }: OnfindoSdkProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const mounting = () => {
      Onfido.init({
        token: token,
        containerId: "onfido-mount",
        workflowRunId: workflowRundId,
        crossDevicePolicy: "force",
        language: {
          locale: "en",
        },
        _crossDeviceLinkMethods: ["qr_code", "copy_link"],
        onComplete: function (data) {
          console.log(data);
          console.log("everything is complete");
        },
        onError: function (error) {
          console.log(error);
          console.log("an error occurred");
        },
        theme: {
          name: "dark",
          config: {
            borderStyleSurfaceModal: "0px",
            colorBackgroundSurfaceModal: "#0a0f25",
            colorBackgroundIcon: "#0a0f25",
            colorBorderLinkUnderline: "#0a0f25",
            colorBackgroundLinkActive: "#0a0f25",
            colorBackgroundLinkHover: "#0a0f25",
            colorBackgroundDocTypeButton: "#0a0f25",
          },
        },
        crossDeviceClientIntroProductLogoSrc:
          "https://client-staging.bichondefender.io/_next/image?url=%2Fassets%2Fbichon.png&w=64&q=75",
        enterpriseFeatures: {
          logoCobrand: {
            darkLogoSrc:
              "https://client-staging.bichondefender.io/_next/image?url=%2Fassets%2Fbichon.png&w=64&q=75",
            lightLogoSrc:
              "https://client-staging.bichondefender.io/_next/image?url=%2Fassets%2Fbichon.png&w=64&q=75",
          },
        },
      });
    };

    if (!isMounted) {
      mounting();
      setIsMounted(true);
    }
  }, [isMounted, token, workflowRundId]);

  return (
    <div className="flex w-full h-full">
      <div
        id="onfido-mount"
        className="flex items-center justify-center w-full h-full"
      />
    </div>
  );
}
