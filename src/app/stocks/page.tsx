export const dynamic = "force-dynamic";

import { getStocks } from "./actions";
import StockForm from "./StockForm";
import EditableStockRow from "./EditableStockRow";
import PageContainer from "../components/PageContainer";

export default async function StocksPage() {
  const stocks = await getStocks();

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Stocks
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Track your stock investments and performance
          </p>
        </div>

        <StockForm />

        <div className="overflow-x-auto rounded-xl border border-zinc-200/80 bg-white shadow-sm">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80">
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                  Symbol
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
              {stocks.map((s, i) => (
                <EditableStockRow
                  key={s.id}
                  id={s.id}
                  symbol={s.symbol}
                  invested={Number(s.investedAmount)}
                  current={Number(s.currentAmount)}
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
