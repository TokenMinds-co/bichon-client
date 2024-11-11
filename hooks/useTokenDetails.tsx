"use client";

import { useQuery } from "@tanstack/react-query";
import { generateAxiosInstance } from "@/lib/axios-client";

export const useTokenDetails = () => {
  const REFRESH_INTERVAL = 1000 * 60 * 0.5; // 1 minutes

  const { data: tokenDetails } = useQuery<TokenDetailsResponse>({
    queryKey: ["token-details"],
    queryFn: async (): Promise<TokenDetailsResponse> => {
      const axiosInstance = await generateAxiosInstance(undefined);
      const { data } = await axiosInstance.get("/token");
      return data.data;
    },
    // Refetch the data every 1 minute
    refetchInterval: REFRESH_INTERVAL,
  });

  return { tokenDetails };
};
