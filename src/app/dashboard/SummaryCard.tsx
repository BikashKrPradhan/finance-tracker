"use client";

import { motion } from "framer-motion";

export default function SummaryCard({
  title,
  value,
  color = "text-zinc-900",
  index = 0,
}: {
  title: string;
  value: string;
  color?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-zinc-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <p className="text-sm font-medium text-zinc-500 mb-1">{title}</p>
      <p className={`text-2xl font-semibold tracking-tight ${color}`}>{value}</p>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-zinc-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}
