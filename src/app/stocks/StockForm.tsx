"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { createStock } from "./actions";

export default function StockForm() {
  const [symbol, setSymbol] = useState("");
  const [invested, setInvested] = useState("");
  const [current, setCurrent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invested || !current) return;
    if (!session) {
      toast.error("Please sign in to add stocks");
      return;
    }
    await createStock(symbol || null, Number(invested), Number(current));
    setSymbol("");
    setInvested("");
    setCurrent("");
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
        className="input-base w-36"
        placeholder="Symbol (optional)"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        className="input-base w-36 text-right"
        placeholder="Invested ₹"
        type="number"
        value={invested}
        onChange={(e) => setInvested(e.target.value)}
      />
      <input
        className="input-base w-36 text-right"
        placeholder="Current ₹"
        type="number"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="btn-primary shrink-0"
      >
        Add Stock
      </motion.button>
    </motion.form>
  );
}
