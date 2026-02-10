"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

export async function createStock(
  symbol: string | null,
  investedAmount: number,
  currentAmount: number
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");

  await prisma.stock.create({
    data: {
      symbol,
      investedAmount,
      currentAmount,
      userId: user.id,
    },
  });
}

export async function getStocks() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.stock.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteStock(id: string) {
  await prisma.stock.delete({
    where: { id },
  });
}

export async function updateStock(
  id: string,
  symbol: string | null,
  investedAmount: number,
  currentAmount: number
) {
  await prisma.stock.update({
    where: { id },
    data: {
      symbol,
      investedAmount,
      currentAmount,
    },
  });
}

