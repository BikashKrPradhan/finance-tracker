"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createStock(data: {
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  ltp: number;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (!data.symbol.trim()) throw new Error("Symbol required");
  if (data.quantity <= 0) throw new Error("Quantity must be > 0");
  if (data.avgBuyPrice <= 0) throw new Error("Avg buy price must be > 0");
  if (data.ltp < 0) throw new Error("LTP cannot be negative");

  await prisma.stock.create({
    data: {
      symbol: data.symbol.trim().toUpperCase(),
      quantity: data.quantity,
      avgBuyPrice: data.avgBuyPrice,
      ltp: data.ltp,
      userId: user.id,
    },
  });
}


export async function getStocks() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.stock.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function deleteStock(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  await prisma.stock.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}


export async function updateStock(
  id: string,
  data: {
    symbol: string;
    quantity: number;
    avgBuyPrice: number;
    ltp: number;
  }
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (!data.symbol.trim()) throw new Error("Symbol required");
  if (data.quantity <= 0) throw new Error("Quantity must be > 0");
  if (data.avgBuyPrice <= 0) throw new Error("Avg buy price must be > 0");
  if (data.ltp < 0) throw new Error("LTP cannot be negative");

  await prisma.stock.update({
    where: {
      id,
      userId: user.id,
    },
    data: {
      symbol: data.symbol.trim().toUpperCase(),
      quantity: data.quantity,
      avgBuyPrice: data.avgBuyPrice,
      ltp: data.ltp,
    },
  });
}



