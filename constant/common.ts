import { PublicKey } from "@solana/web3.js";

export const SUPPORT_PRIORITIES = ["ALL", "LOW", "MEDIUM", "HIGH"];
export const SUPPORTED_SPL_TOKENS = [
  {
    name: "Solana SOL",
    symbol: "SOL",
    address: "solana",
  },
  {
    name: "Tether USDT",
    symbol: "USDT",
    address: "BUTKogAXd5eqnoFZV9aVNKYq4tu1kT8chxn5Uvy5152v",
  },
  {
    name: "Circle USDC",
    symbol: "USDC",
    address: "GADLbpcbcFFWE2fLTY9PjsvdW4636nP9nnGoqKJFe478",
  },
];
export const BICHON_TOKEN_SYMBOL = "BICHON";
export const BICHON_TREASURY_ADDRESS = new PublicKey(
  "DAnZrjXjRd5GoQgPSzNxV7igAkELyGznppY8Lyki4ugr"
);
export const CHAINLINK_FEED_ADDRESS =
  "99B2bTijsU6f1GCT73HmdR7HCFFjGMBcPZY6jZ96ynrR";
export const CHAINLINK_PROGRAM_ID = new PublicKey(
  "cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ"
);
