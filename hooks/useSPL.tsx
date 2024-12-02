"use client";

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
  ComputeBudgetProgram,
} from "@solana/web3.js";
import { SolanaChain, useWallets } from "@particle-network/connectkit";
import { useMemo } from "react";
import { solanaDevnet } from "@particle-network/connectkit/chains";

const NODE_ENV = process.env.NEXT_PUBLIC_NODE_ENV as
  | "development"
  | "production";
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL!;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const useSPL = () => {
  const solanaConnection = new Connection(
    NODE_ENV === "production"
      ? SOLANA_RPC_URL
      : solanaDevnet.rpcUrls.default.http[0],
    {
      wsEndpoint:
        NODE_ENV === "production"
          ? SOLANA_RPC_URL.replace("http", "ws")
          : solanaDevnet.rpcUrls.default.http[0].replace("http", "ws"),
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

    let flag = true;
    let count = 0;

    while (flag) {
      try {
        const balance = await solanaConnection.getBalance(
          solanaWallet.publicKey
        );
        flag = false;
        return balance / LAMPORTS_PER_SOL;
      } catch (e) {
        console.log("fail,", ++count);
      }
      await delay(200);
    }
  };

  const getATAandBalance = async (mintAddress: string) => {
    if (!solanaWallet) {
      console.error("Wallet not connected");
      return;
    }
    const user = solanaWallet.publicKey;
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

  const buyViaSPL = async (
    treasury: string,
    mintAddress: string,
    amount: number
  ) => {
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
      new PublicKey(treasury)
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
    tx.add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000000,
      })
    );

    try {
      let flag = true;
      let count = 0;
      let blockhash, lastValidBlockHeight;

      while (flag) {
        try {
          const latestBlockhash = await solanaConnection.getLatestBlockhash({
            commitment: "finalized",
          });
          blockhash = latestBlockhash.blockhash;
          lastValidBlockHeight = latestBlockhash.lastValidBlockHeight - 150;
          flag = false;
        } catch (e) {
          console.log("fail,", ++count);
        }
        await delay(200);
      }

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = solanaWallet.publicKey;

      const transactionResponse = await solanaWallet.signTransaction(tx);
      // console.log("Transaction sent:", transactionResponse);
      console.log("Broadcasting transaction...");
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );
      // await solanaConnection.confirmTransaction(hash, "finalized");
      console.log("Transaction hash:", hash);
      return hash;
    } catch (error) {
      console.error("Transaction failed:", error);
      return null;
    }
  };

  const buyViaSOL = async (treasury: string, lamports: number) => {
    if (!solanaWallet) {
      console.error("Wallet not connected");
      return;
    }

    const tx = new Transaction()
      .add(
        SystemProgram.transfer({
          fromPubkey: solanaWallet.publicKey,
          toPubkey: new PublicKey(treasury),
          lamports,
        })
      )
      .add(
        ComputeBudgetProgram.setComputeUnitPrice({
          microLamports: 1000000,
        })
      );

    try {
      let flag = true;
      let count = 0;
      let blockhash, lastValidBlockHeight;

      while (flag) {
        try {
          const latestBlockhash = await solanaConnection.getLatestBlockhash({
            commitment: "finalized",
          });
          blockhash = latestBlockhash.blockhash;
          lastValidBlockHeight = latestBlockhash.lastValidBlockHeight - 150;
          flag = false;
        } catch (e) {
          console.log("fail,", ++count);
        }
        await delay(200);
      }

      tx.recentBlockhash = blockhash;
      tx.lastValidBlockHeight = lastValidBlockHeight;
      tx.feePayer = solanaWallet.publicKey;
      const transactionResponse = await solanaWallet.signTransaction(tx);
      console.log("Broadcasting transaction...");
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );

      // await solanaConnection.confirmTransaction(hash, "finalized");
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
