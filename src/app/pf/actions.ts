"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";

/**
 * Get Provident Fund for current user
 */
export async function getProvidentFund() {
  const user = await getCurrentUser();
  if (!user) return null;

  return prisma.providentFund.findUnique({
    where: { userId: user.id },
  });
}

/**
 * Create or update Provident Fund (single row per user)
 */
export async function upsertProvidentFund(amount: number) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  if (amount < 0) {
    throw new Error("PF amount cannot be negative");
  }

  await prisma.providentFund.upsert({
    where: { userId: user.id },
    update: {
      amount,
      updatedAt: new Date(),
    },
    create: {
      amount,
      updatedAt: new Date(),
      userId: user.id,
    },
  });
}
