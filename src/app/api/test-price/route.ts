import { NextResponse } from "next/server";
import { fetchYahooPrice } from "@/lib/market/yahoo";

export async function GET() {
  const price = await fetchYahooPrice("RELIANCE");

  return NextResponse.json({
    symbol: "RELIANCE",
    price,
  });
}
