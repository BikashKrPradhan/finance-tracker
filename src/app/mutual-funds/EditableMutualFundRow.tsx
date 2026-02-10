"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { updateMutualFund, deleteMutualFund } from "./actions";

export default function EditableMutualFundRow({
  id,
  fundName,
  invested,
  current,
  index = 0,
}: {
  id: string;
  fundName: string;
  invested: number;
  current: number;
  index?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(fundName);
  const [inv, setInv] = useState(invested.toString());
  const [cur, setCur] = useState(current.toString());
  const router = useRouter();

  const invNum = isEditing ? parseFloat(inv) || 0 : invested;
  const curNum = isEditing ? parseFloat(cur) || 0 : current;
  const pl = curNum - invNum;
  const plPct = invNum === 0 ? 0 : (pl / invNum) * 100;
  const color =
    pl > 0 ? "text-emerald-600" : pl < 0 ? "text-red-600" : "text-zinc-600";

  const handleSave = async () => {
    await updateMutualFund(id, name, Number(inv), Number(cur));
    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setName(fundName);
    setInv(invested.toString());
    setCur(current.toString());
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteMutualFund(id);
    router.refresh();
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="hover:bg-zinc-50/80 transition-colors"
    >
      <td className="px-6 py-4">
        {isEditing ? (
          <input
            className="input-base py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        ) : (
          <span className="font-medium text-zinc-900">{fundName}</span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        {isEditing ? (
          <input
            className="input-base py-2 text-right w-28"
            type="number"
            value={inv}
            onChange={(e) => setInv(e.target.value)}
          />
        ) : (
          <span className="font-medium text-zinc-900">
            ₹{invested.toLocaleString()}
          </span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        {isEditing ? (
          <input
            className="input-base py-2 text-right w-28"
            type="number"
            value={cur}
            onChange={(e) => setCur(e.target.value)}
          />
        ) : (
          <span className="font-medium text-zinc-900">
            ₹{current.toLocaleString()}
          </span>
        )}
      </td>
      <td className={`px-6 py-4 text-right font-medium ${color}`}>
        ₹{pl.toLocaleString()}
      </td>
      <td className={`px-6 py-4 text-right font-medium ${color}`}>
        {plPct.toFixed(2)}%
      </td>
      <td className="px-6 py-4">
        <div className="flex gap-2 justify-center items-center">
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="editing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex gap-2"
              >
                <button
                  className="btn-secondary !py-1.5 !px-3 text-sm"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="btn-ghost !py-1.5 !px-3 text-sm"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </motion.button>
              </motion.div>
            ) : (
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
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
}
