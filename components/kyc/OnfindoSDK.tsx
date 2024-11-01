"use client";

import { Onfido } from "onfido-sdk-ui";
import React, { useEffect } from "react";

interface OnfindoSdkProps {
  token: string;
  workflowRundId: string;
}

export default function OnfindoSDK({ token, workflowRundId }: OnfindoSdkProps) {
  useEffect(() => {
    Onfido.init({
      token: token,
      containerId: "onfido-mount",
      workflowRunId: workflowRundId,
      onComplete: function (data) {
        console.log(data);
        console.log("everything is complete");
      },
      onError: function (error) {
        console.log(error);
        console.log("an error occurred");
      },
      
    });
  }, []);

  return <div id="onfido-mount" />;
}
