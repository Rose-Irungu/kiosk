"use client"

import React from "react"
import { PieChart, Pie, Cell, Label } from "recharts"

// ShadCN UI components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Chart tools from your design system (if needed)
// import { ChartContainer } from "@/components/ui/chart"

// ------------------- Chart Data -------------------
const chartData = [
  { name: "Resolved", value: 4, fill: "#22C55E" },
  { name: "Ongoing", value: 1, fill: "#FACC15" },
]

// ------------------- Component -------------------
export default function EmergencyStatsChart() {
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="w-full max-w-md bg-white p-6 shadow-sm rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-gray-900">
          Emergency Dashboard Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">

          {/* --------- Donut Chart --------- */}
          <PieChart width={170} height={170}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={55}
              outerRadius={75}
              stroke="none"
              startAngle={90}
              endAngle={-270}
              isAnimationActive={false}
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.fill} />
              ))}
              {/* Center label (only total, no "Emergencies" text) */}
              <Label
                position="center"
                content={({ cx, cy }) => {
                  if (cx === undefined || cy === undefined) return null
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      className="fill-gray-800 font-bold text-2xl"
                      style={{ dominantBaseline: "middle" }}
                    >
                      {total}
                    </text>
                  )
                }}
              />
            </Pie>
          </PieChart>

          {/* --------- Right Side Stats --------- */}
          <div className="flex flex-col gap-6 ml-2">
            {/* Resolved */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded bg-[#22C55E] mr-2" />
              <span className="text-base font-medium text-gray-900">Resolved</span>
              <span className="text-lg font-bold text-green-600 ml-3">{chartData[0].value}</span>
            </div>
            {/* Ongoing */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-5 w-5 rounded bg-[#FACC15] mr-2" />
              <span className="text-base font-medium text-gray-900">Ongoing</span>
              <span className="text-lg font-bold text-yellow-500 ml-3">{chartData[1].value}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}