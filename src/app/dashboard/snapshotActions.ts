"use server";

import { prisma } from "@/lib/prisma";
import { getDashboardData } from "./actions";
import { getCurrentUser } from "@/lib/getCurrentUser";


export async function createNetWorthSnapshot() {
  const user = await getCurrentUser();
  if (!user) return;

  const data = await getDashboardData();

  await prisma.netWorthSnapshot.create({
    data: {
      netWorth: data.netWorth,
      userId: user.id,
    },
  });
}

export async function getNetWorthSnapshots() {
  const user = await getCurrentUser();
  if (!user) return [];

  return prisma.netWorthSnapshot.findMany({
    where: { userId: user.id },
    orderBy: { date: "asc" },
  });
}
