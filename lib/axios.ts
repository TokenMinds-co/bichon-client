"use server";

import axios from "axios";
import { HmacSHA256, enc } from "crypto-js";

interface GenerateSignatureprops {
  method: string;
  url: string;
  timestamp: number;
  body?: object;
}

export const generateSignature = ({
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
