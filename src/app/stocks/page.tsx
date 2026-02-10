export const dynamic = "force-dynamic";

import { getStocks } from "./actions";
import StockForm from "./StockForm";
import EditableStockRow from "./EditableStockRow";
import PageContainer from "../components/PageContainer";

export default async function StocksPage() {
  const stocks = await getStocks();

  // 1️⃣ Per-row calculations
  const stocksWithCalc = stocks.map((s) => {
    const invested = s.quantity * Number(s.avgBuyPrice);
    const current = s.quantity * Number(s.ltp);
    const pl = current - invested;
    const plPct = invested === 0 ? 0 : (pl / invested) * 100;

    return {
      ...s,
      avgBuyPriceNum: Number(s.avgBuyPrice),
      ltpNum: Number(s.ltp),
      invested,
      current,
      pl,
      plPct,
    };
  });

  // 2️⃣ Totals calculation (AFTER map)
  const totals = stocksWithCalc.reduce(
    (acc, s) => {
      acc.invested += s.invested;
      acc.current += s.current;
      return acc;
    },
    { invested: 0, current: 0 }
  );

  const totalPl = totals.current - totals.invested;
  const totalPlPct =
    totals.invested === 0 ? 0 : (totalPl / totals.invested) * 100;

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
                <th className="px-6 py-4 text-left">Symbol</th>
                <th className="px-6 py-4 text-right">Qty</th>
                <th className="px-6 py-4 text-right">Avg Buy</th>
                <th className="px-6 py-4 text-right">LTP</th>
                <th className="px-6 py-4 text-right">Invested</th>
                <th className="px-6 py-4 text-right">Current</th>
                <th className="px-6 py-4 text-right">P/L ₹</th>
                <th className="px-6 py-4 text-right">P/L %</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {stocksWithCalc.map((s, i) => (
                <EditableStockRow
                  key={s.id}
                  id={s.id}
                  symbol={s.symbol}
                  quantity={s.quantity}
                  avgBuyPrice={s.avgBuyPriceNum}
                  ltp={s.ltpNum}
                  invested={s.invested}
                  current={s.current}
                  pl={s.pl}
                  plPct={s.plPct}
                  index={i}
                />
              ))}

              {/* 3️⃣ Totals row */}
              <tr className="border-t-2 border-zinc-200 bg-zinc-50/80 font-semibold">
                <td className="px-6 py-4">Total</td>
                <td />
                <td />
                <td />

                <td className="px-6 py-4 text-right">
                  ₹{totals.invested.toFixed(2)}
                </td>

                <td className="px-6 py-4 text-right">
                  ₹{totals.current.toFixed(2)}
                </td>

                <td
                  className={`px-6 py-4 text-right ${
                    totalPl >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  ₹{totalPl.toFixed(2)}
                </td>

                <td
                  className={`px-6 py-4 text-right ${
                    totalPlPct >= 0 ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {totalPlPct.toFixed(2)}%
                </td>

                <td />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}

