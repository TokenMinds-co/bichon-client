"use client";

import Image from "next/image";
import React from "react";
import SkewButton from "../shared/SkewButton";
import Link from "next/link";
import { KYCStatus } from "@/types/Response";
import { useRouter } from "next/navigation";

const statuses = [
  {
    list: ["REJECTED", "REQUIRES_ACTION", "RESUBMISSION_REQUESTED"],
    image: "/assets/kyc/rejected.png",
    code: 0,
  },
  {
    list: ["APPROVED"],
    image: "/assets/kyc/approved.png",
    code: 1,
  },
  {
    list: ["PROCESSING", "DOCUMENTS_REQUESTED", "PENDING"],
    image: "/assets/kyc/on-progress.png",
    code: 2,
  },
];

interface StatusKYCProps {
  status: KYCStatus;
  email: string;
  address: string;
}

export default function StatusKYC({ status, email, address }: StatusKYCProps) {
  const router = useRouter();
  const imageSrc = statuses.find((s) => s.list.includes(status))
    ?.image as string;
  const statusCode = statuses.find((s) => s.list.includes(status))
    ?.code as number;

  const handleUpdateDocs = async () => {
    router.push(
      `/verify?email=${encodeURIComponent(email)}&address=${address}`
    );
  };

  return (
    <div className="font-spaceMono text-white space-y-8">
      <div className="text-2xl text-center">Your Application Status: </div>

      <div className="bg-gray-700/20 skew-widgets p-8 w-full sm:w-[500px] rounded-md flex flex-col gap-10 justify-center items-center">
        <Image alt="kyc-status" width={150} height={150} src={imageSrc} />

        <div className="text-lg">Your KYC status is {status}</div>
        <div className="flex">
          {statusCode !== 0 ? (
            <Link className="w-full" href="/">
              <SkewButton
                type="button"
                customClasses="skew-buy-widgets"
                className="w-full"
              >
                {status === "REJECTED" ? "Resubmit KYC" : "Back to home"}
              </SkewButton>
            </Link>
          ) : (
            <SkewButton
              type="button"
              customClasses="skew-buy-widgets"
              className="w-full"
              onClick={handleUpdateDocs}
            >
              Update your documents
            </SkewButton>
          )}
        </div>
      </div>
    </div>
  );
}
