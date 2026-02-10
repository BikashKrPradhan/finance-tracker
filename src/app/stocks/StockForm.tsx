"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { createStock } from "./actions";

export default function StockForm() {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [avgBuyPrice, setAvgBuyPrice] = useState("");
  const [ltp, setLtp] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      Number(quantity) <= 0 ||
      Number(avgBuyPrice) <= 0 ||
      Number(ltp) < 0
    ) {
      toast.error("Please enter valid values");
      return;
    }

    if (!symbol || !quantity || !avgBuyPrice || !ltp) return;
    if (!session) {
      toast.error("Please sign in to add stocks");
      return;
    }
    await createStock({
      symbol,
      quantity: Number.parseInt(quantity, 10),
      avgBuyPrice: Number.parseFloat(avgBuyPrice),
      ltp: Number.parseFloat(ltp),
    });
    setSymbol("");
    setQuantity("");
    setAvgBuyPrice("");
    setLtp("");
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
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        className="input-base w-36 text-right"
        placeholder="Qty"
        type="number"
        step="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <input
        className="input-base w-36 text-right"
        placeholder="Avg Buy ₹"
        type="number"
        step="0.01"
        value={avgBuyPrice}
        onChange={(e) => setAvgBuyPrice(e.target.value)}
      />
      <input
        className="input-base w-36 text-right"
        placeholder="LTP ₹"
        type="number"
        step="0.01"
        value={ltp}
        onChange={(e) => setLtp(e.target.value)}
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
