import { PublicKey } from "@solana/web3.js";

const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV as
  | "development"
  | "production";

export const SUPPORT_PRIORITIES = ["ALL", "LOW", "MEDIUM", "HIGH"];
export const SUPPORTED_SPL_TOKENS: Token[] = [
  {
    name: "Solana SOL",
    symbol: "SOL",
    address: "0x0000000000000000000000000000000000000000",
    host: "https://api.diadata.org",
    feed: "/v1/assetQuotation/Solana/0x0000000000000000000000000000000000000000",
    balance: 0,
    decimals: 9,
    method: "CRYPTO_SOLANA",
  },
  {
    name: "Tether USDT",
    symbol: "USDT",
    address:
      NODE_ENV === "production"
        ? "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
        : "BUTKogAXd5eqnoFZV9aVNKYq4tu1kT8chxn5Uvy5152v",
    host: "https://api.diadata.org",
    feed: "/v1/assetQuotation/Ethereum/0xdAC17F958D2ee523a2206206994597C13D831ec7",
    balance: 0,
    decimals: 6,
    method: "CRYPTO_USDT",
  },
  {
    name: "Circle USDC",
    symbol: "USDC",
    address:
      NODE_ENV === "production"
        ? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        : "GADLbpcbcFFWE2fLTY9PjsvdW4636nP9nnGoqKJFe478",
    host: "https://api.diadata.org",
    feed: "/v1/assetQuotation/Ethereum/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    balance: 0,
    decimals: 6,
    method: "CRYPTO_USDC",
  },
];

export const BICHON_TOKEN = {
  name: "Bichon Defender",
  symbol: "BICHON",
  decimals: 6,
  treasury: new PublicKey("DAnZrjXjRd5GoQgPSzNxV7igAkELyGznppY8Lyki4ugr"),
};
