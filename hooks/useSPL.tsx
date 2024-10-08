"use client";

import { BICHON_TREASURY_ADDRESS } from "@/constant/common";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";

export default function useSPL() {
  const WSS_ENDPOINT = "wss://api.devnet.solana.com";
  const HTTP_ENDPOINT = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(HTTP_ENDPOINT, {
    wsEndpoint: WSS_ENDPOINT,
  });
  const { signTransaction } = useWallet();

  const token = "BUTKogAXd5eqnoFZV9aVNKYq4tu1kT8chxn5Uvy5152v";
  const getATAandBalance = async (userAddress: string, mintAddress: string) => {
    const user = new PublicKey(userAddress);
    const mint = new PublicKey(mintAddress);
    try {
      const ata = getAssociatedTokenAddressSync(mint, user);
      const balance = await solanaConnection.getTokenAccountBalance(ata);
      const displayBalance = balance.value.uiAmount;

      return { ata, displayBalance };
    } catch (error) {
      console.error(error);
      return { ata: null, displayBalance: 0 };
    }
  };

  const buyViaSPL = async (
    userAddress: string,
    mintAddress: string,
    transferAmount: number
  ) => {
    if (!signTransaction) {
      console.error("Wallet not connected");
      return;
    }
    const user = new PublicKey(userAddress);
    const mint = new PublicKey(mintAddress);
    const sourceATA = getAssociatedTokenAddressSync(mint, user);
    const destinationATA = getAssociatedTokenAddressSync(
      mint,
      BICHON_TREASURY_ADDRESS
    );

    console.log("sourceATA", sourceATA.toBase58());
    console.log("destinationATA", destinationATA.toBase58());
    console.log("mint", mint.toBase58());

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sourceATA,
        toPubkey: destinationATA,
        lamports: transferAmount,
      })
    );

    try {
      const { blockhash, lastValidBlockHeight } =
        await solanaConnection.getLatestBlockhash({
          commitment: "finalized",
        });

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = user;

      const transactionResponse = await signTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return { token, getATAandBalance, buyViaSPL };
}
