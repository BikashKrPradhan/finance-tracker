import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const users = await prisma.user.findMany({
    include: {
      bankAccounts: true,
      stocks: true,
      mutualFunds: true,
    },
  });

  for (const user of users) {
    const bankTotal = user.bankAccounts.reduce(
      (sum, b) => sum + Number(b.balance),
      0
    );

    const stockTotal = user.stocks.reduce(
      (sum, s) => sum + Number(s.currentAmount),
      0
    );

    const mfTotal = user.mutualFunds.reduce(
      (sum, m) => sum + Number(m.currentValue),
      0
    );

    const netWorth = bankTotal + stockTotal + mfTotal;

    await prisma.netWorthSnapshot.create({
      data: {
        userId: user.id,
        netWorth,
      },
    });
  }

  return NextResponse.json({ success: true });
}
