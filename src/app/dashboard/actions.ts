"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const user = await getCurrentUser();


export async function getDashboardData() {
  const user = await getCurrentUser();
  if (!user) {
    return {
      bankTotal: 0,
      investedTotal: 0,
      currentTotal: 0,
      profitLoss: 0,
      profitLossPct: 0,
      netWorth: 0,
    };
  }

  const banks = await prisma.bankAccount.findMany({
    where: { userId: user.id },
  });

  const stocks = await prisma.stock.findMany({
    where: { userId: user.id },
  });

  const funds = await prisma.mutualFund.findMany({
    where: { userId: user.id },
  });

  const bankTotal = banks.reduce(
    (s, b) => s + Number(b.balance),
    0
  );

  const stockInvested = stocks.reduce(
    (s, x) => s + Number(x.investedAmount),
    0
  );
  const stockCurrent = stocks.reduce(
    (s, x) => s + Number(x.currentAmount),
    0
  );

  const mfInvested = funds.reduce(
    (s, x) => s + Number(x.investedAmount),
    0
  );
  const mfCurrent = funds.reduce(
    (s, x) => s + Number(x.currentValue),
    0
  );

  const investedTotal = stockInvested + mfInvested;
  const currentTotal = stockCurrent + mfCurrent;

  const profitLoss = currentTotal - investedTotal;
  const profitLossPct =
    investedTotal === 0
      ? 0
      : (profitLoss / investedTotal) * 100;

  const netWorth = bankTotal + currentTotal;

  return {
    bankTotal,
    investedTotal,
    currentTotal,
    profitLoss,
    profitLossPct,
    netWorth,
  };
}
