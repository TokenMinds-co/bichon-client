"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const PaymentResult = () => {
  const searchParams = useSearchParams();

  // Extract query parameters
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col gap-4 text-lg text-white font-bold items-center text-center justify-center h-screen w-screen">
        {success && (
          <p>Order placed! You will receive an email confirmation.</p>
        )}
        {canceled && (
          <p>
            Order canceled <br /> Continue to shop around and checkout when
            you’re ready.
          </p>
        )}
        {!success && !canceled && (
          <p>
            Awaiting payment status. Check your dashboard to track your
            transactions.
          </p>
        )}

        <Link href={"/payment"}>
          <Button>Buy Again</Button>
        </Link>
      </div>
    </Suspense>
  );
};

export default PaymentResult;
