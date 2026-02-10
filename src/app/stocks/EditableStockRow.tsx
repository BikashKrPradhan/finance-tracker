"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { updateStock } from "./actions";
import DeleteStockButton from "./DeleteStockButton";

export default function EditableStockRow({
  id,
  symbol,
  quantity,
  avgBuyPrice,
  ltp,
  invested,
  current,
  pl,
  plPct,
  index = 0,
}: {
  id: string;
  symbol: string;
  quantity: number;
  avgBuyPrice: number;
  ltp: number;
  invested: number;
  current: number;
  pl: number;
  plPct: number;
  index?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [sym, setSym] = useState(symbol);
  const [qty, setQty] = useState(quantity.toString());
  const [avg, setAvg] = useState(avgBuyPrice.toString());
  const [ltpStr, setLtpStr] = useState(ltp.toString());
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const color = pl >= 0 ? "text-green-600" : "text-red-600";

  const handleSave = async () => {
    await updateStock(id, {
      symbol: sym,
      quantity: Number.parseInt(qty || "0", 10) || 0,
      avgBuyPrice: Number.parseFloat(avg || "0") || 0,
      ltp: Number.parseFloat(ltpStr || "0") || 0,
    });
    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setSym(symbol);
    setQty(quantity.toString());
    setAvg(avgBuyPrice.toString());
    setLtpStr(ltp.toString());
    setIsEditing(false);
  };

  const modal =
    mounted && isEditing
      ? createPortal(
          <AnimatePresence>
            <motion.div
              key="modal"
              className="fixed inset-0 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute inset-0 bg-black/30" onClick={handleCancel} />
              <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-zinc-900">
                      Edit stock
                    </div>
                    <div className="mt-1 text-sm text-zinc-500">
                      Update symbol, quantity and prices. Computed values refresh
                      automatically.
                    </div>
                  </div>
                  <button
                    className="btn-ghost !py-1.5 !px-3 text-sm"
                    onClick={handleCancel}
                  >
                    Close
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <label className="col-span-2 space-y-1">
                    <div className="text-xs font-medium text-zinc-600">
                      Symbol
                    </div>
                    <input
                      className="input-base w-full"
                      value={sym}
                      onChange={(e) => setSym(e.target.value)}
                      autoFocus
                    />
                  </label>

                  <label className="space-y-1">
                    <div className="text-xs font-medium text-zinc-600">Qty</div>
                    <input
                      className="input-base w-full text-right"
                      type="number"
                      step="1"
                      min="1"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </label>

                  <label className="space-y-1">
                    <div className="text-xs font-medium text-zinc-600">
                      Avg Buy
                    </div>
                    <input
                      className="input-base w-full text-right"
                      type="number"
                      step="0.01"
                      value={avg}
                      onChange={(e) => setAvg(e.target.value)}
                    />
                  </label>

                  <label className="col-span-2 space-y-1">
                    <div className="text-xs font-medium text-zinc-600">LTP</div>
                    <input
                      className="input-base w-full text-right"
                      type="number"
                      step="0.01"
                      value={ltpStr}
                      onChange={(e) => setLtpStr(e.target.value)}
                    />
                  </label>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <button
                    className="btn-ghost !py-2 !px-4"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-primary !py-2 !px-4"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.03 }}
        className="hover:bg-zinc-50/80 transition-colors"
      >
        <td className="px-6 py-4">
          <span className="font-medium text-zinc-900">{symbol}</span>
        </td>
        <td className="px-6 py-4 text-right">{quantity}</td>
        <td className="px-6 py-4 text-right">₹{avgBuyPrice.toFixed(2)}</td>
        <td className="px-6 py-4 text-right">₹{ltp.toFixed(2)}</td>

        <td className="px-6 py-4 text-right">₹{invested.toFixed(2)}</td>
        <td className="px-6 py-4 text-right">₹{current.toFixed(2)}</td>

        <td className={`px-6 py-4 text-right font-medium ${color}`}>
          ₹{pl.toFixed(2)}
        </td>
        <td className={`px-6 py-4 text-right font-medium ${color}`}>
          {plPct.toFixed(2)}%
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2 justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key="view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <button
                  className="btn-ghost !py-1.5 !px-3 text-sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <DeleteStockButton id={id} />
              </motion.div>
            </AnimatePresence>
          </div>
        </td>
      </motion.tr>
      {modal}
    </>
  );
}
