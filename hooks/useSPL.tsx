"use client";

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  ParsedAccountData,
} from "@solana/web3.js";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  getAssociatedTokenAddressSync,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export default function useSPL() {
  const WSS_ENDPOINT = "wss://api.devnet.solana.com";
  const HTTP_ENDPOINT = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(HTTP_ENDPOINT, {
    wsEndpoint: WSS_ENDPOINT,
  });

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

  return { token, getATAandBalance };
}
