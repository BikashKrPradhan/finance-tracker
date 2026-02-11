"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { upsertProvidentFund } from "./actions";

export default function EditPfCard({
  initialAmount,
}: {
  initialAmount: number;
}) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(initialAmount.toString());
  const router = useRouter();

  const handleSave = async () => {
    const value = Number(amount);
    if (isNaN(value) || value < 0) {
      toast.error("Please enter a valid PF amount");
      return;
    }

    await upsertProvidentFund(value);
    setOpen(false);
    router.refresh();
  };

  const modal =
    open &&
    createPortal(
      <AnimatePresence>
        <motion.div
          key="pf-modal"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-zinc-900">
                  Update Provident Fund
                </div>
                <div className="mt-1 text-sm text-zinc-500">
                  Enter total PF value from your latest EPF statement
                </div>
              </div>
              <button
                className="btn-ghost !py-1.5 !px-3 text-sm"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>

            <div className="mt-5 space-y-1">
              <div className="text-xs font-medium text-zinc-600">
                Total PF Value (₹)
              </div>
              <input
                className="input-base w-full text-right"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                autoFocus
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                className="btn-ghost !py-2 !px-4"
                onClick={() => setOpen(false)}
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
    );

  return (
    <>
      <button
        className="btn-primary shrink-0"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>
      {modal}
    </>
  );
}
