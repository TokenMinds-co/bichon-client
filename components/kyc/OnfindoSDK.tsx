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
      });
    };

    if (!isMounted) {
      mounting();
      setIsMounted(true);
    }
  }, [isMounted, token, workflowRundId]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div id="onfido-mount" className="flex w-[500px] h-full"></div>
    </div>
  );
}

// <iframe src="https://eu.onfido.app/" id="onfido-mount" allow="" />
