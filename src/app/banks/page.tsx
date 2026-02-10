export const dynamic = "force-dynamic";

import { getBankAccounts } from "./actions";
import EditableBankRow from "./EditableBankRow";
import BankForm from "./BankForm";
import PageContainer from "../components/PageContainer";

export default async function BanksPage() {
  const banks = await getBankAccounts();

  const total = banks.reduce((sum, b) => sum + Number(b.balance), 0);

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Bank Accounts
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your bank account balances
          </p>
        </div>

        <BankForm />

        <div className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/80">
                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700">
                  Bank Name
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-zinc-700">
                  Balance (₹)
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-zinc-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {banks.map((bank, i) => (
                <EditableBankRow
                  key={bank.id}
                  id={bank.id}
                  bankName={bank.bankName}
                  balance={Number(bank.balance)}
                  index={i}
                />
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-zinc-200 bg-zinc-50/50">
                <td className="px-6 py-4 text-sm font-semibold text-zinc-900">
                  Total
                </td>
                <td className="px-6 py-4 text-right text-sm font-semibold text-zinc-900">
                  ₹{total.toLocaleString()}
                </td>
                <td className="px-6 py-4" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}
