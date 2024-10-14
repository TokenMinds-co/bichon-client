import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenTx(txhash: string) {
  return txhash.slice(0, 28) + "...";
}

export const displayFormatter = (value: number, fraction: number) => {
  const fmt = new Intl.NumberFormat("default", {
    style: "decimal",
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  });

  return fmt.format(value);
};

export const stringToNumber = (value: string) => {
  const cleanedValue = value.replace(/,/g, "");
  const result = parseFloat(cleanedValue);

  if (isNaN(result)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return result;
};
