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
import { BICHON_TOKEN, SUPPORTED_SPL_TOKENS } from "@/constant/common";
import { displayFormatter, stringToNumber } from "@/lib/utils";
import { useSPL } from "@/hooks/useSPL";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Loader from "../shared/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateAxiosInstance } from "@/lib/axios-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IcoWidgetsProps {
  currentPrice: number;
  targetAmount: number;
  raisedAmount: number;
  solprice: number;
  usdtprice: number;
  usdcprice: number;
  until: string;
  userAllocation: number | undefined;
  tokenDetails: TokenDetailsResponse;
}

interface SubmitTx {
  address: string;
  amount: number;
  usdAmount: number;
  hash: string;
  method: TransactionMethod;
}

export default function IcoWidgets({
  currentPrice,
  raisedAmount,
  targetAmount,
  solprice,
  usdcprice,
  usdtprice,
  until,
  userAllocation,
  tokenDetails,
}: IcoWidgetsProps) {
  const isPresaleEnded = new Date() > new Date(until);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { isConnected, address } = useAccount();
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

  const submitTx = useMutation({
    mutationFn: async (data: SubmitTx) => {
      // console.log("Buy data", data);
      const axiosInstance = await generateAxiosInstance(undefined);
      await axiosInstance.post(`/transactions/crypto`, data);
    },
    mutationKey: ["submit-tx"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-user-details", address],
      });
      queryClient.invalidateQueries({
        queryKey: ["token-details"],
      });
      queryClient.invalidateQueries({
        queryKey: ["get-ico", address],
      });
    },
  });

  const checkAvailability = async (
    amount: number
  ): Promise<{ isAvailable: boolean; available: number; message: string }> => {
    try {
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/transactions/availability?amount=${amount}`
      );

      const result = {
        isAvailable: data.data.isAvailable,
        available: data.data.available,
        message: `You can only buy ${displayFormatter(
          stringToNumber(data.data.available.toString()),
          BICHON_TOKEN.decimals
        )} tokens!`,
      };

      return result;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error && error.response.data.statusCode === 400) {
        return {
          isAvailable: false,
          available: 0,
          message: error.response.data.message,
        };
      }

      return {
        isAvailable: false,
        available: 0,
        message: error.response.data.message,
      };
    }
  };

  const handleMethod = async (method: TransactionMethod) => {
    setActiveMethod(method);
    let pricePer1BCH = currentPrice;
    let balance = 0;
    setIsFetchingBalance(true);
    if (method === "CRYPTO_SOLANA") {
      balance = await getSOLBalance();
      pricePer1BCH = Number(
        displayFormatter(
          currentPrice / solprice,
          SUPPORTED_SPL_TOKENS[0].decimals
        )
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
        displayFormatter(
          currentPrice / usdtprice,
          SUPPORTED_SPL_TOKENS[1].decimals
        )
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
        displayFormatter(
          currentPrice / usdcprice,
          SUPPORTED_SPL_TOKENS[2].decimals
        )
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
    try {
      if (!address || !tokenDetails) return;
      setIsBuying(true);
      let hash: unknown;

      // Validation buy amout
      if (
        activeMethod !== "FIAT" &&
        Number(buyDetails.amount) > tokenState.balance
      ) {
        toast.error("Insufficient balance");
        return;
      }
      if (Number(buyDetails.amount) <= 0) {
        toast.error("Invalid quantity!");
        return;
      }

      const { isAvailable, message } = await checkAvailability(
        stringToNumber(buyDetails.getAmount)
      );
      if (!isAvailable) {
        toast.error(message);
        return;
      }

      if (activeMethod === "CRYPTO_SOLANA") {
        hash = await buyViaSOL(
          tokenDetails.treasury,
          Math.ceil(Number(buyDetails.amount) * LAMPORTS_PER_SOL)
        );
      } else if (activeMethod === "CRYPTO_USDC") {
        hash = await buyViaSPL(
          tokenDetails.treasury,
          tokenState.address,
          Math.ceil(Number(buyDetails.amount) * 10 ** tokenState.decimals)
        );
      } else if (activeMethod === "CRYPTO_USDT") {
        hash = await buyViaSPL(
          tokenDetails.treasury,
          tokenState.address,
          Math.ceil(Number(buyDetails.amount) * 10 ** tokenState.decimals)
        );
      } else {
        const axiosInstance = await generateAxiosInstance(undefined);

        const res = await axiosInstance
          .post(`/transactions/stripe/payment`, {
            quantity: stringToNumber(buyDetails.getAmount),
            address: address,
          })
          .catch((error) => {
            if (error.response.data.message instanceof Array) {
              toast.error(error.response.data.message[0]);
            } else {
              toast.error(error.response.data.message);
            }
            return;
          });

        if (res && res.data.statusCode === 200) {
          const url = res.data.data.paymentUrl;
          router.push(url);
        }
      }

      // Reset and refetch balance
      if (activeMethod !== "FIAT" && hash !== null) {
        await Promise.all([
          submitTx.mutateAsync({
            address,
            amount: stringToNumber(buyDetails.getAmount),
            usdAmount: stringToNumber(buyDetails.usdAmount),
            hash: hash as string,
            method: activeMethod,
          }),
          handleMethod(activeMethod),
        ]);

        toast.success("Transaction successful");
      }
      setBuyDetails({
        ...buyDetails,
        amount: "",
        getAmount: "",
        usdAmount: "",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Transaction failed. Please check your wallet balance and try again."
      );
    } finally {
      setIsBuying(false);
    }
  };

  // Monitor priceFeed changes
  useEffect(() => {
    if (activeMethod === "CRYPTO_SOLANA") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(
            currentPrice / solprice,
            SUPPORTED_SPL_TOKENS[0].decimals
          )
        ),
      });
    } else if (activeMethod === "CRYPTO_USDT") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(
            currentPrice / usdtprice,
            SUPPORTED_SPL_TOKENS[1].decimals
          )
        ),
      });
    } else if (activeMethod === "CRYPTO_USDC") {
      setTokenState({
        ...tokenState,
        price: Number(
          displayFormatter(
            currentPrice / usdcprice,
            SUPPORTED_SPL_TOKENS[2].decimals
          )
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [solprice, usdcprice, usdtprice]);

  return (
    <div className="h-full mx-5 max-w-lg flex items-center justify-center text-white p-12 bg-black/40 skew-widgets">
      <div className="w-full max-w-md space-y-5">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl font-spaceMono font-bold text-center">
            {tokenDetails.name}
          </h1>
          {isPresaleEnded ? (
            <p className="text-base font-spaceMono font-bold text-center mb-8">
              ICO is Ended!
            </p>
          ) : (
            <p className="text-base font-spaceMono font-bold text-center mb-8">
              ICO is Live!
            </p>
          )}
        </div>

        <IcoCounter until={until} />
        <IcoInfo
          raised={raisedAmount}
          total={targetAmount}
          purchased={userAllocation}
          stakeable={0}
          price={tokenState.price}
          symbol={tokenState.symbol}
          until={until}
          isFetchingBalance={isFetchingBalance}
          bichon_decimal={tokenDetails.decimal}
          bichon_symbol={tokenDetails.ticker}
          bichon_available={tokenDetails.available}
        />

        {!isPresaleEnded && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-spaceMono font-bold">
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
              bichon_decimal={tokenDetails.decimal}
              bichon_symbol={tokenDetails.ticker}
            />
          </>
        )}

        {isPresaleEnded ? null : isConnected ? (
          <SkewButton
            type="button"
            disabled={
              buyDetails.amount === "" ||
              isBuying ||
              tokenDetails.available === 0
            }
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
      </div>
    </div>
  );
}
