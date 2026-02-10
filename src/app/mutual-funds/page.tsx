export const dynamic = "force-dynamic";

import { getMutualFunds } from "./actions";
import MutualFundForm from "./MutualFundForm";
import EditableMutualFundRow from "./EditableMutualFundRow";
import PageContainer from "../components/PageContainer";

export default async function MutualFundsPage() {
  const funds = await getMutualFunds();

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Mutual Funds
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Track your mutual fund investments
          </p>
        </div>

        <MutualFundForm />

        <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80">
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                  Fund
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                  Invested (₹)
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                  Current (₹)
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                  P/L (₹)
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                  P/L (%)
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {funds.map((f, i) => (
                <EditableMutualFundRow
                  key={f.id}
                  id={f.id}
                  fundName={f.fundName}
                  invested={Number(f.investedAmount)}
                  current={Number(f.currentValue)}
                  index={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
