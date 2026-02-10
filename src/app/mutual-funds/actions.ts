"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function createMutualFund(
  fundName: string,
  investedAmount: number,
  currentValue: number
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");

  await prisma.mutualFund.create({
    data: {
      fundName,
      investedAmount,
      currentValue,
      userId: user.id,
    },
  });
}

export async function getMutualFunds() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.mutualFund.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function updateMutualFund(
  id: string,
  fundName: string,
  investedAmount: number,
  currentValue: number
) {
  await prisma.mutualFund.update({
    where: { id },
    data: {
      fundName,
      investedAmount,
      currentValue,
    },
  });
}

export async function deleteMutualFund(id: string) {
  await prisma.mutualFund.delete({
    where: { id },
  });
}
