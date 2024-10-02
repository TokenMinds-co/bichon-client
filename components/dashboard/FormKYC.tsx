"use client";

import { useAccount } from "@particle-network/connectkit";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface UserData {
  email: string;
  address: string;
}

const FormKYC = () => {
  const router = useRouter();
  const { address } = useAccount();
  const [userData, setUser] = useState<UserData>({
    email: "",
    address: address || "",
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentAddress = address;
    // push to /verify and set the email and address in the query params
    router.push(
      `/verify?email=${encodeURIComponent(
        userData.email
      )}&address=${currentAddress}`
    );
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <form
        id="sumsub_form"
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full max-w-md items-center justify-center space-y-3 text-black"
      >
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2"
          value={userData.email}
          onChange={(e) => setUser({ ...userData, email: e.target.value })}
          required
        />
        <button type="submit" className="w-1/2 p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormKYC;
