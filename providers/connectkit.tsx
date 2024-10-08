"use client";
import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import {
  solana,
  solanaDevnet,
  solanaTestnet,
} from "@particle-network/connectkit/chains";
import {
  injected as solaInjected,
  solanaWalletConnectors,
} from "@particle-network/connectkit/solana";
import { wallet, EntryPosition } from "@particle-network/connectkit/wallet";
import React from "react";

// const customSolana: Chain = {
//   id: 101,
//   name: "Solana",
//   rpcUrls: {
//     default: {
//       http: ["https://solana-mainnet.gateway.tatum.io/"],
//     },
//   },
//   nativeCurrency: {
//     name: "Solana SOL",
//     symbol: "SOL",
//     decimals: 9,
//   },
// };

//Retrived from https://dashboard.particle.network
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error("Please configure the Particle project in .env first!");
}

const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    recommendedWallets: [{ walletId: "phantom", label: "Recommended" }],
    language: "en-US", // Optional, also supported ja-JP, zh-CN, zh-TW, and ko-KR
    mode: "dark",
    filterCountryCallingCode: (countries) => {
      // Optional, whitelist or blacklist phone numbers from specific countries
      return countries.filter((item) => item === "US");
    },
  },
  walletConnectors: [
    solanaWalletConnectors({
      connectorFns: [
        solaInjected({ target: "phantom" }),
        solaInjected({ target: "trustWallet" }),
        solaInjected({ target: "bitKeep" }),
        solaInjected({ target: "coinbaseWallet" }),
        solaInjected({ target: "okxWallet" }),
      ],
    }),
  ],
  plugins: [
    wallet({
      entryPosition: EntryPosition.BR, // Alters the position in which the modal button appears upon login
      visible: false, // Dictates whether or not the wallet modal is included/visible or not
    }),
  ],
  chains: [solana, solanaTestnet, solanaDevnet],
});

// Export ConnectKitProvider to be used within your index or layout file (or use createConfig directly within those files).
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
