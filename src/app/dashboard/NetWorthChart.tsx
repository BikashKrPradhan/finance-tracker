"use client";

import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CHART_COLORS = {
  stroke: "#059669",
  fill: "url(#netWorthGradient)",
};

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function NetWorthChart({
  data,
}: {
  data: { date: string; netWorth: number }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="overflow-hidden rounded-xl border border-zinc-200/80 bg-white shadow-sm"
    >
      <div className="px-6 pt-6 pb-2">
        <h2 className="text-lg font-semibold text-zinc-900">
          Net Worth Over Time
        </h2>
        <p className="text-sm text-zinc-500 mt-0.5">
          Track your total net worth across banks and investments
        </p>
      </div>

      <div className="px-4 pb-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="netWorthGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#059669" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e4e4e7"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              tickMargin={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#71717a", fontSize: 12 }}
              tickFormatter={(v) => {
                if (v >= 1_00_00_000) return `${(v / 1_00_00_000).toFixed(1)}Cr`;
                if (v >= 1_00_000) return `${(v / 1_00_000).toFixed(1)}L`;
                if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
                return v.toString();
              }}
              tickMargin={8}
              width={45}
            />

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const value = payload[0].value as number;
                return (
                  <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg">
                    <p className="text-xs text-zinc-500 mb-0.5">
                      {payload[0].payload.date}
                    </p>
                    <p className="text-base font-semibold text-zinc-900">
                      {formatCurrency(value)}
                    </p>
                  </div>
                );
              }}
              cursor={{
                stroke: "#d4d4d8",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="monotone"
              dataKey="netWorth"
              stroke={CHART_COLORS.stroke}
              strokeWidth={2.5}
              fill={CHART_COLORS.fill}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#059669",
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
