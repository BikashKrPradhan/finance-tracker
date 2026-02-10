"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { createBankAccount } from "./actions";

export default function BankForm() {
  const [bankName, setBankName] = useState("");
  const [balance, setBalance] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName || !balance) return;
    if (!session) {
      toast.error("Please sign in to add bank accounts");
      return;
    }
    await createBankAccount(bankName, Number(balance));
    setBankName("");
    setBalance("");
    router.refresh();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-3 mb-6"
      onSubmit={handleSubmit}
    >
      <input
        className="input-base flex-1 min-w-[160px]"
        placeholder="Bank name"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}
      />
      <input
        className="input-base w-40 text-right"
        placeholder="Balance ₹"
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary shrink-0"
      >
        Add Bank
      </motion.button>
    </motion.form>
  );
}
