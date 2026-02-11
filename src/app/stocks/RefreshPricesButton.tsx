"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { refreshStockPrices } from "./actions";

export default function RefreshPricesButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      try {
        const result = await refreshStockPrices();
        toast.success(`Updated prices for ${result.updated} stocks`);
        router.refresh();
      } catch {
        toast.error("Failed to refresh prices");
      }
    });
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow-sm ring-1 ring-zinc-900/10 transition-colors hover:bg-zinc-800 hover:ring-zinc-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending && (
        <span
          className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-200 border-t-transparent"
          aria-hidden="true"
        />
      )}
      <span>{isPending ? "Refreshing…" : "Refresh Prices"}</span>
    </button>
  );
}
