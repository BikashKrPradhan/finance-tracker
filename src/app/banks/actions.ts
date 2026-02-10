"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function createBankAccount(
  bankName: string,
  balance: number
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("User not found");

  await prisma.bankAccount.create({
    data: {
      bankName,
      balance,
      userId: user.id,
    },
  });
}

export async function getBankAccounts() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.bankAccount.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}

export async function deleteBankAccount(id: string) {
  await prisma.bankAccount.delete({
    where: { id },
  });
}

export async function updateBankAccount(
  id: string,
  bankName: string,
  balance: number
) {
  await prisma.bankAccount.update({
    where: { id },
    data: {
      bankName,
      balance,
    },
  });
}


