import React from "react";
import SBWebSDK from "@/components/sumsub/SBWebSDK";
import { createSumsumSig } from "@/lib/sumsub";
import { axiosInstance } from "@/lib/axios";
import { redirect } from "next/navigation";

const VerifyPage = async ({ searchParams }: URLProps) => {
  const email = searchParams.email;
  const address = searchParams.address;

  if (!email || !address) {
    redirect("/dashboard");
  }

  // Query users
  const ENDPOINT = `/users?limit=10&page=1&email=${encodeURIComponent(
    email!
  )}&address=${address}`;

  const { data: result } = await axiosInstance.get(ENDPOINT);
  const users = result.data.users;
  const isExist = users.length > 0;

  // If not exist, create a candidate KYC user
  if (!isExist) {
    await axiosInstance.post("/users", {
      email,
      address,
    });
  }

  const url = "https://api.sumsub.com";
  const path = `/resources/accessTokens?userId=${encodeURIComponent(
    email!
  )}&levelName=basic-kyc-level&ttlInSecs=600`;
  const config = createSumsumSig(path, "POST", null);
  const response = await fetch(`${url}${path}`, {
    headers: config,
    method: "POST",
  });
  const data = await response.json();
  
  return (
    <main className="container mx-auto pt-32 h-full flex flex-col items-center justify-center bg-[#000A19] p-5">
      <SBWebSDK accessToken={data.token} email={email!} />
    </main>
  );
};

export default VerifyPage;
