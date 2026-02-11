export const dynamic = "force-dynamic";

import { getProvidentFund } from "./actions";
import PageContainer from "../components/PageContainer";
import EditPfCard from "./EditPfCard"

export default async function PfPage() {
  const pf = await getProvidentFund();

  return (
    <PageContainer>
      <div className="space-y-6 max-w-xl">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Provident Fund
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Your EPF balance from the latest statement
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-zinc-500">Total PF Value</div>
              <div className="mt-2 text-3xl font-semibold text-zinc-900">
                ₹{pf ? Number(pf.amount).toFixed(2) : "0.00"}
              </div>
              {pf?.updatedAt && (
                <div className="mt-1 text-xs text-zinc-500">
                  Last updated on{" "}
                  {new Date(pf.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>

            <EditPfCard initialAmount={pf ? Number(pf.amount) : 0} />
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
