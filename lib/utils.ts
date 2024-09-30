"use server";

import axios from "axios";

import crypto from "crypto";
import FormData from "form-data";
import { HmacSHA256, enc } from "crypto-js";

const SUMSUB_APP_TOKEN = process.env.NEXT_PUBLIC_SUMSUB_TOKEN!;
const SUMSUB_SECRET_KEY = process.env.SUMSUB_SECRET!;

interface GenerateSignatureprops {
  method: string;
  url: string;
  timestamp: number;
  body?: object;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSumsumSig = (url: string, method: string, data: any) => {
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

const generateSignature = ({
  method,
  url,
  timestamp,
  body,
}: GenerateSignatureprops) => {
  // Define variables
  const secretKey = process.env.SECRET_KEY as string;

  // Construct the string to sign
  const toBeSigned = `${timestamp}|${method}|${url}${
    body ? `|${JSON.stringify(body)}` : ""
  }`;

  // Generate the HMAC signature
  const signature = HmacSHA256(toBeSigned, secretKey).toString(enc.Hex);

  // Set headers
  return signature;
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async function (config) {
  const apiKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
  const timestamp = Math.floor(Date.now() / 1000);

  //   GENERATE SIGNATURE
  const method = config.method?.toUpperCase() as string;
  const url = `${config.baseURL}${config.url}` as string;
  const body = config.data;
  const signature = generateSignature({ method, url, timestamp, body });

  //   SET HEADERS
  config.headers["x-api-key"] = apiKey;
  config.headers["x-timestamp"] = timestamp;
  config.headers["x-signature"] = signature;
  return config;
});

export { axiosInstance };
