"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { createMutualFund } from "./actions";

export default function MutualFundForm() {
  const [name, setName] = useState("");
  const [invested, setInvested] = useState("");
  const [current, setCurrent] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !invested || !current) return;
    if (!session) {
      toast.error("Please sign in to add mutual funds");
      return;
    }
    await createMutualFund(name, Number(invested), Number(current));
    setName("");
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
        className="input-base flex-1 min-w-[180px]"
        placeholder="Fund name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
        Add Fund
      </motion.button>
    </motion.form>
  );
}
