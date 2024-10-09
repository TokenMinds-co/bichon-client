"use client";

import { BICHON_TOKEN } from "@/constant/common";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { SolanaChain, useWallets } from "@particle-network/connectkit";
import { useMemo } from "react";
import { solanaDevnet } from "@particle-network/connectkit/chains";

export const useSPL = () => {
  const solanaConnection = new Connection(
    solanaDevnet.rpcUrls.default.http[0],
    {
      wsEndpoint: solanaDevnet.rpcUrls.default.http[0].replace("http", "ws"),
    }
  );

  const [primary] = useWallets();
  const solanaWallet = useMemo(() => {
    try {
      if (!primary) return null;
      return primary.getWalletClient<SolanaChain>();
    } catch (error) {
      console.error("Failed to get wallet client:", error);
      return null;
    }
  }, [primary]);

  const getSOLBalance = async () => {
    if (!solanaWallet) {
      console.error("Wallet not connected");
      return 0;
    }

    try {
      const balance = await solanaConnection.getBalance(solanaWallet.publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error(error);
      return 0;
    }
  };

  const getATAandBalance = async (userAddress: string, mintAddress: string) => {
    const user = new PublicKey(userAddress);
    const mint = new PublicKey(mintAddress);
    try {
      const ata = getAssociatedTokenAddressSync(mint, user);
      const balance = await solanaConnection.getTokenAccountBalance(ata);
      const { decimals, uiAmount } = balance.value;

      return { decimals, uiAmount };
    } catch (error) {
      console.error(error);
      return { decimals: 0, uiAmount: 0 };
    }
  };

  const buyViaSPL = async (mintAddress: string, amount: number) => {
    if (!solanaWallet) {
      console.error("Wallet not connected");
      return;
    }
    const mint = new PublicKey(mintAddress);
    const sourceATA = getAssociatedTokenAddressSync(
      mint,
      solanaWallet.publicKey
    );
    const destinationATA = getAssociatedTokenAddressSync(
      mint,
      BICHON_TOKEN.treasury
    );

    const instruction = createTransferCheckedInstruction(
      sourceATA,
      mint,
      destinationATA,
      solanaWallet.publicKey,
      amount,
      6
    );
    const tx = new Transaction();
    tx.add(instruction);

    try {
      const { blockhash, lastValidBlockHeight } =
        await solanaConnection.getLatestBlockhash({
          commitment: "finalized",
        });

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = solanaWallet.publicKey;

      const transactionResponse = await solanaWallet.signTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );
      await solanaConnection.confirmTransaction(hash, "finalized");
      console.log("Transaction hash:", hash);
      return hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      return null;
    }
  };

  const buyViaSOL = async (lamports: number) => {
    if (!solanaWallet) {
      console.error("Wallet not connected");
      return;
    }

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: solanaWallet.publicKey,
        toPubkey: BICHON_TOKEN.treasury,
        lamports,
      })
    );

    try {
      const { blockhash, lastValidBlockHeight } =
        await solanaConnection.getLatestBlockhash({
          commitment: "finalized",
        });

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = solanaWallet.publicKey;

      const transactionResponse = await solanaWallet.signTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );
      await solanaConnection.confirmTransaction(hash, "finalized");
      console.log("Transaction hash:", hash);
      return hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      return null;
    }
  };

  return {
    getSOLBalance,
    getATAandBalance,
    buyViaSPL,
    buyViaSOL,
    solanaWallet,
  };
};
