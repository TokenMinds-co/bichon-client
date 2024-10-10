"use client";

import ConnectWallet from "../shared/ConnectWallet";
import IcoCounter from "./IcoCounter";
import IcoInfo from "./IcoInfo";
import IcoMethod from "./IcoMethod";
import { useEffect, useState } from "react";
import { TransactionMethod } from "@/types/Response";
import { useAccount } from "@particle-network/connectkit";
import SkewButton from "../shared/SkewButton";
import BuyForm from "./BuyForm";
import { SUPPORTED_SPL_TOKENS } from "@/constant/common";
import { displayFormatter } from "@/lib/utils";
import { useSPL } from "@/hooks/useSPL";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Loader from "../shared/Loader";

interface IcoWidgetsProps {
  currentPrice: number;
  solprice: number;
  usdtprice: number;
  usdcprice: number;
}

export default function IcoWidgets({
  currentPrice,
  solprice,
  usdcprice,
  usdtprice,
}: IcoWidgetsProps) {
  const { isConnected } = useAccount();
  const { getATAandBalance, getSOLBalance, buyViaSOL, buyViaSPL } = useSPL();
  const [activeMethod, setActiveMethod] = useState<TransactionMethod>("FIAT");
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [tokenState, setTokenState] = useState({
    address: "",
    balance: 0,
    decimals: 0,
    symbol: "USD",
    price: currentPrice,
    rawPrice: currentPrice,
    boughtAmount: 0,
    usdAmount: 0,
    logo: "",
  });
  const [buyDetails, setBuyDetails] = useState({
    isDirty: false,
    amount: "",
    getAmount: "",
    usdAmount: "",
  });

  const handleMethod = async (method: TransactionMethod) => {
    setActiveMethod(method);
    let pricePer1BCH = currentPrice;
    let balance = 0;
    setIsFetchingBalance(true);
    if (method === "CRYPTO_SOLANA") {
      balance = await getSOLBalance();
      pricePer1BCH = Number(
        displayFormatter(1 / solprice, SUPPORTED_SPL_TOKENS[0].decimals)
      );
      setTokenState({
        ...tokenState,
        price: pricePer1BCH,
        symbol: SUPPORTED_SPL_TOKENS[0].symbol,
        decimals: SUPPORTED_SPL_TOKENS[0].decimals,
        balance,
        rawPrice: solprice,
        address: SUPPORTED_SPL_TOKENS[0].address,
        logo: "/assets/icons/solana.svg",
      });
    } else if (method === "CRYPTO_USDT") {
      const res = await getATAandBalance(SUPPORTED_SPL_TOKENS[1].address);
      pricePer1BCH = Number(
        displayFormatter(1 / usdtprice, SUPPORTED_SPL_TOKENS[1].decimals)
      );

      setTokenState({
        ...tokenState,
        price: pricePer1BCH,
        symbol: SUPPORTED_SPL_TOKENS[1].symbol,
        decimals: SUPPORTED_SPL_TOKENS[1].decimals,
        balance: res?.uiAmount || 0,
        rawPrice: usdtprice,
        address: SUPPORTED_SPL_TOKENS[1].address,
        logo: "/assets/icons/usdt.svg",
      });
    } else if (method === "CRYPTO_USDC") {
      const res = await getATAandBalance(SUPPORTED_SPL_TOKENS[2].address);
      pricePer1BCH = Number(
        displayFormatter(1 / usdcprice, SUPPORTED_SPL_TOKENS[2].decimals)
      );
      setTokenState({
        ...tokenState,
        price: pricePer1BCH,
        symbol: SUPPORTED_SPL_TOKENS[2].symbol,
        decimals: SUPPORTED_SPL_TOKENS[2].decimals,
        balance: res?.uiAmount || 0,
        rawPrice: usdcprice,
        address: SUPPORTED_SPL_TOKENS[2].address,
        logo: "/assets/icons/usdc.svg",
      });
    } else {
      setTokenState({
        ...tokenState,
        price: currentPrice,
        symbol: "USD",
        logo: "",
        rawPrice: currentPrice,
      });
    }
    setIsFetchingBalance(false);
  };

  const buyAction = async () => {
    let hash: any;
    setIsBuying(true);
    try {
      if (activeMethod === "CRYPTO_SOLANA") {
        hash = await buyViaSOL(Number(buyDetails.amount) * LAMPORTS_PER_SOL);
      } else if (activeMethod === "CRYPTO_USDC") {
        hash = await buyViaSPL(
          tokenState.address,
          Number(buyDetails.amount) * 10 ** tokenState.decimals
        );
      } else if (activeMethod === "CRYPTO_USDT") {
        hash = await buyViaSPL(
          tokenState.address,
          Number(buyDetails.amount) * 10 ** tokenState.decimals
        );
      } else {
        console.log("Buying via card", buyDetails.amount);
      }

      // Reset and refetch balance
      await handleMethod(activeMethod);
      setBuyDetails({
        ...buyDetails,
        amount: "",
        getAmount: "",
        usdAmount: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsBuying(false);
      console.log("hash", hash);
    }
  };

  // Monitor priceFeed changes
  useEffect(() => {
    if (activeMethod === "CRYPTO_SOLANA") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(1 / solprice, SUPPORTED_SPL_TOKENS[0].decimals)
        ),
      });
    } else if (activeMethod === "CRYPTO_USDT") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(1 / usdtprice, SUPPORTED_SPL_TOKENS[1].decimals)
        ),
      });
    } else if (activeMethod === "CRYPTO_USDC") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(1 / usdcprice, SUPPORTED_SPL_TOKENS[2].decimals)
        ),
      });
    }
  }, [solprice, usdcprice, usdtprice]);

  return (
    <div className="w-full h-full max-w-lg flex items-center justify-center text-white p-4 bg-black skew-widgets">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-spaceMono font-bold text-center mb-8">
          LOREM IPSUM COLOR!
        </h1>

        <IcoCounter until="2024-10-13T23:59:59" />
        <IcoInfo
          raised={1549213.31}
          total={3163452}
          purchased={241}
          stakeable={50}
          price={tokenState.price}
          symbol={tokenState.symbol}
          isFetchingBalance={isFetchingBalance}
        />

        <div className="flex justify-between gap-2 font-spaceMono font-bold">
          <IcoMethod
            src="/assets/icons/solana.svg"
            label="SOL"
            method="CRYPTO_SOLANA"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src="/assets/icons/usdt.svg"
            label="USDT"
            method="CRYPTO_USDT"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src="/assets/icons/usdc.svg"
            label="USDC"
            method="CRYPTO_USDC"
            handleClick={handleMethod}
            active={activeMethod}
          />

          <IcoMethod
            src=""
            label="CARD"
            method="FIAT"
            handleClick={handleMethod}
            active={activeMethod}
            isFiat
          />
        </div>

        <BuyForm
          buyDetails={buyDetails}
          setBuyDetails={setBuyDetails}
          balance={tokenState.balance}
          decimals={tokenState.decimals}
          symbol={tokenState.symbol}
          logo={tokenState.logo}
          price={tokenState.price}
          rawPrice={tokenState.rawPrice}
          usdPrice={currentPrice}
          isFetchingBalance={isFetchingBalance}
        />

        {isConnected ? (
          <SkewButton
            type="button"
            disabled={buyDetails.amount === ""}
            onClick={buyAction}
            className="flex w-full flex-row gap-3 py-5 items-center justify-center duration-200 ease-in-out"
            customClasses={"skew-buy-widgets"}
          >
            {isBuying ? (
              <Loader size="25" />
            ) : (
              <p className="font-spaceMono text-lg w-full">Buy Now</p>
            )}
          </SkewButton>
        ) : (
          <ConnectWallet
            label="Connect Wallet"
            customClasses="skew-buy-widgets"
          />
        )}

        <div className="text-center">
          <a
            href="#"
            className="text-base underline underline-offset-4 font-jakarta"
          >
            Don&apos;t have a wallet?
          </a>
        </div>
      </div>
    </div>
  );
}
