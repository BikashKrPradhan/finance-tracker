"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { deleteBankAccount } from "./actions";

export default function DeleteBankButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="btn-danger"
      onClick={async () => {
        await deleteBankAccount(id);
        router.refresh();
      }}
    >
      Delete
    </motion.button>
  );
}
