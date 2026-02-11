import { NextResponse } from "next/server";
import { refreshStockPrices } from "@/app/stocks/actions";

export async function GET() {
  const result = await refreshStockPrices();
  return NextResponse.json(result);
}
