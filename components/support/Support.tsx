"use client";

import { generateAxiosInstance } from "@/lib/axios-client";
import { useAccount } from "@particle-network/connectkit";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FormSupport from "./FormSupport";
import Link from "next/link";
import { Button } from "../ui/button";

const Support = () => {
  const { address } = useAccount();

  const { data: users } = useQuery({
    queryKey: ["get-types", address],
    queryFn: async () => {
      if (!address) return [];
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get(
        `/users?limit=10&page=1&&address=${address}`
      );
      const users = data.data.users as UserResponse[];
      return users;
    },
    enabled: !!address,
  });

  return (
    <div className="flex flex-col space-y-2 w-full h-full items-center justify-center">
      {users && users.length > 0 ? (
        <FormSupport email={users[0].email} />
      ) : (
        <div className="flex flex-col space-y-3 w-full h-full items-center justify-center">
          <p className="text-white text-sm">
            Unfortunately, you are not a registered user. Please verify as a
            user
          </p>
          <Link href="/">
            <Button className="text-white text-sm" variant="default">
              Go to Verify Page
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Support;
