"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SUPPORTED_SPL_TOKENS } from "@/constant/common";
import { toast } from "sonner";
import { useAccount } from "@particle-network/connectkit";
import { useSPL } from "@/hooks/useSPL";
import { Input } from "../ui/input";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import DisplayBalance from "./DisplayBalance";
import ConversionRate from "./ConversionRate";
import { useMutation } from "@tanstack/react-query";
import { generateAxiosInstance } from "@/lib/axios-client";

const schema = z.object({
  token: z.string(),
  amount: z.string().min(1, { message: "amount cannot be empty" }),
});

type FormData = z.infer<typeof schema>;

interface SubmitTx {
  address: string;
  amount: number;
  usdAmount: number;
  hash: string;
}

interface FormCryptoProps {
  currentprice: number;
  solprice: number;
  usdtprice: number;
  usdcprice: number;
}

export default function FormCrypto({
  currentprice,
  usdtprice,
  solprice,
  usdcprice,
}: FormCryptoProps) {
  const { address } = useAccount();
  const { getATAandBalance, getSOLBalance, buyViaSOL, buyViaSPL } = useSPL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingBalance, setIsFetchingBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [decimals, setDecimals] = useState(9);
  const [price, setPrice] = useState(usdtprice);
  const [boughtAmount, setBoughtAmount] = useState(0);
  const [usdAmount, setUsdAmount] = useState(0);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      amount: "",
    },
  });

  const submitTx = useMutation({
    mutationFn: async (data: SubmitTx) => {
      const axiosInstance = await generateAxiosInstance(undefined);
      const res = await axiosInstance.post(`/transactions/crypto`, data);
      console.log(res.data);
    },
    mutationKey: ["submit-tx"],
  });

  const getSelectedToken = (address: string) => {
    const token = SUPPORTED_SPL_TOKENS.find((item) => item.address === address);
    return token;
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (!address) return;
      setIsSubmitting(true);

      let hash = "";
      if (data.token === SUPPORTED_SPL_TOKENS[0].address) {
        hash = (await buyViaSOL(
          Number(data.amount) * LAMPORTS_PER_SOL
        )) as string;
      } else {
        hash = (await buyViaSPL(
          data.token,
          Number(data.amount) * 10 ** decimals
        )) as string;
      }

      // reset only the amount field
      form.reset({ token: data.token, amount: "" });
      await submitTx.mutateAsync({
        address,
        amount: boughtAmount,
        usdAmount,
        hash,
      });
      setTimeout(() => {
        handleChangeToken(data.token);
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to buy token");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeToken = async (value: string) => {
    if (!address) return;
    setIsFetchingBalance(true);
    form.setValue("token", value);
    if (value === SUPPORTED_SPL_TOKENS[0].address) {
      const balance = await getSOLBalance();
      setPrice(solprice);
      setBalance(balance);
      setDecimals(9);
    } else {
      if (value === SUPPORTED_SPL_TOKENS[1].address) {
        setPrice(usdtprice);
      } else if (value === SUPPORTED_SPL_TOKENS[2].address) {
        setPrice(usdcprice);
      }
      const { uiAmount, decimals } = await getATAandBalance(address, value);
      setBalance(uiAmount ?? 0);
      setDecimals(decimals ?? 6);
    }
    setIsFetchingBalance(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow"
      >
        <h2 className="mb-6 text-2xl font-bold">Crypto Payment</h2>
        <div className="flex flex-col w-full h-full space-y-6">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={handleChangeToken}
                    defaultValue={field.value}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Token" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPORTED_SPL_TOKENS.map((item, idx) => (
                        <SelectItem key={idx} value={item.address}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                {field.value && (
                  <DisplayBalance
                    isFetchingBalance={isFetchingBalance}
                    balance={balance}
                    decimals={decimals}
                    symbol={getSelectedToken(field.value)?.symbol ?? "USD"}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            disabled={balance === 0}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={0.1}
                    step={"any"}
                    max={balance}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <ConversionRate
          currentprice={currentprice}
          price={price}
          isDirty={form.watch("token") !== ""}
          amount={form.watch("amount")}
          decimals={decimals}
          symbol={getSelectedToken(form.watch("token"))?.symbol ?? "USD"}
          isFetchingBalance={isFetchingBalance}
          setBoughtAmount={setBoughtAmount}
          setUsdAmount={setUsdAmount}
        />

        <Button
          type="submit"
          disabled={
            isSubmitting ||
            Number(form.watch("amount")) < 0 ||
            form.watch("amount") === ""
          }
          className="w-full mt-6"
        >
          {isSubmitting ? "Buying..." : "Buy Now"}
        </Button>
      </form>
    </Form>
  );
}
