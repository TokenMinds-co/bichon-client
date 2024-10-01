"use server";

import crypto from "crypto";
import FormData from "form-data";

const SUMSUB_APP_TOKEN = process.env.NEXT_PUBLIC_SUMSUB_TOKEN!;
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET!;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const serverSumsubConfig = (url: string, method: string, data: any) => {
  const ts = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", SUMSUB_SECRET_KEY);
  signature.update(`${ts}${method.toUpperCase()}${url}`);

  if (data instanceof FormData) {
    signature.update(data.getBuffer());
  } else if (data) {
    signature.update(data);
  }

  const hex = signature.digest("hex");

  const headers = {
    "X-App-Access-Ts": ts.toString(),
    "X-App-Access-Sig": hex,
    "X-App-Token": SUMSUB_APP_TOKEN,
  };

  return headers;
};

export const generateAccessToken = async (email: string): Promise<string> => {
  try {
    const encodedEmail = encodeURIComponent(email);
    const url = "https://api.sumsub.com";
    const path = `/resources/accessTokens?userId=${encodedEmail}&levelName=basic-kyc-level&ttlInSecs=600`;
    const config = serverSumsubConfig(path, "POST", null);

    const response = await fetch(`${url}${path}`, {
      headers: config,
      method: "POST",
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    throw undefined;
  }
};
