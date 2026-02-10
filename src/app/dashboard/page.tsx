export const dynamic = "force-dynamic";

import { getDashboardData } from "./actions";
import SummaryCard from "./SummaryCard";
import SnapshotButton from "./SnapshotButton";
import NetWorthChart from "./NetWorthChart";
import { getNetWorthSnapshots } from "./snapshotActions";
import PageContainer from "../components/PageContainer";

export default async function DashboardPage() {
  const data = await getDashboardData();
  const snapshots = await getNetWorthSnapshots();

  const chartData = snapshots.map((s) => ({
    date: new Date(s.date).toLocaleDateString(),
    netWorth: Number(s.netWorth),
  }));

  const plColor =
    data.profitLoss > 0
      ? "text-emerald-600"
      : data.profitLoss < 0
        ? "text-red-600"
        : "text-zinc-600";

  return (
    <PageContainer>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Overview of your finances and net worth
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <SummaryCard
            title="Bank Balance"
            value={`₹${data.bankTotal.toLocaleString()}`}
            index={0}
          />
          <SummaryCard
            title="Invested Amount"
            value={`₹${data.investedTotal.toLocaleString()}`}
            index={1}
          />
          <SummaryCard
            title="Current Value"
            value={`₹${data.currentTotal.toLocaleString()}`}
            index={2}
          />
          <SummaryCard
            title="Profit / Loss"
            value={`₹${data.profitLoss.toLocaleString()}`}
            color={plColor}
            index={3}
          />
          <SummaryCard
            title="P/L %"
            value={`${data.profitLossPct.toFixed(2)}%`}
            color={plColor}
            index={4}
          />
          <SummaryCard
            title="Net Worth"
            value={`₹${data.netWorth.toLocaleString()}`}
            index={5}
          />
        </div>

        <div className="space-y-4">
          <SnapshotButton />

          {chartData.length > 0 && (
            <div className="mt-6">
              <NetWorthChart data={chartData} />
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}
