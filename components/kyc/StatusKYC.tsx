import Image from "next/image";
import React from "react";
import SkewButton from "../shared/SkewButton";
import Link from "next/link";
import { KYCStatus } from "@/types/Response";

export default function StatusKYC({ status }: { status: KYCStatus }) {
  const src =
    status === "APPROVED"
      ? "/assets/kyc/approved.png"
      : status === "REJECTED"
      ? "/assets/kyc/rejected.png"
      : "/assets/kyc/on-progress.png";

  const label =
    status === "APPROVED"
      ? "approved"
      : status === "REJECTED"
      ? "not approved"
      : "still pending";

  return (
    <div className="font-spaceMono text-white space-y-8">
      <div className="text-2xl text-center">Your Application Status: </div>

      <div className="bg-gray-700/20 skew-widgets p-8 w-full sm:w-[500px] rounded-md flex flex-col gap-10 justify-center items-center">
        <Image alt="kyc-status" width={150} height={150} src={src} />

        <div className="text-lg">KYC is {label}</div>

        <Link className="w-full" href={status === "REJECTED" ? "/kyc" : "/"}>
          <SkewButton
            type="button"
            customClasses="skew-buy-widgets"
            className="w-full"
          >
            {status === "REJECTED" ? "Resubmit KYC" : "Back to home"}
          </SkewButton>
        </Link>
      </div>
    </div>
  );
}
