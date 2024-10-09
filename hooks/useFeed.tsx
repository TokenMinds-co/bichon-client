"use client";

import { useQuery } from "@tanstack/react-query";
import { SUPPORTED_SPL_TOKENS } from "@/constant/common";

export const useFeed = () => {
  const REFRESH_INTERVAL = 1000 * 60 * 1; // 5 minutes

  const { data: solprice } = useQuery<AssetQuotation>({
    queryKey: ["solprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const response = await fetch(SUPPORTED_SPL_TOKENS[0].feed);
      return await response.json();
    },
    // Refetch the data every 1 minute
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: usdtprice } = useQuery({
    queryKey: ["usdtprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const response = await fetch(SUPPORTED_SPL_TOKENS[1].feed);
      return await response.json();
    },
    // Refetch the data every 1 minute
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: usdcprice } = useQuery({
    queryKey: ["usdcprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const response = await fetch(SUPPORTED_SPL_TOKENS[2].feed);
      return await response.json();
    },
    // Refetch the data every 1 minute
    refetchInterval: REFRESH_INTERVAL,
  });

  return { solprice, usdtprice, usdcprice };
};
