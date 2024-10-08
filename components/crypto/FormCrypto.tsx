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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SUPPORTED_SPL_TOKENS } from "@/constant/common";
import { toast } from "sonner";
import { useAccount } from "@particle-network/connectkit";
import useSPL from "@/hooks/useSPL";
import { Input } from "../ui/input";

const schema = z.object({
  token: z.string(),
  amount: z.string().min(1, { message: "amount cannot be empty" }),
});

type FormData = z.infer<typeof schema>;

export default function FormCrypto() {
  const { address } = useAccount();
  const { getATAandBalance } = useSPL();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [balance, setBalance] = useState(0);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      token: "",
      amount: "",
    },
  });

  // const createTicketMutation = useMutation({
  //   mutationFn: async (data: FormData) => {
  //     const axiosInstance = await generateAxiosInstance(undefined);
  //     await axiosInstance.post(`/tickets`, data);
  //     router.refresh();
  //   },
  //   mutationKey: ["create-ticket"],
  // });

  const getTokenSymbol = (address: string) => {
    const token = SUPPORTED_SPL_TOKENS.find((item) => item.address === address);
    return token?.symbol;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      console.log(data);
      toast.success("Ticket submitted successfully");

      // reset only the amount field
      form.reset({ token: data.token, amount: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangeToken = async (value: string) => {
    if (!address) return;
    form.setValue("token", value);
    const { displayBalance } = await getATAandBalance(address, value);
    console.log("displayBalance", displayBalance);
    setBalance(displayBalance ?? 0);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow"
      >
        <h2 className="text-2xl font-bold mb-6">Crypto Payment</h2>
        <div className="flex flex-col space-y-6 w-full h-full">
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
                  <FormDescription>
                    {balance} {getTokenSymbol(field.value)}
                  </FormDescription>
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

        <div className="flex flex-col space-y-3 py-5 items-start justify-start">
          <p className="text-sm">1 BCH = $0.5</p>
          {form.watch("amount") && (
            <p className="text-sm">
              Preview: {form.watch("amount")}{" "}
              {getTokenSymbol(form.watch("token"))}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
          {isSubmitting ? "Buying..." : "Buy Now"}
        </Button>
      </form>
    </Form>
  );
}
