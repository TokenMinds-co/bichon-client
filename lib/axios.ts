"use server";

import axios from "axios";
import { generateSignature } from "./utils";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
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
