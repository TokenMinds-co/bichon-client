import { PublicKey } from "@solana/web3.js";

export const SUPPORT_PRIORITIES = ["ALL", "LOW", "MEDIUM", "HIGH"];
export const SUPPORTED_SPL_TOKENS = [
  {
    name: "Solana SOL",
    symbol: "SOL",
    address: "0x0000000000000000000000000000000000000000",
    feed: "https://api.diadata.org/v1/assetQuotation/Solana/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  },
  {
    name: "Tether USDT",
    symbol: "USDT",
    address: "BUTKogAXd5eqnoFZV9aVNKYq4tu1kT8chxn5Uvy5152v",
    feed: "https://api.diadata.org/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7",
  },
  {
    name: "Circle USDC",
    symbol: "USDC",
    address: "GADLbpcbcFFWE2fLTY9PjsvdW4636nP9nnGoqKJFe478",
    feed: "https://api.diadata.org/v1/assetQuotation/Ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
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
