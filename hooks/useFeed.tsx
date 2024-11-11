"use client";

import { useQuery } from "@tanstack/react-query";
import { SUPPORTED_SPL_TOKENS } from "@/constant/common";
import { generateAxiosInstance } from "@/lib/axios-client";

export const useFeed = () => {
  const REFRESH_INTERVAL = 1000 * 60 * 0.5; // 1 minutes

  const { data: solprice } = useQuery<AssetQuotation>({
    queryKey: ["solprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const axiosInstance = await generateAxiosInstance(
        undefined,
        SUPPORTED_SPL_TOKENS[0].host
      );
      const { data } = await axiosInstance.get(SUPPORTED_SPL_TOKENS[0].feed);
      return data;
    },
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: usdtprice } = useQuery({
    queryKey: ["usdtprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const axiosInstance = await generateAxiosInstance(
        undefined,
        SUPPORTED_SPL_TOKENS[1].host
      );
      const { data } = await axiosInstance.get(SUPPORTED_SPL_TOKENS[1].feed);
      return data;
    },
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: usdcprice } = useQuery({
    queryKey: ["usdcprice"],
    queryFn: async (): Promise<AssetQuotation> => {
      const axiosInstance = await generateAxiosInstance(
        undefined,
        SUPPORTED_SPL_TOKENS[1].host
      );
      const { data } = await axiosInstance.get(SUPPORTED_SPL_TOKENS[1].feed);
      return data;
    },
    refetchInterval: REFRESH_INTERVAL,
  });

  return { solprice, usdtprice, usdcprice };
};
