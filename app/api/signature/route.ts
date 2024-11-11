import { generateSignature } from "@/lib/utils";

export async function POST(request: Request) {
  const { method, url, body, timestamp } = await request.json();

  try {
    const signature = generateSignature({ method, url, timestamp, body });
    return Response.json(signature);
  } catch (error) {
    console.log(error);
    return Response.json(null);
  }
}
