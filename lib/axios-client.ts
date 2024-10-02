import axios, { AxiosInstance } from "axios";

export const generateAxiosInstance = async (
  token: string | undefined
): Promise<AxiosInstance> => {
  const axiosInstanceClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosInstanceClient.interceptors.request.use(async function (config) {
    const apiKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
    const timestamp = Math.floor(Date.now() / 1000);

    //   GENERATE SIGNATURE
    const method = config.method?.toUpperCase() as string;
    const url = `${config.baseURL}${config.url}` as string;
    const body = config.data;
    const isFormData = body instanceof FormData;

    const res = await axios.post("/api/signature", {
      method,
      url,
      timestamp,
      body: isFormData ? null : body,
    });
    const signature = res.data;

    //   SET HEADERS
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    config.headers["x-api-key"] = apiKey;
    config.headers["x-timestamp"] = timestamp;
    config.headers["x-signature"] = signature;

    return config;
  });

  return axiosInstanceClient;
};
