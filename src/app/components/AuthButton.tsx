"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function AuthButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-5 py-2.5 text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors shadow-sm"
        onClick={() => signIn("google")}
      >
        Sign in
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="px-5 py-2.5 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
      onClick={() => signOut()}
    >
      Sign out
    </motion.button>
  );
}
