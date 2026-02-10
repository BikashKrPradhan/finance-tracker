"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { updateBankAccount } from "./actions";
import DeleteBankButton from "./DeleteBankButton";

export default function EditableBankRow({
  id,
  bankName,
  balance,
  index = 0,
}: {
  id: string;
  bankName: string;
  balance: number;
  index?: number;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(bankName);
  const [amount, setAmount] = useState(balance.toString());
  const router = useRouter();

  const handleSave = async () => {
    await updateBankAccount(id, name, Number(amount));
    setIsEditing(false);
    router.refresh();
  };

  const handleCancel = () => {
    setName(bankName);
    setAmount(balance.toString());
    setIsEditing(false);
  };

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.03 }}
      className="group hover:bg-zinc-50/80 transition-colors"
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
          <span className="font-medium text-zinc-900">{bankName}</span>
        )}
      </td>
      <td className="px-6 py-4 text-right">
        {isEditing ? (
          <input
            className="input-base py-2 text-right w-32"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        ) : (
          <span className="font-medium text-zinc-900">
            ₹{Number(balance).toLocaleString()}
          </span>
        )}
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
                <DeleteBankButton id={id} />
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
                <DeleteBankButton id={id} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </td>
    </motion.tr>
  );
}
