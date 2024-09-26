import AppConnectButton from "@/components/shared/AppConnectButton";
import React from "react";
import { createSumsumSig } from "@/lib/utils";
import SBWebSDK from "@/components/sumsub/SBWebSDK";

const DashboardPage = async () => {
  const url = "https://api.sumsub.com";
  const path =
    "/resources/accessTokens?userId=graita%40purpleminds.co&levelName=basic-kyc-level&ttlInSecs=600";
  const config = createSumsumSig(path, "POST", null);

  const response = await fetch(`${url}${path}`, {
    headers: config,
    method: "POST",
  });
  const data = await response.json();
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800">
      <AppConnectButton />
      <SBWebSDK accessToken={data.token} />
    </main>
  );
};

export default DashboardPage;
