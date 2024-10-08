"use client";

import { BICHON_TREASURY_ADDRESS } from "@/constant/common";
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
import { useWallet } from "@solana/wallet-adapter-react";

export default function useSPL() {
  const WSS_ENDPOINT = "wss://api.devnet.solana.com";
  const HTTP_ENDPOINT = "https://api.devnet.solana.com";
  const solanaConnection = new Connection(HTTP_ENDPOINT, {
    wsEndpoint: WSS_ENDPOINT,
  });
  const { signTransaction, publicKey } = useWallet();

  const getSOLBalance = async () => {
    if (!signTransaction || !publicKey) {
      console.error("Wallet not connected");
      return 0;
    }

    try {
      const balance = await solanaConnection.getBalance(publicKey);
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
    if (!signTransaction || !publicKey) {
      console.error("Wallet not connected");
      return;
    }
    const mint = new PublicKey(mintAddress);
    const sourceATA = getAssociatedTokenAddressSync(mint, publicKey);
    const destinationATA = getAssociatedTokenAddressSync(
      mint,
      BICHON_TREASURY_ADDRESS
    );

    console.log("sourceATA", sourceATA.toBase58());
    console.log("destinationATA", destinationATA.toBase58());
    console.log("mint", mint.toBase58());

    const instruction = createTransferCheckedInstruction(
      sourceATA,
      mint,
      destinationATA,
      publicKey,
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
      tx.feePayer = publicKey;

      const transactionResponse = await signTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );
      console.log("Transaction hash:", hash);
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  const buyViaSOL = async (lamports: number) => {
    if (!signTransaction || !publicKey) {
      console.error("Wallet not connected");
      return;
    }

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: BICHON_TREASURY_ADDRESS,
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
      tx.feePayer = publicKey;

      const transactionResponse = await signTransaction(tx);
      console.log("Transaction sent:", transactionResponse);
      const hash = await solanaConnection.sendRawTransaction(
        transactionResponse.serialize()
      );
      console.log("Transaction hash:", hash);
      // wait the tx to be finalized
      // if (transactionResponse.signature) {
      //   await solanaConnection.confirmTransaction(
      //     transactionResponse.signature.toString(),
      //     "finalized"
      //   );
      // } else {
      //   console.error("Transaction signature is null");
      // }

      return transactionResponse;
    } catch (error) {
      console.error("Transaction failed:", error);
    }
  };

  return { getSOLBalance, getATAandBalance, buyViaSPL, buyViaSOL };
}
