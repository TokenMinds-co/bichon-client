import FormKYC from "@/components/kyc/FormKYC";
import SkewButton from "@/components/shared/SkewButton";
import { axiosInstance } from "@/lib/axios";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function KYCPage() {
  const { data: icoRes } = await axiosInstance.get("/ico/current");
  const { data: tokenRes } = await axiosInstance.get("/token");
  const ico = icoRes.data as IcoResponse;
  const token = tokenRes.data as TokenDetailsResponse;

  if (!ico || !token) {
    return (
      <main className="flex flex-col space-y-5 items-center justify-center bg-sky min-h-screen">
        <h3 className="text-2xl font-semibold text-white text-center">
          Presale is not available at the moment.
        </h3>

        <Link href="/support">
          <SkewButton type="button" customClasses="skew-buy-widgets">
            Contact Support
          </SkewButton>
        </Link>
      </main>
    );
  }

  return (
    <section className="w-full px-5 bg-sky min-h-screen font-spaceMono flex flex-col items-center justify-center">
      <FormKYC />
    </section>
  );
}
