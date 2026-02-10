"use client";

import { motion } from "framer-motion";
import PageContainer from "../components/PageContainer";

export default function SettingsPage() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Settings
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Manage your account and preferences
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-zinc-200/80 bg-white p-8 shadow-sm"
        >
          <p className="text-zinc-500">Coming soon</p>
        </motion.div>
      </div>
    </PageContainer>
  );
}
