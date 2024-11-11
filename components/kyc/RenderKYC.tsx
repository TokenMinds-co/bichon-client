"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SkewButton from "../shared/SkewButton";
import Image from "next/image";
import { generateAxiosInstance } from "@/lib/axios-client";
import { toast } from "sonner";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface RenderKYCProps {
  users: UserResponse[];
  address: string;
}

const RenderKYC = ({ users, address }: RenderKYCProps) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [userData, setUser] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    address: address || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    e.preventDefault();
    const currentAddress = address;

    // GENERATE USER
    const axiosInstance = await generateAxiosInstance(undefined);
    const { data } = await axiosInstance.post(`/users`, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      address: currentAddress,
    });

    if (data.success) {
      toast.success("Registration success!");
      window.location.href = "/";
      window.location.reload();

      // router.push(
      //   `/verify?email=${encodeURIComponent(
      //     userData.email
      //   )}&address=${currentAddress}`
      // );
    }
  };

  if (users.length !== 0) router.push("/"); // PART OF DISABLE KYC

  return (
    users.length === 0 && (
      <>
        <div className="text-white text-center text-xl mb-10">
          Before participating in ICO, you should complete registration
        </div>

        <form
          id="sumsub_form"
          onSubmit={handleSubmit}
          className="flex flex-col w-full h-full rounded-md max-w-md items-center justify-center gap-4 text-black bg-gray-700/30 p-10 z-20"
        >
          <input
            type="text"
            placeholder="First Name"
            className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none active:border-blue-500 focus:border-blue-500"
            value={userData.firstName}
            onChange={(e) =>
              setUser({ ...userData, firstName: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none active:border-blue-500 focus:border-blue-500"
            value={userData.lastName}
            onChange={(e) => setUser({ ...userData, lastName: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none active:border-blue-500 focus:border-blue-500"
            value={userData.email}
            onChange={(e) => setUser({ ...userData, email: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Address"
            readOnly
            className="w-full py-2 px-4 bg-transparent text-white border-[1px] border-white/50 outline-none"
            value={address}
          />

          <SkewButton
            className="px-8 mt-6 w-full"
            disabled={isSubmitting}
            type="submit"
            variant="primary"
            customClasses="skew-buy-widgets"
          >
            {isSubmitting ? "Submitting..." : "Start Register"}
          </SkewButton>
        </form>

        <Image // FLOATING DOG
          className="absolute bottom-0 right-[20%] z-[10] w-[400px] aspect-square animate-fly"
          alt="floating-dog"
          width={50}
          height={50}
          src="/assets/floating/dog.svg"
        />
      </>
    )
  );
  // : (
  //   users[0] && (
  //     <StatusKYC
  //       status={users[0].kyc ? users[0].kyc.status : "DOCUMENTS_REQUESTED"}
  //       email={users[0].email}
  //       address={users[0].address}
  //     />
  //   )
  // );
};

export default RenderKYC;
