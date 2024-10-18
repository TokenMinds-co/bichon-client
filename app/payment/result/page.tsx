"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useRef } from "react";
import { toast } from "sonner";

const PaymentResultPage = () => {
  const router = useRouter();
  const toastShown = useRef(false);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (!toastShown.current) {
      if (success) {
        toast.success("Payment successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else if (canceled) {
        toast.error("Payment canceled!");
      }
      toastShown.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const PaymentResult = () => {
    return (
      <div className="flex bg-sky flex-col gap-4 text-lg text-white font-bold items-center text-center justify-center h-screen w-screen">
        {success && <p>Order placed! Redirecting to user dashboard...</p>}
        {canceled && <p>Order canceled, checkout later when you’re ready.</p>}
        {!success && !canceled && (
          <p>
            Awaiting payment status. Check your dashboard to track your
            transactions.
          </p>
        )}

        {canceled && (
          <Link href={"/"}>
            <Button>Go Back</Button>
          </Link>
        )}
      </div>
    );
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentResult />
    </Suspense>
  );
};

export default PaymentResultPage;
