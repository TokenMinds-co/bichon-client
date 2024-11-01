import React from "react";
import { axiosInstance } from "@/lib/axios";
import { redirect } from "next/navigation";
import Link from "next/link";
import SkewButton from "@/components/shared/SkewButton";
import OnfindoSDK from "@/components/kyc/OnfindoSDK";

const VerifyPage = async ({ searchParams }: URLProps) => {
  const email = searchParams.email;
  const address = searchParams.address;
  if (!email || !address) {
    redirect("/dashboard");
  }

  // FETCH USER
  const ENDPOINT = `/users?limit=10&page=1&email=${encodeURIComponent(
    email!
  )}&address=${address}`;
  const { data: result } = await axiosInstance.get(ENDPOINT);
  const users = result.data.users[0];

  // GENERATE WORKFLOW
  const workflowRes = await fetch(
    `${process.env.ONFIDO_API_URL}/workflow_runs`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token token=${process.env.ONFIDO_API_TOKEN!}`,
      },
      body: JSON.stringify({
        applicant_id: users?.kyc?.applicantId,
        workflow_id: "1897dafa-af94-4de2-806c-87f08b99423c",
      }),
      method: "POST",
    }
  );
  const workflowData = await workflowRes.json();

  // GENERATE TOKEN
  const tokenRes = await fetch(`${process.env.ONFIDO_API_URL}/sdk_token`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token token=${process.env.ONFIDO_API_TOKEN!}`,
    },
    body: JSON.stringify({
      applicant_id: users?.kyc?.applicantId,
    }),
    method: "POST",
  });
  const tokenData = await tokenRes.json();

  if (!tokenData?.token || !workflowData?.id) {
    return (
      <main className="flex flex-col space-y-5 items-center justify-center bg-sky min-h-screen">
        <h3 className="text-2xl font-semibold text-white text-center">
          Your account was rejected.
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
    <main className="container mx-auto pt-32 h-full flex flex-col items-center justify-center bg-bgDark p-5">
      <OnfindoSDK token={tokenData?.token} workflowRundId={workflowData?.id} />
    </main>
  );
};

export default VerifyPage;
